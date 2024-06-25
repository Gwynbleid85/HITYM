import { Result } from "@badrap/result";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError } from "../../../utils";
import type { FollowedUsers, PositionSharingConfig, UserWebsocketConfig } from "./types";
import type { Position } from "../../../types";

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

  async FollowGroupPosition(userId: string, groupId: string): Promise<Result<string[]>> {
    try {
      const res = await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionFollowedOf: {
            connect: { id: groupId },
          },
        },
        select: {
          positionFollowedOf: {
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
      if (!res.positionFollowedOf[0]) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(res.positionFollowedOf[0].users.map((user) => user.id));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async UnfollowGroupPosition(userId: string, groupId: string): Promise<Result<string[]>> {
    try {
      const res = await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          positionSharedWith: {
            disconnect: { id: groupId },
          },
        },
        select: {
          positionFollowedOf: {
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
      if (!res.positionFollowedOf[0]) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(res.positionFollowedOf[0].users.map((user) => user.id));
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

  async getUserWelcomeData(userId: string): Promise<Result<FollowedUsers[]>> {
    try {
      const followedUsers = await prisma.userWebsocketConfig.findUnique({
        where: { userId },
        select: {
          positionFollowedOf: {
            select: {
              users: {
                select: {
                  id: true,
                  name: true,
                  profilePicture: true,
                  userWebsocketConfig: {
                    select: {
                      active: true,
                      lastLatitude: true,
                      lastLongitude: true,
                    },
                  },
                  status: {
                    select: {
                      status: true,
                      color: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!followedUsers) {
        return Result.err(new NotFoundError());
      }

      const data = followedUsers.positionFollowedOf[0]?.users.map((user) => {
        let lastPosition = null;
        if (user.userWebsocketConfig?.lastLatitude && user.userWebsocketConfig?.lastLongitude) {
          lastPosition = {
            latitude: user.userWebsocketConfig.lastLatitude,
            longitude: user.userWebsocketConfig.lastLongitude,
          };
        }
        let active = false;
        if (user.userWebsocketConfig?.active) {
          active = user.userWebsocketConfig.active;
        }

        return {
          userId: user.id,
          name: user.name,
          profilePicture: user.profilePicture,
          lastPosition,
          status: user.status,
          active,
        };
      });
      if (!data) {
        return Result.err(new NotFoundError());
      }

      return Result.ok(data);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async UpdateUserPosition(userId: string, position: Position): Promise<Result<void>> {
    try {
      await prisma.userWebsocketConfig.update({
        where: { userId },
        data: {
          lastLatitude: position.latitude,
          lastLongitude: position.longitude,
        },
      });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async GetUserConfig(userId: string): Promise<Result<PositionSharingConfig>> {
    try {
      const userConfig = await prisma.userWebsocketConfig.findUnique({
        where: { userId },
        select: {
          positionSharedWith: {
            select: {
              id: true,
            },
          },
          positionFollowedOf: {
            select: {
              id: true,
            },
          },
        },
      });
      if (!userConfig) {
        return Result.err(new NotFoundError());
      }
      return Result.ok({
        sharingWith: userConfig.positionSharedWith.map((group) => group.id),
        following: userConfig.positionFollowedOf.map((user) => user.id),
      });
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
