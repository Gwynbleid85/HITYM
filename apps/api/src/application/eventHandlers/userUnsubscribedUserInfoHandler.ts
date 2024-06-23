import { getWelcomeMessage, removeFromRequestGroups, sendToUser } from "../../api/websocket/wsUtils";
import type { UserUnsubscribedUserInfo } from "../../core/Events";

export const UserUnsubscribedUserInfoHandler = async (event: UserUnsubscribedUserInfo) => {
  console.log(event);

  const userId = event.data.userId;
  const usersToUnsubscribe = event.data.usersToUnsubscribe;

  removeFromRequestGroups(userId, usersToUnsubscribe);

  // Send new user data to user via ws
  const welcomeMessage = await getWelcomeMessage(userId);
  if (welcomeMessage) {
    sendToUser(userId, welcomeMessage);
  }
};
