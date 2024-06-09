import { Result } from "@badrap/result";
import type { NewPlace } from "./type";
import prisma from "../../client";
import handleDbExceptions, { NotFoundError } from "../../utils";
import type { Place } from "../../types";

export const PlaceRepository = {
  /// Create a new place
  /// @param userStatus The place to create
  /// @returns The created place
  async create(userStatus: NewPlace): Promise<Result<Place>> {
    try {
      const newPlace = await prisma.place.create({ data: userStatus });
      return Result.ok(newPlace);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Find a place by its ID
  /// @param id The ID of the place to find
  /// @returns The place if found
  async findById(id: string): Promise<Result<Place>> {
    try {
      const place = await prisma.place.findUnique({ where: { id } });
      if (!place) {
        return Result.err(new NotFoundError());
      }
      return Result.ok(place);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },

  /// Get all places
  /// @returns All places
  async getAll(): Promise<Result<Place[]>> {
    try {
      const places = await prisma.place.findMany();
      return Result.ok(places);
    } catch (e) {
      return Result.err(handleDbExceptions(e));
    }
  },
};
