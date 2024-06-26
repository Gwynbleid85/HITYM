import type { UserChangedPosition } from "../../core/Events";
import { websocketState } from "../../api/websocket/websocket";
import { userWsConfigRepository } from "../repositories/userWebsocketConfig/userWebsocketConfig.repository";
import type { UserChangedPositionMessage } from "../../../../../packages/shared-types/WsMessages";
import { broadcastToGroup } from "../../api/websocket/wsUtils";

export const userChangedPositionHandler = (event: UserChangedPosition) => {
  // Send all subscribed users a message that the user changed his position
  const receivers = websocketState.broadcastGroups[event.data.userId];
  const { type, data } = event;
  const newWsMessage: UserChangedPositionMessage = {
    type,
    sender: event.data.userId,
    data,
  };

  if (receivers) {
    broadcastToGroup(newWsMessage, [...receivers]);
  }

  userWsConfigRepository.UpdateUserPosition(event.data.userId, {
    latitude: event.data.latitude,
    longitude: event.data.longitude,
  });
};
