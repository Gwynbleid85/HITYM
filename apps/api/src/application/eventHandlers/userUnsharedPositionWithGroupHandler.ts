import { websocketState } from "../../api/websocket/websocket";
import type { UserUnsharedPositionWithGroup } from "../../core/Events";
import { groupRepository } from "../repositories/group/group.repository";

export const userUnsharedPositionWithGroupHandler = async (event: UserUnsharedPositionWithGroup) => {
  console.log(event);

  const userId = event.data.userId;
  const groupId = event.data.groupId;

  // Get group users
  const groupUsers = await groupRepository.getGroupUsers(groupId);
  if (groupUsers.isErr) {
    console.error(`Group with id ${groupId} not found`);
    return;
  }
  const groupUsersIds = groupUsers.value.map((user) => user.id);

  // Update ws broadcast groups
  for (const user of groupUsersIds) {
    websocketState.allowedBroadcastGroups[userId]?.delete(user);
  }

  // Merge requested and allowed broadcast groups
  websocketState.broadcastGroups[userId] = new Set([
    ...(websocketState.requestBroadcastGroups[userId] || []),
    ...(websocketState.allowedBroadcastGroups[userId] || []),
  ]);
};
