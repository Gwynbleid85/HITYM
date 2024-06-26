import { addToAllowedGroups } from "../../api/websocket/wsUtils";
import type { UserSharedPositionWithGroup } from "../../core/Events";
import { groupRepository } from "../repositories/group/group.repository";

export const userSharedPositionWithGroupHandler = async (event: UserSharedPositionWithGroup) => {
  const userId = event.data.userId;
  const groupId = event.data.groupId;

  // Get group users
  const groupUsers = await groupRepository.getGroupUsers(groupId);
  if (groupUsers.isErr) {
    console.error(`Group with id ${groupId} not found`);
    return;
  }
  const allowedUsers = groupUsers.value.map((user) => user.id);

  addToAllowedGroups(userId, allowedUsers);
};
