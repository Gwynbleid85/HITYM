import { Router } from "express";
import auth from "../../../application/middlewares/auth";
import { userController } from "../controllers/user.controller";

const usersRouter = Router();

/**
 * GET /users
 * @summary Get all users
 * @tags users
 * @security BearerAuth
 * @return {Array.<SimpleUser>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
usersRouter.get("/", auth, userController.getAllUsers);

/**
 * GET /users/{id}/user-status
 * @summary Get user-status by user
 * @tags users
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 * @return {UserStatus} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
usersRouter.get("/:id/user-status", auth, userController.getUserStatus);

/**
 * POST /users/{id}/groups/invites
 * @summary Invite user to group
 * @tags group-invite
 * @security BearerAuth
 * @param {InviteUserToGroupRequest} request.body.required - Invite user to group data
 * @param {string} request.params.id.required - User ID
 * @return  201 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
usersRouter.post("/:id/groups/invites", auth, userController.inviteUserToGroup);

export default usersRouter;
