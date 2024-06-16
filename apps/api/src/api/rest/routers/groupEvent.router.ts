import { Router } from "express";
import auth from "../../../application/middlewares/auth";
import { groupEventController } from "../controllers/groupEvent.controller";

const groupEventRouter = Router();

/**
 * POST /group-events
 * @summary Create new group event
 * @tags group-events
 * @security BearerAuth
 * @param {CreateGroupEventRequest} request.body.required - Group event data
 * @return {GroupEvent} 201 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 */
groupEventRouter.post("/", auth, groupEventController.createGroupEvent);

/**
 * GET /group-events/:id
 * @summary Get group event by ID
 * @tags group-events
 * @security BearerAuth
 * @param {string} id.path.required - Event ID
 * @return {GroupEvent} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 404 - Not found response - application/json
 */
groupEventRouter.get("/:id", auth, groupEventController.getGroupEventById);

/**
 * PUT /group-events/:id
 * @summary Update group event
 * @tags group-events
 * @security BearerAuth
 * @param {string} id.path.required - Event ID
 * @param {UpdateGroupEventRequest} request.body.required - Group event data
 * @return {GroupEvent} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 * @return {Error} 404 - Not found response - application/json
 */
groupEventRouter.put("/:id", auth, groupEventController.updateGroupEvent);

/**
 * PUT /group-events/:id/image
 * @summary Update group event image
 * @tags group-events
 * @security BearerAuth
 * @param {string} id.path.required - Event ID
 * @param {UpdateImageRequest} request.body.required - Image URL
 * @return {GroupEvent} 200 - success response - application/json
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 * @return {Error} 404 - Not found response - application/json
 */
groupEventRouter.put("/:id/image", auth, groupEventController.updateGroupEventImage);

/**
 * DELETE /group-events/:id
 * @summary Delete group event
 * @tags group-events
 * @security BearerAuth
 * @param {string} id.path.required - Event ID
 * @return {string} 204 - success response
 * @return {Error} 400 - Bad request response - application/json
 * @return {Error} 403 - Forbidden response - application/json
 * @return {Error} 404 - Not found response - application/json
 */
groupEventRouter.delete("/:id", auth, groupEventController.deleteGroupEvent);

export default groupEventRouter;
