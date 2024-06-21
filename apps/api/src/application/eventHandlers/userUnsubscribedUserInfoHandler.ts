import { websocketState } from "../../api/websocket/websocket";
import type { UserUnsubscribedUserInfo } from "../../core/Events";

export const UserUnsubscribedUserInfoHandler = (event: UserUnsubscribedUserInfo) => {
  console.log(event);

  const userId = event.data.userId;
  const usersToUnsubscribe = event.data.usersToUnsubscribe;

  // Update ws broadcast groups
  for (const user of usersToUnsubscribe) {
    // Update requested users
    if (!websocketState.requestBroadcastGroups[user]) {
      websocketState.requestBroadcastGroups[user] = new Set();
    }
    websocketState.requestBroadcastGroups[user].delete(userId);

    // Merge requested and allowed broadcast groups
    websocketState.broadcastGroups[userId] = new Set([
      ...websocketState.requestBroadcastGroups[user],
      ...(websocketState.allowedBroadcastGroups[user] || []),
    ]);
  }
};
