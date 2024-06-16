import { handleRepositoryErrors, parseRequest } from "../../../utils";
import type { Request, Response } from "express";
import { userLoginDataSchema, userRegistrationDataSchema } from "../validationSchemas/user.validationSchemas";
import { compareSync, hashSync } from "bcrypt-ts";
import { userRepository } from "../../../application/repositories/user/user.repository";
import type { NewUser } from "../../../application/repositories/user/types";
import { env } from "process";
import type { User } from "../../../types";
import type { Result } from "@badrap/result";
import jwt from "jsonwebtoken";

export const userController = {
  /**
   * Register a new user
   * @param req Request object
   * @param res Response object
   */
  async registerUser(req: Request, res: Response) {
    const request = await parseRequest(userRegistrationDataSchema, req, res);
    if (!request) {
      return;
    }

    // Check if user with email already exists
    const user = await userRepository.findByEmail(request.body.email);
    if (user.isOk) {
      res.status(400).send({
        name: "ConflictError",
        message: "User with this email already exists",
      });
      return;
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

  async loginUser(req: Request, res: Response) {
    const request = await parseRequest(userLoginDataSchema, req, res);
    if (!request) {
      return;
    }

    // Check if user with email exists
    const userRes = await userRepository.getUserPasswordHash(request.body.email);
    if (userRes.isErr) {
      res.status(404).json({
        name: "NotFoundError",
        message: "User with this email not found",
      });
      return;
    }
    const user = userRes.value;

    // Check if password is correct
    if (!compareSync(request.body.password, user.password)) {
      res.status(400).json({
        name: "ValidationError",
        message: "Invalid password",
      });
      return;
    }

    // Generate jwt token
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

  async testAuthorization(req: Request, res: Response) {
    res.status(200).json(req.user).send();
  },
};
