import { removeFromAllowedGroups } from "../../api/websocket/wsUtils";
import type { UserUnsharedPositionWithGroup } from "../../core/Events";
import { groupRepository } from "../repositories/group/group.repository";

export const userUnsharedPositionWithGroupHandler = async (event: UserUnsharedPositionWithGroup) => {
  const userId = event.data.userId;
  const groupId = event.data.groupId;

  // Get group users
  const groupUsers = await groupRepository.getGroupUsers(groupId);
  if (groupUsers.isErr) {
    console.error(`Group with id ${groupId} not found`);
    return;
  }
  const usersToUnsharePosWith = groupUsers.value.map((user) => user.id);

  removeFromAllowedGroups(userId, usersToUnsharePosWith);
};
