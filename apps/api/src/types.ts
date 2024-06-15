import type {
  User as PrismaUser,
  UserStatus as PrismaUserStatus,
  Place as PrismaPlace,
  Group as PrismaGroup,
  GroupEvent as PrismaEvent,
} from "@prisma/client";

export type User = Omit<PrismaUser, "createdAt" | "updatedAt" | "password" | "lastLatitude" | "lastLongitude"> & {
  lastPosition: Position | null;
};

export type UserStatus = Omit<PrismaUserStatus, "createdAt" | "updatedAt">;

export type Place = Omit<PrismaPlace, "createdAt" | "updatedAt">;

export type Group = Omit<PrismaGroup, "createdAt" | "updatedAt">;

export type GroupEvent = Omit<PrismaEvent, "createdAt" | "updatedAt">;

export type PaginationQuery = {
  page: number;
  pageSize: number;
};

export type Position = {
  latitude: number;
  longitude: number;
};
