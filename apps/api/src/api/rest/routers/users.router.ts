import { Router } from "express";
import auth from "../../../application/middlewares/auth";
import { userController } from "../controllers/user.controller";

const usersRouter = Router();

/**
 * GET /users
 * @summary Get all users
 * @tags user
 * @security BearerAuth
 * @return {Array.<SimpleUser>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
usersRouter.get("/", auth, userController.getAllUsers);

/**
 * POST /users/:id/groups/invite
 * @summary Invite user to group
 * @tags user
 * @security BearerAuth
 * @param {InviteUserToGroupRequest} request.body.required - Invite user to group data
 * @param {string} request.params.id.required - User ID
 * @return {void} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
usersRouter.post("/:id/groups/invites", auth, userController.inviteUserToGroup);

/**
 * POST /users/:id/groups/invite/:invite_id/accept
 * @summary Accept group invite
 * @tags user
 * @security BearerAuth
 * @param {AcceptGroupInviteRequest} request.body.required - Accept group invite data
 * @param {string} request.params.id.required - User ID
 * @param {string} request.params.invite_id.required - Invite ID
 * @return {void} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
usersRouter.post("/:id/groups/invites/:invite_id/accept", auth, userController.acceptGroupInvite);

/**
 * DELETE /users/:id/groups/invite/:invite_id
 * @summary Decline group invite
 * @tags user
 * @security BearerAuth
 * @param {DeclineGroupInviteRequest} request.body.required - Decline group invite data
 * @param {string} request.params.id.required - User ID
 * @param {string} request.params.invite_id.required - Invite ID
 * @return {void} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 * @return {Error} 404 - Not Found response - application/json
 */
usersRouter.delete("/:id/groups/invites/:invite_id", auth, userController.declineGroupInvite);

/**
 * GET /users/:id/groups/invites
 * @summary Get user invites
 * @tags user
 * @security BearerAuth
 * @param {string} request.params.id.required - User ID
 * @return {Array.<GroupInviteExtended>} 200 - success response - application/json
 * @return {Error} 401 - Unauthorized response - application/json
 */
usersRouter.get("/:id/groups/invites", auth, userController.getUserInvites);

export default usersRouter;
