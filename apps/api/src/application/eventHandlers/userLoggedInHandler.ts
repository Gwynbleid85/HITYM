import type { UserLoggedIn } from "../../core/Events";
import { websocketState, broadcastToGroup } from "../../api/websocket/websocket";

export const userLoggedInHandler = (event: UserLoggedIn) => {
  console.log(event);

  // Send all subscribed users a message that the user has logged in
  const receivers = websocketState.broadcastGroups[event.data.userId];
  const { type, data } = event;
  const newWsMessage = {
    type,
    sender: "server",
    data,
  };

  if (receivers) {
    broadcastToGroup(newWsMessage, [...receivers]);
  }
};
