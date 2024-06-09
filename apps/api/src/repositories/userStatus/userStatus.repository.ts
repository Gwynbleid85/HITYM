import prisma from "../../client";
import type { NewUserStatus } from "./types";
import { Result } from "@badrap/result";
import handleDbExceptions, { NotFoundError } from "../../utils";
import type { UserStatus } from "../../types";

export const userStatusRepository = {
  async upsert(userStatus: NewUserStatus, userId: string): Promise<Result<UserStatus>> {
    try {
      const newStatus = await prisma.userStatus.upsert({
        where: { userId: userId },
        update: userStatus,
        create: { ...userStatus, userId },
      });
      return Result.ok(newStatus);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async findByUserId(userId: string): Promise<Result<UserStatus>> {
    try {
      const userStatus = await prisma.userStatus.findUnique({ where: { userId } });
      if (!userStatus) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(userStatus);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  async delete(userId: string): Promise<Result<void>> {
    try {
      await prisma.userStatus.delete({ where: { userId } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
