import type { WelcomeMessage, WsMessage } from "../../../../../packages/shared-types/WsMessages";
import { userWsConfigRepository } from "../../application/repositories/userWebsocketConfig/userWebsocketConfig.repository";
import { setIntersection } from "../../utils";
import { websocketState } from "./websocket";

// Add users to requestBroadcastGroups
export const addToRequestGroups = (userId: string, usersToSubscribe: string[]) => {
  for (const user of usersToSubscribe) {
    // Update requested users
    if (!websocketState.requestBroadcastGroups[user]) {
      websocketState.requestBroadcastGroups[user] = new Set();
    }
    websocketState.requestBroadcastGroups[user].add(userId);

    // Merge requested and allowed broadcast groups
    updateBroadcastGroups(user);
  }
};

// Remove users from requestBroadcastGroups
export const removeFromRequestGroups = (userId: string, usersToUnsubscribe: string[]) => {
  for (const user of usersToUnsubscribe) {
    // Update requested users
    if (!websocketState.requestBroadcastGroups[user]) {
      websocketState.requestBroadcastGroups[user] = new Set();
    }
    websocketState.requestBroadcastGroups[user].delete(userId);
    if (websocketState.requestBroadcastGroups[user].size === 0) {
      delete websocketState.requestBroadcastGroups[user];
    }

    // Merge requested and allowed broadcast groups
    updateBroadcastGroups(userId);
  }
};

// Add users to allowedBroadcastGroups
export const addToAllowedGroups = (userId: string, usersToShareWith: string[]) => {
  websocketState.allowedBroadcastGroups[userId] = new Set([
    ...(websocketState.allowedBroadcastGroups[userId] || []),
    ...usersToShareWith,
  ]);

  // Update broadcastGroups for user
  updateBroadcastGroups(userId);
};

// Remove users from allowedBroadcastGroups
export const removeFromAllowedGroups = (userId: string, usersToUnshareWith: string[]) => {
  if (websocketState.allowedBroadcastGroups[userId]) {
    // Remove users from allowedBroadcastGroups
    usersToUnshareWith.forEach((user) => {
      websocketState.allowedBroadcastGroups[userId]?.delete(user);
    });
  }

  // Update broadcastGroups for user
  updateBroadcastGroups(userId);
};

// Clear all broadcast groups for a user
export const clearAllBroadcastGroups = (userId: string) => {
  delete websocketState.allowedBroadcastGroups[userId];
  delete websocketState.broadcastGroups[userId];

  // Remove user from other users' requestBroadcastGroups
  for (const user in websocketState.requestBroadcastGroups) {
    websocketState.requestBroadcastGroups[user]?.delete(userId);
    if (websocketState.requestBroadcastGroups[user]?.size === 0) {
      delete websocketState.requestBroadcastGroups[user];
    }
  }
  updateBroadcastGroups(userId);
};

// Update broadcast groups for a user
export const updateBroadcastGroups = (userId: string) => {
  const newSet: Set<string> = setIntersection(
    websocketState.requestBroadcastGroups[userId] || new Set(),
    websocketState.allowedBroadcastGroups[userId] || new Set()
  );
  if (newSet.size !== 0) {
    websocketState.broadcastGroups[userId] = newSet;
  }
};

/**
 * Create welcome message for a user
 * @param userId user to get the welcome message for
 */
export const getWelcomeMessage = async (userId: string): Promise<WelcomeMessage | null> => {
  const welcomeData = await userWsConfigRepository.getUserWelcomeData(userId);
  if (welcomeData.isErr) {
    return null;
  }

  // Send loggedIn in message
  return {
    type: "welcome",
    sender: "server",
    data: {
      userId: userId,
      followedUsers: welcomeData.value,
    },
  } as WelcomeMessage;
};

/**
 * Broadcast a message to a group of users
 * @param message message to broadcast
 * @param users list of user ids to broadcast to
 */
export const broadcastToGroup = (message: WsMessage, users: string[]) => {
  users.forEach((uuid) => {
    const connection = websocketState.connectionPool[uuid];
    connection?.send(JSON.stringify(message));
  });
};

/**
 * Send a message to a user
 * @param userId user to send the message to
 * @param message message to send
 */
export const sendToUser = (userId: string, message: WsMessage) => {
  const connection = websocketState.connectionPool[userId];
  connection?.send(JSON.stringify(message));
};
