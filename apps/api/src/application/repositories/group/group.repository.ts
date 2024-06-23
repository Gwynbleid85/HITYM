import { Result } from "@badrap/result";
import type { NewGroup, GroupUpdate, GroupExtended } from "./types";
import type { GroupEvent, Group, User } from "../../../types";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError } from "../../../utils";

export const groupRepository = {
  // Create a new group
  // @param newGroup The group to create
  // @returns The created group
  async create(newGroup: NewGroup): Promise<Result<Group>> {
    try {
      const createdGroup = await prisma.group.create({
        data: {
          ...newGroup,
          users: {
            connect: {
              id: newGroup.createdById,
            },
          },
        },
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      return Result.ok(createdGroup);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a group by its ID
  // @param id The ID of the group to find
  // @returns The group if found
  async findById(id: string): Promise<Result<Group>> {
    try {
      const group = await prisma.group.findUnique({
        where: { id },
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      if (!group) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(group);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a group by its ID with users and events
  // @param id The ID of the group to find
  // @returns The extended group if found
  async findByIdExtended(id: string): Promise<Result<GroupExtended>> {
    try {
      const group = await prisma.group.findUnique({
        where: { id },
        include: {
          users: {
            select: {
              id: true,
              email: true,
              name: true,
              bio: true,
              profilePicture: true,
              status: {
                select: { status: true, color: true },
              },
            },
          },
          events: {
            where: { date: { gte: new Date() } },
            orderBy: { date: "asc" },
          },
        },
      });
      if (!group) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(group);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all user groups
  // @param userId The ID of the user
  // @returns All groups
  async getAll(userId: string): Promise<Result<Group[]>> {
    try {
      const groups = await prisma.group.findMany({
        where: { users: { some: { id: userId } } },
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      return Result.ok(groups);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Add user to group
  // @param userId The ID of the user
  // @param groupId The ID of the group
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

  // Remove user from group
  // @param userId The ID of the user
  // @param groupId The ID of the group
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

  // Delete a group
  // @param id The ID of the group to delete
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.group.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a group
  // @param id The ID of the group to update
  // @param group The new group
  async update(id: string, group: GroupUpdate): Promise<Result<Group>> {
    try {
      const updatedGroup = await prisma.group.update({
        where: { id },
        data: group,
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      return Result.ok(updatedGroup);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a group image
  // @param id The ID of the group to update
  // @param imageUrl The new image URL
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

  // Get group events
  // @param groupId The ID of the group
  // @returns All events
  async getGroupEvents(groupId: string): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany({ where: { groupId } });
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all users in a group
  // @param groupId The ID of the group
  // @returns All users
  async getGroupUsers(groupId: string): Promise<Result<User[]>> {
    try {
      const users = await prisma.group.findUnique({
        where: { id: groupId },
        select: {
          users: {
            select: {
              id: true,
              email: true,
              name: true,
              bio: true,
              profilePicture: true,
            },
          },
        },
      });
      if (!users) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(users.users);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all groups
  // @returns All groups
  async getAllGroups(): Promise<Result<Group[]>> {
    try {
      const groups = await prisma.group.findMany({
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      return Result.ok(groups);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Check if the user is the owner of the group
  // @param groupId The ID of the group
  // @param userId The ID of the user
  // @returns True if the user is the owner
  async isOwner(groupId: string, userId: string): Promise<boolean> {
    try {
      const owner = await prisma.group.findUnique({ where: { id: groupId, createdById: userId } });
      return owner != null;
    } catch (e) {
      return false;
    }
  },

  // Check if the user is a member of the group
  // @param groupId The ID of the group
  // @param userId The ID of the user
  // @returns True if the user is a member
  async isMember(groupId: string, userId: string): Promise<boolean> {
    try {
      const group = await prisma.group.findUnique({
        where: { id: groupId },
        include: { users: { select: { id: true } } },
      });
      if (!group) {
        return false;
      }
      return group.users.some((user) => user.id === userId);
    } catch (e) {
      return false;
    }
  },

  // Get all groups user is a member of
  // @param userId The ID of the user
  // @returns All groups user is a member of
  async getAllUserGroups(userId: string): Promise<Result<Group[]>> {
    try {
      const groups = await prisma.group.findMany({
        where: { users: { some: { id: userId } } },
        select: { id: true, name: true, imageUrl: true, description: true, createdById: true },
      });
      return Result.ok(groups);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get historical events of a group
  // @param groupId The ID of the group
  // @returns All historical events
  async getHistoricalEvents(groupId: string): Promise<Result<GroupEvent[]>> {
    try {
      const events = await prisma.groupEvent.findMany({
        where: { groupId, date: { lt: new Date() } },
      });
      return Result.ok(events);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all users user has access to
  // @param userId The ID of the user
  // @returns All usersIds user has access to
  async getAllUsersUserHasAccessTo(userId: string): Promise<Result<string[]>> {
    try {
      const users = await prisma.group.findMany({
        where: { users: { some: { id: userId } } },
        select: { users: { select: { id: true } } },
      });
      return Result.ok(users.flatMap((group) => group.users.map((user) => user.id)));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
