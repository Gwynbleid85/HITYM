import type { UserDisconnected } from "../../core/Events";
import { websocketState } from "../../api/websocket/websocket";
import { userWsConfigRepository } from "../repositories/userWebsocketConfig/userWebsocketConfig.repository";
import { broadcastToGroup } from "../../api/websocket/wsUtils";

export const userDisconnectedHandler = (event: UserDisconnected) => {
  userWsConfigRepository.UpdateConnectionStatus(event.data.userId, false);

  // Send all subscribed users a message that the user has disconnected
  const receivers = websocketState.requestBroadcastGroups[event.data.userId];

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
