import { websocketState } from "../../api/websocket/websocket";
import type { UserSubscribedUserInfo } from "../../core/Events";

export const userSubscribedUserInfoHandler = (event: UserSubscribedUserInfo) => {
  console.log(event);

  const userId = event.data.userId;

  // Update ws broadcast groups
  for (const user of event.data.usersToSubscribe) {
    // Update requested users
    if (!websocketState.requestBroadcastGroups[user]) {
      websocketState.requestBroadcastGroups[user] = new Set();
    }
    websocketState.requestBroadcastGroups[user].add(userId);

    // Merge requested and allowed broadcast groups
    websocketState.broadcastGroups[userId] = new Set([
      ...websocketState.requestBroadcastGroups[user],
      ...(websocketState.allowedBroadcastGroups[user] || []),
    ]);
  }
};
