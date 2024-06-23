import type { UserStatusUpdated } from "../../core/Events";
import { websocketState } from "../../api/websocket/websocket";
import { broadcastToGroup } from "../../api/websocket/wsUtils";
import type { UserStatusUpdatedMessage } from "../../../../../packages/shared-types/WsMessages";

export const userStatusUpdatedHandler = (event: UserStatusUpdated) => {
  console.log(event);

  // Send all subscribed users a message that the user has logged in
  const receivers = websocketState.broadcastGroups[event.data.userId];
  const { type, data } = event;
  const { userId, ...status } = data;
  const newWsMessage = {
    type,
    sender: "server",
    data: {
      ...status,
    },
  } as UserStatusUpdatedMessage;

  if (receivers) {
    broadcastToGroup(newWsMessage, [...receivers]);
  }
};
