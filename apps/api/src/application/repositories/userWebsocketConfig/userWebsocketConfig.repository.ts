import { Result } from "@badrap/result";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError } from "../../../utils";
import type { UserWebsocketConfig } from "./types";

export const userWsConfigRepository = {
  async FindByUserId(userIdToFind: string): Promise<Result<UserWebsocketConfig>> {
    try {
      const userWsConfig = await prisma.userWebsocketConfig.findUnique({
        where: { userId: userIdToFind },
        select: {
          userId: true,
          positionSharedWith: {
            select: {
              users: {
                select: { id: true },
              },
            },
          },
          positionFollowedOf: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!userWsConfig) {
        return Result.err(new NotFoundError());
      }
      const { positionSharedWith, positionFollowedOf, userId } = userWsConfig;
      return Result.ok({
        userId,
        positionSharedWith: positionSharedWith.flatMap((group) => group.users.map((user) => user.id)),
        positionFollowedOf: positionFollowedOf.map((user) => user.id),
      });
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async SharePositionWithGroup(userId: string, groupId: string): Promise<Result<string[]>> {
    try {
      const res = await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionSharedWith: {
            connect: { id: groupId },
          },
        },
        select: {
          positionSharedWith: {
            select: {
              users: {
                select: { id: true },
              },
            },
            where: {
              id: groupId,
            },
          },
        },
      });
      if (!res.positionSharedWith[0]) {
        return Result.err(new NotFoundError());
      }

      return Result.ok(res.positionSharedWith[0].users.map((user) => user.id));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async UnsharePositionsWithGroup(userId: string, groupId: string): Promise<Result<string[]>> {
    try {
      const res = await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionSharedWith: {
            disconnect: { id: groupId },
          },
        },
        select: {
          positionSharedWith: {
            select: {
              users: {
                select: { id: true },
              },
            },
            where: {
              id: groupId,
            },
          },
        },
      });
      if (!res.positionSharedWith[0]) {
        return Result.err(new NotFoundError());
      }

      return Result.ok(res.positionSharedWith[0].users.map((user) => user.id));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async FollowUserPosition(userId: string, targetUserId: string[]): Promise<Result<void>> {
    try {
      await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionSharedWith: {
            connect: targetUserId.map((id) => ({ id })),
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async UnfollowUserPosition(userId: string, targetUserId: string[]): Promise<Result<void>> {
    try {
      await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionSharedWith: {
            disconnect: targetUserId.map((id) => ({ id })),
          },
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async UpdateConnectionStatus(userId: string, active: boolean): Promise<Result<void>> {
    try {
      await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          active,
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
