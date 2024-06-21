import { Result } from "@badrap/result";
import prisma from "../../../client";
import type { GroupInvite } from "../../../types";
import handleDbExceptions, { NotFoundError } from "../../../utils";
import type { GroupInviteExtended, NewGroupInvite } from "./groupInvite.types";

export const groupInviteRepository = {
  // Create a new group invite
  // @param newInvite The invite to create
  // @returns The created invite
  async create(newInvite: NewGroupInvite): Promise<Result<GroupInvite>> {
    try {
      ///TODO: Test relation constraints
      const createdInvite = await prisma.groupInvite.create({ data: newInvite });
      return Result.ok(createdInvite);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all invites for a user
  // @param userId The ID of the user
  // @returns All user invites
  async getUserInvites(userId: string): Promise<Result<GroupInviteExtended[]>> {
    try {
      const invites = await prisma.groupInvite.findMany({
        where: { invitedUserId: userId },
        select: {
          id: true,
          invitedById: true,
          invitedUserId: true,
          groupId: true,
          group: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              description: true,
              createdById: true,
            },
          },
        },
      });
      return Result.ok(invites);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all invites for a group
  // @param groupId The ID of the group
  // @returns All group invites
  async getGroupInvites(groupId: string): Promise<Result<GroupInvite[]>> {
    try {
      const invites = await prisma.groupInvite.findMany({ where: { groupId } });
      return Result.ok(invites);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Delete a group invite
  // @param id The ID of the invite to delete
  async delete(invite_id: string): Promise<Result<void>> {
    try {
      await prisma.groupInvite.delete({ where: { id: invite_id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Accept a group invite
  // @param id The ID of the invite to accept
  async accept(invite_id: string): Promise<Result<void>> {
    try {
      const invite = await prisma.groupInvite.findUnique({ where: { id: invite_id } });
      if (!invite) {
        return Result.err(new NotFoundError());
      }
      await prisma.$transaction([
        prisma.groupInvite.delete({ where: { id: invite_id } }),
        prisma.group.update({
          where: { id: invite.groupId },
          data: {
            users: {
              connect: { id: invite.invitedUserId },
            },
          },
        }),
      ]);
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get a group invite by ID
  // @param id The ID of the invite
  // @returns The invite
  async getById(id: string): Promise<Result<GroupInvite>> {
    try {
      const invite = await prisma.groupInvite.findUnique({ where: { id } });
      if (!invite) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(invite);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async getByUserAndGroup(userId: string, groupId: string): Promise<Result<GroupInvite>> {
    try {
      const invite = await prisma.groupInvite.findFirst({ where: { invitedUserId: userId, groupId } });
      if (!invite) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(invite);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
