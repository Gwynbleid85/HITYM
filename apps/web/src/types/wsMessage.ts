export type WsMessage =
  | UserConnectedMessage
  | PositionChangedMessage
  | UserDisconnectedMessage
  | SimpleMessage
  | LoggedInMessage;

export type MessageBase = {
  sender: string;
};

export type SimpleMessage = MessageBase & {
  event: "simple";
  data: string;
};

export type UserConnectedMessage = MessageBase & {
  event: "userConnected";
};

export type LoggedInMessage = MessageBase & {
  event: "loggedIn";
  data: {
    id: string;
    name: string;
  };
};

export type PositionChangedMessage = MessageBase & {
  event: "positionChanged";
  data: {
    x: number;
    y: number;
  };
};

export type UserDisconnectedMessage = MessageBase & {
  event: "userDisconnected";
  code: number;
};

export type UserClickedButtonMessage = MessageBase & {
  event: "userClickedButton";
  clicks: number;
};

export function isWsMessage(message: unknown): message is WsMessage {
  // Adjust the check according to the structure of WsMessage
  return (message as WsMessage) !== undefined && (message as WsMessage) !== null;
}
