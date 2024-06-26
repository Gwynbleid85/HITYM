import { Result } from "@badrap/result";
import type { NewUser, UpdateUser, UserWithPassword } from "./types";
import type { PaginationQuery, User } from "../../../types";
import prisma from "../../../client";
import handleDbExceptions, { NotFoundError } from "../../../utils";

export const userRepository = {
  // Create a new user
  // @param user The user to create
  // @returns The created user
  async create(user: NewUser): Promise<Result<User>> {
    try {
      const createdUser = await prisma.user.create({
        data: {
          ...user,
          userWebsocketConfig: {
            create: {
              positionSharedWith: {},
              positionFollowedOf: {},
              active: false,
            },
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      return Result.ok(createdUser);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Get user password hash by their email
  // @param email The email of the user
  // @returns The user with password hash
  async getUserPasswordHash(email: string): Promise<Result<UserWithPassword>> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
          password: true,
        },
      });
      if (!user) {
        return Result.err(new NotFoundError());
      }

      return Result.ok(user);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a user by their email
  // @param email The email of the user to find
  // @returns The user if found
  async findByEmail(email: string): Promise<Result<User>> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(user);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  // Find a user by their ID
  // @param id The ID of the user to find
  // @returns The user if found
  async findById(id: string): Promise<Result<User>> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      if (!user) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(user);
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
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
            profilePicture: true,
          },
        });
        return Result.ok(users);
      } else {
        const users = await prisma.user.findMany({
          skip: pagination.page * pagination.pageSize,
          take: pagination.pageSize,
          select: {
            id: true,
            email: true,
            name: true,
            bio: true,
            profilePicture: true,
          },
        });
        return Result.ok(users);
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
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      return Result.ok(updatedUser);
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
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      return Result.ok(updatedUser);
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
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          profilePicture: true,
        },
      });
      return Result.ok(updatedUser);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
