import { handleRepositoryErrors, parseRequest } from "../../../utils";
import type { Request, Response } from "express";
import {
  acceptGroupInviteSchema,
  addFavoritePlaceSchema,
  inviteUserToGroupSchema,
  removeFavoritePlaceSchema,
  updatePasswordSchema,
  updateUserSchema,
  updateUserStatusSchema,
  userLoginDataSchema,
  userRegistrationDataSchema,
  userStatusRequestSchema,
} from "../validationSchemas/user.validationSchemas";
import { compareSync, hashSync } from "bcrypt-ts";
import { userRepository } from "../../../application/repositories/user/user.repository";
import type { NewUser } from "../../../application/repositories/user/types";
import { env } from "process";
import type { User, UserLoginResult } from "../../../types";
import type { Result } from "@badrap/result";
import jwt from "jsonwebtoken";
import { userStatusRepository } from "../../../application/repositories/userStatus/userStatus.repository";
import { placeRepository } from "../../../application/repositories/place/place.repostory";
import { groupRepository } from "../../../application/repositories/group/group.repository";
import { groupInviteRepository } from "../../../application/repositories/groupInvite/groupInvite.repository";
import { userStatusUpdatedHandler } from "../../../application/eventHandlers/userStatusUpdatedHandler";
import type { UserStatusUpdated } from "../../../core/Events";
import { userWsConfigRepository } from "../../../application/repositories/userWebsocketConfig/userWebsocketConfig.repository";

export const userController = {
  /*
   * Register a new user
   * @param req Request object
   * @param res Response object
   */
  async registerUser(req: Request, res: Response) {
    const request = await parseRequest(userRegistrationDataSchema, req, res);
    if (!request) return;

    // Check if user with email already exists
    const user = await userRepository.findByEmail(request.body.email);
    if (user.isOk) {
      return res.status(400).json({
        name: "ConflictError",
        message: "User with this email already exists",
      });
    }

    // Map request to new user
    const newUser: NewUser = request.body;

    // Hash password
    ///TODO: Enable hashing when done debugging !!!!!!!!!!!!!!!!!!!
    // newUser.password = hashSync(newUser.password, env.PASS_HASH_SALT);

    // Save new user to db
    const savedUser: Result<User> = await userRepository.create(newUser);

    // Handle result
    if (savedUser.isErr) {
      handleRepositoryErrors(savedUser.error, res);
      return;
    }
    res.status(201).json(savedUser.value);
  },

  /*
   * Login user
   * @param req Request object
   * @param res Response object
   */
  async loginUser(req: Request, res: Response) {
    const request = await parseRequest(userLoginDataSchema, req, res);
    if (!request) return;

    // Check if user with email exists
    const userRes = await userRepository.getUserPasswordHash(request.body.email);
    if (userRes.isErr) {
      return res.status(404).json({
        name: "NotFoundError",
        message: "User with this email not found",
      });
    }
    const user = userRes.value;

    ///TODO: Enable hashing when done debugging !!!!!!!!!!!!!!!!!!!
    if (request.body.password.localeCompare(user.password)) {
      return res.status(400).json({
        name: "ValidationError",
        message: "Invalid password",
      });
    }

    // Check if password is correct
    // if (!compareSync(request.body.password, user.password)) {
    //   return res.status(400).json({
    //     name: "ValidationError",
    //     message: "Invalid password",
    //   });
    // }

    // Generate jwt token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      env.JWT_SECRET || "",
      {
        expiresIn: "1w",
      }
    );

    const userData = await userRepository.findById(user.id);
    if (userData.isErr) {
      handleRepositoryErrors(userData.error, res);
      return;
    }

    return res.status(200).json({
      user: userData.value,
      token: token,
    } as UserLoginResult);
  },

  /*
   * Get user
   * @param req Request object
   * @param res Response object
   */
  async getUser(req: Request, res: Response) {
    const result = await userRepository.findById(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Test authorization
   * @param req Request object
   * @param res Response object
   */
  async testAuthorization(req: Request, res: Response) {
    res.status(200).json(req.user);
  },

  /*
   * Delete user
   * @param req Request object
   * @param res Response object
   */
  async deleteUser(req: Request, res: Response) {
    const result = await userRepository.delete(req.user.sub);

    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }
    return res.status(204);
  },

  /*
   * Get all users
   * @param _req Request object
   * @param res Response object
   */
  async getAllUsers(_req: Request, res: Response) {
    const users = await userRepository.getAllUsers();
    if (users.isErr) {
      handleRepositoryErrors(users.error, res);
      return;
    }

    // Map users to simple users
    const simpleUsers = users.value.map((user) => {
      return {
        id: user.id,
        name: user.name,
        profilePicture: user.profilePicture,
      };
    });
    return res.status(200).json(simpleUsers);
  },

  /*
   * Update user
   * @param req Request object
   * @param res Response object
   */
  async updateUser(req: Request, res: Response) {
    const request = await parseRequest(updateUserSchema, req, res);
    if (!request) return;

    const result = await userRepository.updateUser(req.user.sub, request.body);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Update user password
   * @param req Request object
   * @param res Response object
   */
  async updatePassword(req: Request, res: Response) {
    const request = await parseRequest(updatePasswordSchema, req, res);
    if (!request) return;

    // Hash new password
    //TODO: Enable hashing when done debugging !!!!!!!!!!!!!!!!!!!
    const newHashedPassword = request.body.password;
    // const newHashedPassword = hashSync(request.body.password, env.PASS_HASH_SALT);

    const result = await userRepository.updatePassword(req.user.sub, newHashedPassword);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Update user profile picture
   * @param req Request object
   * @param res Response object
   */
  async updateProfilePicture(req: Request, res: Response) {
    await userRepository.updateProfilePicture(req.user.sub, req.finalImageName);
    return res.status(200).send();
  },

  /*
   * Update user status
   * @param req Request object
   * @param res Response object
   */
  async updateUserStatus(req: Request, res: Response) {
    const request = await parseRequest(updateUserStatusSchema, req, res);
    if (!request) return;

    const result = await userStatusRepository.upsert(request.body, req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    userStatusUpdatedHandler({
      type: "userStatusUpdated",
      data: {
        userId: req.user.sub,
        status: {
          status: result.value.status,
          color: result.value.color,
        },
      },
    } as UserStatusUpdated);

    return res.status(201).json(result.value);
  },

  /*
   * Delete user status
   * @param req Request object
   * @param res Response object
   */
  async deleteUserStatus(req: Request, res: Response) {
    const result = await userStatusRepository.delete(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    userStatusUpdatedHandler({
      type: "userStatusUpdated",
      data: {
        userId: req.user.sub,
        status: null,
      },
    } as UserStatusUpdated);

    return res.status(204).send();
  },

  /*
   * Get places created by user
   * @param req Request object
   * @param res Response object
   */
  async getOwnedPlaces(req: Request, res: Response) {
    const result = await placeRepository.getOwnedPlaces(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Get user favorite places
   * @param req Request object
   * @param res Response object
   */
  async getFavoritePlaces(req: Request, res: Response) {
    const result = await placeRepository.getFavorites(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Add place to favorites
   * @param req Request object
   * @param res Response object
   */
  async addFavoritePlace(req: Request, res: Response) {
    const request = await parseRequest(addFavoritePlaceSchema, req, res);
    if (!request) return;

    const result = await placeRepository.addToFavorites(req.user.sub, req.body.placeId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).send();
  },

  /*
   * Remove place from favorites
   * @param req Request object
   * @param res Response object
   */
  async removeFavoritePlace(req: Request, res: Response) {
    const request = await parseRequest(removeFavoritePlaceSchema, req, res);
    if (!request) return;

    const result = await placeRepository.removeFromFavorites(req.user.sub, request.params.placeId);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).send();
  },

  /*
   * Get user groups
   * @param req Request object
   * @param res Response object
   */
  async getUserGroups(req: Request, res: Response) {
    // Get user groups
    const result = await groupRepository.getAllUserGroups(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Invite user to group
   * @param req Request object
   * @param res Response object
   */
  async inviteUserToGroup(req: Request, res: Response) {
    const request = await parseRequest(inviteUserToGroupSchema, req, res);
    if (!request) return;

    //Check if user isn't already in group
    const userGroups = await groupRepository.getAllUserGroups(request.params.id);
    if (userGroups.isErr) {
      handleRepositoryErrors(userGroups.error, res);
      return;
    }
    if (userGroups.value.some((group) => group.id === request.body.groupId)) {
      return res.status(400).json({
        name: "ValidationError",
        message: "User is already in this group",
      });
    }

    // Check if user isn't already invited to group
    const invites = await groupInviteRepository.getUserInvites(request.params.id);
    if (invites.isErr) {
      handleRepositoryErrors(invites.error, res);
      return;
    }
    if (invites.value.some((invite) => invite.groupId === request.body.groupId)) {
      return res.status(400).json({
        name: "ValidationError",
        message: "User is already invited to this group",
      });
    }

    // Create invite
    const result = await groupInviteRepository.create({
      invitedUserId: request.params.id,
      groupId: request.body.groupId,
      invitedById: req.user.sub,
    });

    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(201).send();
  },

  /*
   * Accept group invite
   * @param req Request object
   * @param res Response object
   */
  async acceptGroupInvite(req: Request, res: Response) {
    const request = await parseRequest(acceptGroupInviteSchema, req, res);
    if (!request) return;

    // Check if it is invite for correct user
    const invite = await groupInviteRepository.getById(request.params.id);
    if (invite.isErr) {
      handleRepositoryErrors(invite.error, res);
      return;
    }
    if (invite.value.invitedUserId !== req.user.sub) {
      return res.status(400).json({
        name: "ValidationError",
        message: "This invite is not for you",
      });
    }

    // Accept invite
    const result = await groupInviteRepository.accept(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(201).send();
  },

  /*
   * Decline group invite
   * @param req Request object
   * @param res Response object
   */
  async declineGroupInvite(req: Request, res: Response) {
    const request = await parseRequest(acceptGroupInviteSchema, req, res);
    if (!request) return;

    // Check if it is invite for correct user
    const invite = await groupInviteRepository.getById(request.params.id);
    if (invite.isErr) {
      handleRepositoryErrors(invite.error, res);
      return;
    }
    if (invite.value.invitedUserId !== req.user.sub) {
      return res.status(400).json({
        name: "ValidationError",
        message: "This invite is not for you",
      });
    }

    // Decline invite
    const result = await groupInviteRepository.delete(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(204).send();
  },

  /*
   * Get user invites
   * @param req Request object
   * @param res Response object
   */
  async getUserInvites(req: Request, res: Response) {
    const result = await groupInviteRepository.getUserInvites(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },

  /*
   * Get user status
   * @param req Request object
   * @param res Response object
   */
  async getUserStatus(req: Request, res: Response) {
    const request = await parseRequest(userStatusRequestSchema, req, res);
    if (!request) return;

    const result = await userStatusRepository.findByUserId(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value);
  },
};
