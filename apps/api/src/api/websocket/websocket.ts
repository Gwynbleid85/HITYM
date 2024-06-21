import { WebSocket, type RawData } from "ws";
import type { AuthRequiredMessage, LoggedInMessage, WsMessage } from "../../core/WsEvents";
import jwt from "jsonwebtoken";
import type { JWTUser } from "../../application/middlewares/auth";
import type { UserDisconnected, UserLoggedIn } from "../../core/Events";
import { userDisconnectedHandler } from "../../application/eventHandlers/userDisconnectedHandler";
import { userLoggedInHandler } from "../../application/eventHandlers/userLoggedInHandler";
import { userChangedPositionHandler } from "../../application/eventHandlers/userChangedPositionHandler";
import { userWsConfigRepository } from "../../application/repositories/userWebsocketConfig/userWebsocketConfig.repository";

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

const handleMessage = (message: RawData, user: string) => {
  const parsedMessage = JSON.parse(message.toString());

  if (parsedMessage.type === "userChangedPosition") {
    userChangedPositionHandler(parsedMessage);
  }
  //TODO: Handle messages
};

const handleClose = (user: string) => {
  // Remove user from userSubscribedTo
  delete websocketState.allowedBroadcastGroups[user];

  // Remove user from connectionPool
  delete websocketState.connectionPool[user];

  const userDisconnected: UserDisconnected = {
    type: "userDisconnected",
    data: {
      userId: user,
    },
  };
  userDisconnectedHandler(userDisconnected);
};

export const onWsConnection = (connection: WebSocket) => {
  const welcomeMessage: AuthRequiredMessage = {
    type: "authRequired",
    sender: "server",
  };
  connection.send(JSON.stringify(welcomeMessage));
  // Wait for auth message
  connection.once("message", (message) => handleAuth(connection, message));
};

const handleAuth = async (connection: WebSocket, message: RawData) => {
  const parsedMessage = JSON.parse(message.toString());
  const { event, token } = parsedMessage;
  if (event !== "auth") {
    connection.close(1008, "Auth event expected");
    return;
  }

  if (!token) {
    connection.close(1008, "Token missing");
    return;
  }

  // Verify token
  const user = jwt.verify(token, process.env.JWT_SECRET || "") as JWTUser;
  if (!user) {
    connection.close(1008, "Invalid token");
    return;
  }

  // Add user to connection pool
  const id = user.sub;
  websocketState.connectionPool[id] = connection;

  // Send loggedIn in message
  connection.send(
    JSON.stringify({
      sender: "server",
      type: "userLoggedIn",
      data: { userId: id },
    } as LoggedInMessage)
  );

  // Publish 'userLoggedIn' event
  const loggedInEvent: UserLoggedIn = {
    type: "userLoggedIn",
    data: {
      userId: id,
    },
  };
  userLoggedInHandler(loggedInEvent);

  // messageBus.publish(loggedInEvent);
  /// TODO: Recover users websocket config from db
  /// TODO: Add endpoints to manage user websocket config

  // Recover users websocket config from db

  const wsConfig = await userWsConfigRepository.FindByUserId(id);
  if (wsConfig.isOk) {
    const { positionSharedWith, positionFollowedOf } = wsConfig.value;
    websocketState.allowedBroadcastGroups[id] = new Set(positionSharedWith);
    websocketState.requestBroadcastGroups[id] = new Set(positionFollowedOf);
  }

  connection.removeListener("message", handleAuth);
  connection.on("message", (message) => handleMessage(message, id));
  connection.on("close", () => handleClose(id));
};

export const broadcastToGroup = (message: WsMessage, users: string[]) => {
  users.forEach((uuid) => {
    const connection = websocketState.connectionPool[uuid];
    connection?.send(JSON.stringify(message));
  });
};
