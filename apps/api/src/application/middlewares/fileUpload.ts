import multer from "multer";
import path from "path";
import fs from "fs";
import type { Request, Response, NextFunction } from "express";
import { parseRequest } from "../../utils";
import {
  updateImageWithIdSchema,
  updateSingleImageSchema,
} from "../../api/rest/validationSchemas/fileUpload.validationSchemas";
import { groupEventRepository } from "../repositories/groupEvent/groupEvent.repository";
import { groupRepository } from "../repositories/group/group.repository";

type ImageType = "profilePictures" | "groupImages" | "eventImages" | "placeImages";

// Extend Express Request interface to include user property
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      imageType: ImageType;
      imageId: string;
      finalImageName: string;
    }
  }
}

const ACCEPTED_IMAGE_TYPES: { [key: string]: string } = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const mimeToExtension = (mimeType: string): string | null => {
  return ACCEPTED_IMAGE_TYPES[mimeType] || null;
};

const checkImageId = async (id: string, imageType: ImageType) => {
  switch (imageType) {
    case "eventImages":
      {
        const event = await groupEventRepository.findById(id);
        if (event.isErr) return false;
      }
      break;

    case "groupImages":
      {
        const group = await groupRepository.findById(id);
        if (group.isErr) return false;
      }
      break;

    case "placeImages":
      {
        const place = await groupRepository.findById(id);
        if (place.isErr) return false;
      }
      break;
    default:
      return false;
  }
  return true;
};

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const uploadPath = path.join(__dirname, "../../..", "uploads", req.imageType);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extension = mimeToExtension(file.mimetype);
    if (!extension) {
      cb(new Error("Invalid file type"), "");
      return;
    }

    const newFileName = `${req.imageId}.${mimeToExtension(file.mimetype)}`;
    req.finalImageName = newFileName;

    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const uploadSingleFile = (imageType: ImageType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let request;
    req.imageType = imageType as ImageType;

    // Get user id from request
    if (imageType === "profilePictures") {
      request = await parseRequest(updateSingleImageSchema, req, res);
      if (!request) return;
      req.imageId = req.user.sub;
    }
    // Get image id from request and check if corresponding entity exists
    else {
      request = await parseRequest(updateImageWithIdSchema, req, res);
      if (!request) return;
      if (!checkImageId(request.params.id, imageType)) {
        return res
          .status(404)
          .json({
            name: "NotFoundError",
            message: "Entity not found",
          })
          .send();
      }
      req.imageId = request.params.id;
    }

    upload.single("image")(req, res, next);
  };
};

export default uploadSingleFile;
