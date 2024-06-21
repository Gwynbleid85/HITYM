// eslint-disable-next-line max-classes-per-file
import { Prisma } from "@prisma/client";
import type { ZodSchema, ZodTypeDef } from "zod";
import { fromZodError } from "zod-validation-error";
import type { Request, Response } from "express";
import type { User as PrismaUser, Place as PrismaPlace, Group as PrismaGroup } from "@prisma/client";
import type { Group, Place, User } from "./types";

/**
 * Error class
 * @typedef {object} Error
 * @property {string} name.required - Error name
 * @property {string} message.required - Error message
 */
export class NotFoundError extends Error {}
export class ConflictError extends Error {}
export class InternalError extends Error {}

export default function handleDbExceptions(e: unknown): Error {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2025") {
      return new NotFoundError();
    }
    if (e.code === "P2002") {
      return new ConflictError();
    }
  }
  console.warn("Unknown DB error: ", e);

  return new InternalError();
}

export const parseRequest = async <Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(
  schema: ZodSchema<Output, Def, Input>,
  req: Request,
  res: Response
) => {
  const parsedRequest = await schema.safeParseAsync(req);

  if (!parsedRequest.success) {
    const error = fromZodError(parsedRequest.error);
    const errorResponse: Error = {
      name: "ValidationError",
      message: error.message,
      cause: error.cause,
    };
    res.status(400).send(errorResponse);
    return null;
  }

  return parsedRequest.data;
};

export const handleRepositoryErrors = (e: Error, res: Response) => {
  if (e instanceof NotFoundError) {
    res.status(404).send({
      name: e.name || "NotFoundError",
      message: e.message || "Entity not found",
      cause: e.cause,
    });
  } else if (e instanceof InternalError) {
    res.status(500).send({
      name: e.name || "InternalError",
      message: e.message || "Something went wrong on our side.",
      cause: e.cause,
    });
  } else if (e instanceof ConflictError) {
    res.status(400).send({
      name: e.name || "ConflictError",
      message: e.message || "Conflict",
      cause: e.cause,
    });
  } else {
    res.status(500).send({
      name: "UnknownError",
      message: "Something went wrong.",
    });
  }
};

export const toUser = (user: PrismaUser): User => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, lastLatitude, lastLongitude, createdAt, updatedAt, ...userWithoutSensitiveData } = user;

  return {
    ...userWithoutSensitiveData,
    lastPosition: {
      latitude: user.lastLatitude,
      longitude: user.lastLongitude,
    },
  } as User;
};

export const toPrismaUser = (user: User): PrismaUser => {
  const { lastPosition, ...userWithoutLastPosition } = user;
  return {
    ...userWithoutLastPosition,
    lastLatitude: lastPosition?.latitude,
    lastLongitude: lastPosition?.longitude,
  } as PrismaUser;
};

export const toPlace = (place: PrismaPlace): Place => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, latitude, longitude, ...placeWithoutTimestamps } = place;

  return {
    ...placeWithoutTimestamps,
    position: {
      latitude,
      longitude,
    },
  } as Place;
};

export const toPrismaPlace = (place: Place): PrismaPlace => {
  const { position, ...placeWithoutTimestamps } = place;
  return {
    ...placeWithoutTimestamps,
    latitude: position?.latitude,
    longitude: position?.longitude,
  } as PrismaPlace;
};

export const toGroup = (group: PrismaGroup): Group => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, updatedAt, ...groupWithoutTimestamps } = group;

  return groupWithoutTimestamps as Group;
};
