import { Router } from "express";

import { userController } from "../controllers/user.controller";
import auth from "../../../application/middlewares/auth";

const userRouter = Router();

/**
 * POST /users/registration
 * @summary Create new user
 * @tags user registration
 * @param {UserRegistrationRequest} request.body.required - User registration data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/registration", userController.registerUser);

/**
 * POST /users/login
 * @summary Login user
 * @tags user login
 * @param {UserLoginRequest} request.body.required - User login data
 * @return {User} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 */
userRouter.post("/login", userController.loginUser);

/**
 * GET /users/test/authorization
 * @summary Test authorization
 * @tags test
 * @security BearerAuth
 * @return {string} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
userRouter.get("/test/authorization", auth, userController.testAuthorization);

export default userRouter;
