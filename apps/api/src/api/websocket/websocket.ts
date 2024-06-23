import { WebSocket, type RawData } from "ws";
import type { AuthMessage, AuthRequiredMessage } from "../../../../../packages/shared-types/WsMessages";
import jwt from "jsonwebtoken";
import type { JWTUser } from "../../application/middlewares/auth";
import type { UserChangedPosition, UserDisconnected, UserConnected } from "../../core/Events";
import { userDisconnectedHandler } from "../../application/eventHandlers/userDisconnectedHandler";
import { userConnectedHandler } from "../../application/eventHandlers/userConnectedHandler";
import { userChangedPositionHandler } from "../../application/eventHandlers/userChangedPositionHandler";
import { userWsConfigRepository } from "../../application/repositories/userWebsocketConfig/userWebsocketConfig.repository";
import { addToAllowedGroups, addToRequestGroups, clearAllBroadcastGroups, getWelcomeMessage } from "./wsUtils";

// Type encapsulating the state of the websocket connections
type WebsocketState = {
  connectionPool: { [userId: string]: WebSocket };
  broadcastGroups: { [userId: string]: Set<string> }; // [userId: [subscribedUsers]]
  requestBroadcastGroups: { [originUserId: string]: Set<string> }; // [originUser: [receiverUsers]] // Users who want to receive updates from the user
  allowedBroadcastGroups: { [originUserId: string]: Set<string> }; // [receiverUser: [originUsers]] // Users who ale allowed to receive updates from the user
};

export const websocketState: WebsocketState = {
  connectionPool: {},
  broadcastGroups: {},
  requestBroadcastGroups: {},
  allowedBroadcastGroups: {},
};

// Main ws callback used to start and configure user connection
export const onWsConnection = (connection: WebSocket) => {
  const authRequiredMessage: AuthRequiredMessage = {
    type: "authRequired",
    sender: "server",
  };
  connection.send(JSON.stringify(authRequiredMessage));
  // Wait for auth message
  connection.once("message", (message) => handleAuth(connection, message));
};

const handleMessage = (message: RawData, userId: string) => {
  const parsedMessage = JSON.parse(message.toString());

  if (parsedMessage.type === "userChangedPosition") {
    parsedMessage.data.userId = userId;

    userChangedPositionHandler(parsedMessage as UserChangedPosition);
  }
};

const handleClose = (user: string) => {
  // Publish 'userDisconnected' event
  const userDisconnected: UserDisconnected = {
    type: "userDisconnected",
    data: {
      userId: user,
    },
  };
  userDisconnectedHandler(userDisconnected);

  // Clear user broadcast groups
  clearAllBroadcastGroups(user);
  console.log(websocketState);
};

const handleAuth = async (connection: WebSocket, message: RawData) => {
  const parsedMessage = JSON.parse(message.toString()) as AuthMessage;
  const { type, data } = parsedMessage;
  if (type !== "auth") {
    connection.close(1008, "Auth event expected");
    return;
  }
  if (!data.token) {
    connection.close(1008, "Token missing");
    return;
  }

  // Verify token
  let user = null;
  try {
    user = jwt.verify(data.token, process.env.JWT_SECRET || "") as JWTUser;
  } catch (err) {
    connection.close(1008, "Invalid token" + err);
    return;
  }
  if (!user) {
    connection.close(1008, "Invalid token");
    return;
  }

  // Add user to connection pool
  const userId = user.sub;
  websocketState.connectionPool[userId] = connection;

  // Recover users websocket config from db
  const wsConfig = await userWsConfigRepository.FindByUserId(userId);
  if (!wsConfig.isOk) {
    connection.close(1011, "Internal server error");
    return;
  }
  const { positionSharedWith, positionFollowedOf } = wsConfig.value;

  // Configure allowedBroadcastGroups for user
  addToAllowedGroups(userId, positionSharedWith);
  // Update requestBroadcastGroups for followed users
  addToRequestGroups(userId, positionFollowedOf);

  // Get welcome data from db
  const welcomeMessage = await getWelcomeMessage(userId);
  if (!welcomeMessage) {
    connection.close(1011, "Internal server error");
    return;
  }
  connection.send(JSON.stringify(welcomeMessage));

  ///TODO: Publish event on message bus when implemented (emmett)
  // Publish 'userLoggedIn' event
  const loggedInEvent: UserConnected = {
    type: "userConnected",
    data: {
      userId,
    },
  };

  await userConnectedHandler(loggedInEvent);
  // messageBus.publish(loggedInEvent);

  console.log(websocketState);

  // Configure connection event listeners
  connection.removeListener("message", handleAuth);
  connection.on("message", (message) => handleMessage(message, userId));
  connection.on("close", () => handleClose(userId));
};
