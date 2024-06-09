// eslint-disable-next-line max-classes-per-file
import { Prisma } from "@prisma/client";
import type { User } from "./types";
import type { User as PrismaUser } from "@prisma/client";

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
  return new InternalError();
}

export const toUser = (user: PrismaUser): User => {
  let lastPosition = null;
  if (user.lastLatitude && user.lastLongitude) {
    lastPosition = {
      latitude: user.lastLatitude,
      longitude: user.lastLongitude,
    };
  }
  return {
    ...user,
    lastPosition: lastPosition,
  };
};
