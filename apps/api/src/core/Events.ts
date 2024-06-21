import type { Event } from "@event-driven-io/emmett";

export type UserLoggedIn = Event<
  "userLoggedIn",
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
    x: number;
    y: number;
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
