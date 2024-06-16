import { Result } from "@badrap/result";
import type { NewUser, UpdateUser, UserWithPassword } from "./types";
import type { PaginationQuery, Position, User } from "../../../types";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError, toUser } from "../../../utils";

export const userRepository = {
  // Create a new user
  // @param user The user to create
  // @returns The created user
  async create(user: NewUser): Promise<Result<User>> {
    try {
      const createdUser = await prisma.user.create({ data: user });
      return Result.ok(toUser(createdUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get user password hash by their email
  // @param email The email of the user
  // @returns The user with password hash
  async getUserPasswordHash(email: string): Promise<Result<UserWithPassword>> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return Result.err(new NotFoundError());
      }

      return Result.ok({ ...toUser(user), password: user.password });
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a user by their email
  // @param email The email of the user to find
  // @returns The user if found
  async findByEmail(email: string): Promise<Result<User>> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(toUser(user));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a user by their ID
  // @param id The ID of the user to find
  // @returns The user if found
  async findById(id: string): Promise<Result<User>> {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(toUser(user));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get users last position by their ID
  // @param id The ID of the user to find
  // @returns The user last position if found
  async getLastPosition(id: string): Promise<Result<Position>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          lastLatitude: true,
          lastLongitude: true,
        },
      });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      if (!user.lastLatitude || !user.lastLongitude) {
        return Result.err(new NotFoundError());
      }
      return Result.ok({ latitude: user.lastLatitude, longitude: user.lastLongitude });
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Delete a user by their ID
  // @param id The ID of the user to delete
  async delete(id: string): Promise<Result<void>> {
    try {
      await prisma.user.delete({ where: { id } });
      return Result.ok(undefined);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get all users
  // @param pagination The pagination query
  // @returns All users
  async getAllUsers(pagination?: PaginationQuery): Promise<Result<User[]>> {
    try {
      if (!pagination) {
        const users = await prisma.user.findMany();
        return Result.ok(users.map(toUser));
      } else {
        const users = await prisma.user.findMany({
          skip: pagination.page * pagination.pageSize,
          take: pagination.pageSize,
        });
        return Result.ok(users.map(toUser));
      }
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a user name by their ID
  // @param id The ID of the user to update
  // @param name The new name
  // @returns The updated user
  async updateUser(id: string, user: UpdateUser): Promise<Result<User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: user,
      });
      return Result.ok(toUser(updatedUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a user's password by their ID
  // @param id The ID of the user to update
  // @param password The new password
  // @returns The updated user
  async updatePassword(id: string, password: string): Promise<Result<User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { password },
      });
      return Result.ok(toUser(updatedUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update a user's profile picture by their ID
  // @param id The ID of the user to update
  // @param profilePicture The new profile picture
  // @returns The updated user
  async updateProfilePicture(id: string, profilePicture: string): Promise<Result<User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { profilePicture },
      });
      return Result.ok(toUser(updatedUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update last position of a user by their ID
  // @param id The ID of the user to update
  // @param lastPosition The new last position
  // @returns The updated user
  async updateLastPosition(id: string, lastPosition: { latitude: number; longitude: number }): Promise<Result<User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { lastLatitude: lastPosition.latitude, lastLongitude: lastPosition.longitude },
      });
      return Result.ok(toUser(updatedUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Update last activity of a user by their ID
  // @param id The ID of the user to update
  // @param lastActivity The new last activity
  // @returns The updated user
  async updateLastActivity(id: string, lastActivity: Date): Promise<Result<User>> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { lastActive: lastActivity },
      });
      return Result.ok(toUser(updatedUser));
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
