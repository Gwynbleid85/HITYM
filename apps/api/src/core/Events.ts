import type { Event } from "@event-driven-io/emmett";

export type UserConnected = Event<
  "userConnected",
  {
    userId: string;
  }
>;

export type UserDisconnected = Event<
  "userDisconnected",
  {
    userId: string;
  }
>;

export type UserChangedPosition = Event<
  "userChangedPosition",
  {
    userId: string;
    latitude: number;
    longitude: number;
  }
>;

export type UserSubscribedUserInfo = Event<
  "userSubscribedUserinfo",
  {
    userId: string;
    usersToSubscribe: string[];
  }
>;

export type UserUnsubscribedUserInfo = Event<
  "userUnsubscribedUserInfo",
  {
    userId: string;
    usersToUnsubscribe: string[];
  }
>;

export type UserSharedPositionWithGroup = Event<
  "userSharedPositionWithGroup",
  {
    userId: string;
    groupId: string;
    groupMembers: string[];
  }
>;

export type UserUnsharedPositionWithGroup = Event<
  "userUnsharedPositionWithGroup",
  {
    userId: string;
    groupId: string;
    groupMembers: string[];
  }
>;

export type UserStatusUpdated = Event<
  "userStatusUpdated",
  {
    userId: string;
    status: {
      status: string;
      color: string;
    } | null;
  }
>;
