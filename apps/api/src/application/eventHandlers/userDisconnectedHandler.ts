import type { UserDisconnected } from "../../core/Events";
import { websocketState, broadcastToGroup } from "../../api/websocket/websocket";

export const userDisconnectedHandler = (event: UserDisconnected) => {
  console.log(event);

  // Send all subscribed users a message that the user has disconnected
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
