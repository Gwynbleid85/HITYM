import type { CreatePlaceRequest } from "./Api";



export interface AuthData {
  token: string;
}

export interface AppData {
  newPlace: CreatePlaceRequest | undefined;
}

