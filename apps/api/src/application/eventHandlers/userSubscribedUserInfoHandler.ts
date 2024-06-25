import { addToRequestGroups, getWelcomeMessage, sendToUser } from "../../api/websocket/wsUtils";
import type { UserSubscribedUserInfo } from "../../core/Events";

export const userSubscribedUserInfoHandler = async (event: UserSubscribedUserInfo) => {
  const userId = event.data.userId;

  addToRequestGroups(userId, event.data.usersToSubscribe);

  // Send new user data to user via ws
  const welcomeMessage = await getWelcomeMessage(userId);
  if (welcomeMessage) {
    sendToUser(userId, welcomeMessage);
  }
};
