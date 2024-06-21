export type MessageBase = {
  sender: string;
};

export type WsMessage =
  | UserConnectedMessage
  | UserChangedPositionMessage
  | UserDisconnectedMessage
  | LoggedInMessage
  | AuthRequiredMessage;

export type UserConnectedMessage = MessageBase & {
  type: "userConnected";
};

// Remove after auth is finished
export type LoggedInMessage = MessageBase & {
  type: "userLoggedIn";
  data: {
    userId: string;
  };
};

export type UserDisconnectedMessage = MessageBase & {
  type: "userDisconnected";
  data: {
    userId: string;
  };
};

export type UserChangedPositionMessage = MessageBase & {
  type: "userChangedPosition";
  data: {
    x: number;
    y: number;
  };
};

export type SubscribeUserInfoMessage = MessageBase & {
  type: "subscribe";
  data: {
    usersToSubscribe: string[];
  };
};

export type AuthRequiredMessage = MessageBase & {
  type: "authRequired";
};

export type AuthMessage = MessageBase & {
  type: "auth";
  data: {
    token: string;
  };
};
