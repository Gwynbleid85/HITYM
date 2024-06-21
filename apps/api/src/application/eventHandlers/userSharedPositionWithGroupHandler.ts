import { websocketState } from "../../api/websocket/websocket";
import type { UserSharedPositionWithGroup } from "../../core/Events";
import { groupRepository } from "../repositories/group/group.repository";

export const userSharedPositionWithGroupHandler = async (event: UserSharedPositionWithGroup) => {
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
  websocketState.allowedBroadcastGroups[userId] = new Set([
    ...(websocketState.allowedBroadcastGroups[userId] || []),
    ...groupUsersIds,
  ]);

  // Merge requested and allowed broadcast groups
  websocketState.broadcastGroups[userId] = new Set([
    ...(websocketState.requestBroadcastGroups[userId] || []),
    ...(websocketState.allowedBroadcastGroups[userId] || []),
  ]);
};
