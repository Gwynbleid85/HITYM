import type { Position } from "../../../types";
import type { UserStatusSimple } from "../user/types";

export type UserWebsocketConfig = {
  userId: string;
  positionSharedWith: string[];
  positionFollowedOf: string[];
};

export type FollowedUsers = {
  userId: string;
  name: string;
  profilePicture: string | null;
  lastPosition: Position | null;
  status: UserStatusSimple | null;
  active: boolean;
};
