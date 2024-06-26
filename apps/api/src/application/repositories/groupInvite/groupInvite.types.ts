import type { Group, GroupInvite } from "../../../types";

export type NewGroupInvite = {
  groupId: string;
  invitedUserId: string;
  invitedById: string;
};

/**
 * Group invite
 * @typedef {object} GroupInviteExtended
 * @property {string} id.required - Invite ID
 * @property {string} groupId.required - Group ID
 * @property {string} invitedUserId.required - Invited user ID
 * @property {string} invitedById.required - Invited by user ID
 * @property {Group} group - Group
 */
export type GroupInviteExtended = GroupInvite & {
  group: Group;
};
