import { Router } from "express";
import { placeController } from "../controllers/place.controller";
import auth from "../../../application/middlewares/auth";
import uploadSingleFile from "../../../application/middlewares/fileUpload";

const placeRouter = Router();

/**
 * POST /places
 * @summary Create a new place
 * @tags place
 * @security BearerAuth
 * @param {CreatePlaceRequest} request.body.required - Place data
 * @return {Place} 201 - Place created
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 */
placeRouter.post("/", auth, placeController.createPlace);

/**
 * GET /places
 * @summary Get all places
 * @tags place
 * @security BearerAuth
 * @return {Place[]} 200 - Places found
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 */
placeRouter.get("/", auth, placeController.getAllPlaces);

/**
 * PUT /places/:id
 * @summary Update a place
 * @tags place
 * @security BearerAuth
 * @param {UpdatePlaceRequest} request.body.required - Place data
 * @param {string} id.path.required - Place ID
 * @return {Place} 200 - Place updated
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
placeRouter.put("/:id", auth, placeController.updatePlace);

/**
 * PUT /places/:id/image
 * @summary Update place image
 * @tags place
 * @security BearerAuth
 * @param {UpdateImageRequest} request.body.required - Image data
 * @param {string} id.path.required - Place ID
 * @return {Place} 200 - Place updated
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
placeRouter.put("/:id/image", auth, uploadSingleFile("placeImages"), placeController.updatePlaceImage);

/**
 * DELETE /places/:id
 * @summary Delete a place
 * @tags place
 * @security BearerAuth
 * @param {string} id.path.required - Place ID
 * @return {void} 204 - Place deleted
 * @return {Error} 400 - Bad request
 * @return {Error} 401 - Unauthorized
 * @return {Error} 403 - Forbidden
 */
placeRouter.delete("/:id", auth, placeController.deletePlace);

export default placeRouter;
