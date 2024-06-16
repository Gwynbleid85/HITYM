import { Result } from "@badrap/result";
import type { NewGroup, GroupUpdate } from "./types";
import type { GroupEvent, Group, User } from "../../../types";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError, toUser } from "../../../utils";

export const GroupRepository = {
  /// Create a new group
  /// @param newGroup The group to create
  /// @returns The created group
  async create(newGroup: NewGroup): Promise<Result<Group>> {
    try {
      const createdGroup = await prisma.group.create({ data: newGroup });
      return Result.ok(createdGroup);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Find a group by its ID
  /// @param id The ID of the group to find
  /// @returns The group if found
  async findById(id: string): Promise<Result<Group>> {
    try {
      const group = await prisma.group.findUnique({ where: { id } });
      if (!group) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(group);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all user groups
  /// @param userId The ID of the user
  /// @returns All groups
  async getAll(userId: string): Promise<Result<Group[]>> {
    try {
      const groups = await prisma.group.findMany({ where: { users: { some: { id: userId } } } });
      return Result.ok(groups);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Add user to group
  /// @param userId The ID of the user
  /// @param groupId The ID of the group
  async addUser(userId: string, groupId: string): Promise<Result<void>> {
    try {
      await prisma.group.update({
        where: { id: groupId },
        data: {
          users: {
            connect: { id: userId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Remove user from group
  /// @param userId The ID of the user
  /// @param groupId The ID of the group
  async removeUser(userId: string, groupId: string): Promise<Result<void>> {
    try {
      await prisma.group.update({
        where: { id: groupId },
        data: {
          users: {
            disconnect: { id: userId },
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Delete a group
  /// @param id The ID of the group to delete
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.group.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Update a group
  /// @param id The ID of the group to update
  /// @param group The new group
  async update(id: string, group: GroupUpdate): Promise<Result<Group>> {
    try {
      const updatedGroup = await prisma.group.update({
        where: { id },
        data: group,
      });
      return Result.ok(updatedGroup);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Update a group image
  /// @param id The ID of the group to update
  /// @param imageUrl The new image URL
  async updateImage(id: string, imageUrl: string): Promise<Result<Group>> {
    try {
      const updatedGroup = await prisma.group.update({
        where: { id },
        data: { imageUrl },
      });
      return Result.ok(updatedGroup);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get group events
  /// @param groupId The ID of the group
  /// @returns All events
  async getGroupEvents(groupId: string): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany({ where: { groupId } });
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all users in a group
  /// @param groupId The ID of the group
  /// @returns All users
  async getGroupUsers(groupId: string): Promise<Result<User[]>> {
    try {
      const users = await prisma.group.findUnique({ where: { id: groupId } }).users();
      if (!users) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(users.map(toUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all groups
  /// @returns All groups
  async getAllGroups(): Promise<Result<Group[]>> {
    try {
      const groups = await prisma.group.findMany();
      return Result.ok(groups);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
