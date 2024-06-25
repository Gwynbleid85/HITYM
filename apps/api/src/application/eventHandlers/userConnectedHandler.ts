import type { UserConnected } from "../../core/Events";
import { websocketState } from "../../api/websocket/websocket";
import { userWsConfigRepository } from "../repositories/userWebsocketConfig/userWebsocketConfig.repository";
import { broadcastToGroup } from "../../api/websocket/wsUtils";

export const userConnectedHandler = async (event: UserConnected) => {
  await userWsConfigRepository.UpdateConnectionStatus(event.data.userId, true);

  // Send all subscribed users a message that the user has logged in
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
