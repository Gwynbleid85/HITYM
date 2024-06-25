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

/**
 * User websocket config
 * @typedef {object} PositionSharingConfig
 * @property {string[]} sharingWith - Ids of groups the user is sharing their position with
 * @property {string[]} following - Ids of groups the user is following
 */
export type PositionSharingConfig = {
  sharingWith: string[];
  following: string[];
};
