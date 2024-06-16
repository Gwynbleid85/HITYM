import prisma from "../../../client";
import type { NewUserStatus } from "./types";
import { Result } from "@badrap/result";
import handleDbExceptions, { NotFoundError } from "../../../utils";
import type { UserStatus } from "../../../types";

export const userStatusRepository = {
  /// Upsert a user status
  /// @param userStatus The user status to upsert
  /// @param userId The user ID
  /// @returns The upserted user status
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

  /// Find a user status by their user ID
  /// @param userId The user ID
  /// @returns The user status if found
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

  /// Delete a user status by their user ID
  /// @param userId The user ID
  /// @returns The result of the operation
  async delete(userId: string): Promise<Result<void>> {
    try {
      await prisma.userStatus.delete({ where: { userId } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
