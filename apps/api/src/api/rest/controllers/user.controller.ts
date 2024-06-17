import { handleRepositoryErrors, parseRequest } from "../../../utils";
import type { Request, Response } from "express";
import {
  addFavoritePlaceSchema,
  deleteUserSchema,
  deleteUserStatusSchema,
  getFavoritePlacesSchema,
  getOwnedPlacesSchema,
  getUserGroupsSchema,
  removeFavoritePlaceSchema,
  updatePasswordSchema,
  updateUserSchema,
  updateUserStatusSchema,
  userLoginDataSchema,
  userRegistrationDataSchema,
} from "../validationSchemas/user.validationSchemas";
import { compareSync, hashSync } from "bcrypt-ts";
import { userRepository } from "../../../application/repositories/user/user.repository";
import type { NewUser } from "../../../application/repositories/user/types";
import { env } from "process";
import type { User } from "../../../types";
import type { Result } from "@badrap/result";
import jwt from "jsonwebtoken";
import { userStatusRepository } from "../../../application/repositories/userStatus/userStatus.repository";
import { placeRepository } from "../../../application/repositories/place/place.repostory";
import { groupRepository } from "../../../application/repositories/group/group.repository";

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
      return res.status(400).send({
        name: "ConflictError",
        message: "User with this email already exists",
      });
    }

    // Map request to new user
    const newUser: NewUser = request.body;

    // Hash password
    newUser.password = hashSync(newUser.password, env.PASS_HASH_SALT);

    // Save new user to db
    const savedUser: Result<User> = await userRepository.create(newUser);

    // Handle result
    if (savedUser.isErr) {
      handleRepositoryErrors(savedUser.error, res);
      return;
    }
    console.log(savedUser.value as User);
    res.status(201).json(savedUser.value).send();
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

    // Check if password is correct
    if (!compareSync(request.body.password, user.password)) {
      return res.status(400).json({
        name: "ValidationError",
        message: "Invalid password",
      });
    }

    // Generate jwt token
    ///TODO: Make RegisterUserREquest type for swagger
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
      env.JWT_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      user_id: user.id,
      name: user.name,
      token: token,
    });
  },

  /*
   * Test authorization
   * @param req Request object
   * @param res Response object
   */
  async testAuthorization(req: Request, res: Response) {
    res.status(200).json(req.user).send();
  },

  /*
   * Delete user
   * @param req Request object
   * @param res Response object
   */
  async deleteUser(req: Request, res: Response) {
    const request = await parseRequest(deleteUserSchema, req, res);
    if (!request) return;

    const result = await userRepository.delete(request.params.id);

    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }
    return res.status(204).send();
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
    return res.status(200).json(simpleUsers).send();
  },

  /*
   * Update user
   * @param req Request object
   * @param res Response object
   */
  async updateUser(req: Request, res: Response) {
    const request = await parseRequest(updateUserSchema, req, res);
    if (!request) return;

    const result = await userRepository.updateUser(request.params.id, request.body);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update user password
   * @param req Request object
   * @param res Response object
   */
  async updatePassword(req: Request, res: Response) {
    const request = await parseRequest(updatePasswordSchema, req, res);
    if (!request) return;

    const result = await userRepository.updatePassword(request.params.id, req.body.password);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update user profile picture
   * @param req Request object
   * @param res Response object
   */
  async updateProfilePicture(req: Request, res: Response) {
    ///TODO: Allow file upload
    const request = await parseRequest(updateUserSchema, req, res);
    if (!request) return;

    const result = await userRepository.updateProfilePicture(request.params.id, req.body.profilePicture);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Update user status
   * @param req Request object
   * @param res Response object
   */
  async updateUserStatus(req: Request, res: Response) {
    const request = await parseRequest(updateUserStatusSchema, req, res);
    if (!request) return;

    const result = await userStatusRepository.upsert(request.body, request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Delete user status
   * @param req Request object
   * @param res Response object
   */
  async deleteUserStatus(req: Request, res: Response) {
    const request = await parseRequest(deleteUserStatusSchema, req, res);
    if (!request) return;

    const result = await userStatusRepository.delete(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(204).send();
  },

  /*
   * Get places created by user
   * @param req Request object
   * @param res Response object
   */
  async getOwnedPlaces(req: Request, res: Response) {
    const request = await parseRequest(getOwnedPlacesSchema, req, res);
    if (!request) return;

    // Check if user is trying to get his places
    if (req.user.sub !== request.params.id) {
      return res.status(403).send();
    }

    const result = await placeRepository.getOwnedPlaces(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Get user favorite places
   * @param req Request object
   * @param res Response object
   */
  async getFavoritePlaces(req: Request, res: Response) {
    const request = await parseRequest(getFavoritePlacesSchema, req, res);
    if (!request) return;

    // Check if user is trying to get his favorite places
    if (req.user.sub !== request.params.id) {
      return res.status(403).send();
    }

    const result = await placeRepository.getFavorites(req.user.sub);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },

  /*
   * Add place to favorites
   * @param req Request object
   * @param res Response object
   */
  async addFavoritePlace(req: Request, res: Response) {
    const request = await parseRequest(addFavoritePlaceSchema, req, res);
    if (!request) return;

    // Check if user is trying to add place to his favorites
    if (req.user.sub !== request.params.id) {
      return res.status(403).send();
    }

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

    // Check if user is trying to remove place from his favorites
    if (req.user.sub !== request.params.id) {
      return res.status(403).send();
    }

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
    const request = await parseRequest(getUserGroupsSchema, req, res);
    if (!request) return;

    // Check if user is trying to get his groups
    if (req.user.sub !== request.params.id) {
      return res.status(403).send();
    }

    // Get user groups
    const result = await groupRepository.getAllUserGroups(request.params.id);
    if (result.isErr) {
      handleRepositoryErrors(result.error, res);
      return;
    }

    return res.status(200).json(result.value).send();
  },
};
