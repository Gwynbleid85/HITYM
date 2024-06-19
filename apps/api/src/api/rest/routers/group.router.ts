import { Router } from "express";
import auth from "../../../application/middlewares/auth";
import { groupController } from "../controllers/group.controller";
import uploadSingleFile from "../../../application/middlewares/fileUpload";

const groupRouter = Router();

/**
 * POST /groups
 * @summary Create a new group
 * @tags group
 * @security BearerAuth
 * @param {CreateGroupRequest} request.body.required - Group data
 * @return {Group} 201 - Group created
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 */
groupRouter.post("/", auth, groupController.createGroup);

/**
 * GET /groups/{id}
 * @summary Get group by ID
 * @tags group
 * @security BearerAuth
 * @param {string} id.path.required - Group ID
 * @return {Group} 200 - Group found
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 404 - Not found
 */
groupRouter.get("/:id", auth, groupController.getGroupById);

/**
 * GET /groups/{id}/extended
 * @summary Get group by ID with users and events
 * @tags group
 * @security BearerAuth
 * @param {string} id.path.required - Group ID
 * @return {GroupExtended} 200 - Group found
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 404 - Not found
 */
groupRouter.get("/:id/extended", auth, groupController.getGroupByIdExtended);

/**
 * PUT /groups/{id}
 * @summary Update a group
 * @tags group
 * @security BearerAuth
 * @param {UpdateGroupRequest} request.body.required - Group data
 * @param {string} id.path.required - Group ID
 * @return {Group} 200 - Group updated
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
groupRouter.put("/:id", auth, groupController.updateGroup);

/**
 * PUT /groups/{id}/image
 * @summary Update group image
 * @tags group
 * @security BearerAuth
 * @param {UpdateImageWithIdRequest} request.body.required - New group image - multipart/form-data
 * @param {string} id.path.required - Group ID
 * @return {Group} 200 - Group updated
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
groupRouter.put("/:id/image", auth, uploadSingleFile("groupImages"), groupController.updateImage);

/**
 * DELETE /groups/{id}
 * @summary Delete a group
 * @tags group
 * @security BearerAuth
 * @param {string} id.path.required - Group ID
 * @return {string} 204 - Group deleted
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
groupRouter.delete("/:id", auth, groupController.deleteGroup);

/**
 * DELETE /groups/{id}/users/{userId}
 * @summary Remove user from group
 * @tags group
 * @security BearerAuth
 * @param {string} id.path.required - Group ID
 * @param {string} userId.path.required - User ID
 * @return {Group} 200 - Group updated
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
groupRouter.delete("/:id/users/:userId", auth, groupController.removeUser);

/**
 * GET /groups/{id}/events/historical
 * @summary Get group events history
 * @tags group
 * @security BearerAuth
 * @param {string} id.path.required - Group ID
 * @return {Array.<GroupEvent>} 200 - Events found
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 404 - Not found
 */
groupRouter.get("/:id/events/historical", auth, groupController.getHistoricalEvents);

export default groupRouter;
