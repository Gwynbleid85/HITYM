export type MessageBase = {
  sender: string;
};

export type WsMessage =
  | UserChangedPositionMessage
  | UserDisconnectedMessage
  | WelcomeMessage
  | AuthRequiredMessage
  | UserConnectedMessage
  | AuthMessage
  | UserStatusUpdatedMessage;

export type UserConnectedMessage = MessageBase & {
  type: "userConnected";
  data: {
    userId: string;
  };
};

export type WelcomeMessage = MessageBase & {
  type: "welcome";
  data: {
    userId: string;
    // List of users that the current user is following
    // containing their last position and status
    followedUsers: {
      userId: string;
      name: string;
      profilePicture: string | null;
      lastPosition: {
        latitude: number;
        longitude: number;
      } | null;
      status: {
        status: string;
        color: string;
      } | null;
      active: boolean;
    }[];
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
    latitude: number;
    longitude: number;
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

export type UserStatusUpdatedMessage = MessageBase & {
  type: "userStatusUpdated";
  data: {
    status: {
      status: string;
      color: string;
    } | null;
  };
};
