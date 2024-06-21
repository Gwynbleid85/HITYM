import type { UserChangedPosition } from "../../core/Events";
import { websocketState, broadcastToGroup } from "../../api/websocket/websocket";

export const userChangedPositionHandler = (event: UserChangedPosition) => {
  console.log(event);

  // Send all subscribed users a message that the user changed his position
  const receivers = websocketState.broadcastGroups[event.data.userId];
  const { type, data } = event;
  const newWsMessage = {
    type,
    sender: event.data.userId,
    data,
  };

  if (receivers) {
    broadcastToGroup(newWsMessage, [...receivers]);
  }
};
