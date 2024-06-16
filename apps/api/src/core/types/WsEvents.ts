export type MessageBase = {
  sender: string;
};

export type WsMessage =
  | UserConnectedMessage
  | PositionChangedMessage
  | UserDisconnectedMessage
  | SimpleMessage
  | LoggedInMessage
  | AuthRequiredMessage;

export type SimpleMessage = MessageBase & {
  event: "simple";
  data: string;
};

export type UserConnectedMessage = MessageBase & {
  event: "userConnected";
};

// Remove after auth is finished
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

export type SubscribeUserInfoMessage = MessageBase & {
  event: "subscribe";
  usersToSubscribe: string[];
};

export type AuthRequiredMessage = MessageBase & {
  event: "authRequired";
};

export type AuthMessage = MessageBase & {
  event: "auth";
  token: string;
};
