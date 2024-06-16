import { WebSocket, type RawData } from "ws";
import type { AuthRequiredMessage, SubscribeUserInfoMessage, WsMessage } from "../../core/types/WsEvents";
import jwt from "jsonwebtoken";
import type { JWTUser } from "../../application/middlewares/auth";

const connectionPool: { [userId: string]: WebSocket } = {};
const broadcastGroups: { [originUserId: string]: string[] } = {}; // [originUser: [receiverUsers]]
const userSubscribedTo: { [userId: string]: string[] } = {}; // [receiverUser: [originUsers]]

const handleMessage = (message: RawData, user: string) => {
  const parsedMessage = JSON.parse(message.toString());
  console.log(`Received message from ${user}:`, parsedMessage);

  broadcast({ sender: user, ...parsedMessage }, [user]);
};

const handleClose = (code: number, user: string) => {
  // Notify subscribed users that this user has disconnected
  broadcastToGroup(
    {
      sender: user,
      event: "userDisconnected",
      code: code,
    },
    broadcastGroups[user] || []
  );

  // Remove user from broadcast groups
  for (const broadcastGroupId in userSubscribedTo[user]) {
    const group = broadcastGroups[broadcastGroupId];
    if (group) {
      broadcastGroups[broadcastGroupId] = group.filter((userId) => userId !== user);
    }
  }

  // Remove user from userSubscribedTo
  delete userSubscribedTo[user];

  // Remove user from connectionPool
  delete connectionPool[user];
};

const handleSubscribeUserInfoMessage = (message: SubscribeUserInfoMessage, user: string) => {
  const { usersToSubscribe } = message;

  usersToSubscribe.forEach((userId) => {
    if (!broadcastGroups[userId]) {
      broadcastGroups[userId] = [];
    }
    broadcastGroups[userId].push(user);

    if (!userSubscribedTo[user]) {
      userSubscribedTo[user] = [];
    }
    userSubscribedTo[user].push(userId);

    // Notify subscribed user that this user has connected
    // Send subscribing user the position of the subscribed user
  });
};

const handleAuth = (connection: WebSocket, message: RawData) => {
  console.log(message.toString());

  const parsedMessage = JSON.parse(message.toString());
  const { event, token } = parsedMessage;
  if (event !== "auth") {
    connection.close(1008, "Auth event expected");
    return;
  }

  // Verify token
  if (!token) {
    connection.close(1008, "Token missing");
    return;
  }

  const user = jwt.verify(token, process.env.JWT_SECRET || "") as JWTUser;

  if (!user) {
    connection.close(1008, "Invalid token");
    return;
  }

  const id = user.sub;
  connectionPool[id] = connection;

  connection.send(JSON.stringify({ sender: id, event: "loggedIn", data: { id, name: user.name } }));
  broadcast(
    {
      sender: id,
      event: "userConnected",
    },
    [id]
  );
  console.log(`User ${id} connected`);
  connection.removeListener("message", handleAuth);
  connection.on("message", (message) => handleMessage(message, id));
  connection.on("close", (code) => handleClose(code, id));
};

const broadcast = (message: WsMessage, exclude?: string[]) => {
  Object.keys(connectionPool).forEach((uuid) => {
    // Skip excluded connections
    if (exclude?.includes(uuid)) return;

    const connection = connectionPool[uuid];
    connection?.send(JSON.stringify(message));
  });
};

const broadcastToGroup = (message: WsMessage, group: string[]) => {
  group.forEach((uuid) => {
    const connection = connectionPool[uuid];
    connection?.send(JSON.stringify(message));
  });
};

export const onWsConnection = (connection: WebSocket) => {
  const message: AuthRequiredMessage = {
    sender: "server",
    event: "authRequired",
  };
  connection.send(JSON.stringify(message));
  connection.once("message", (message) => handleAuth(connection, message));
};
