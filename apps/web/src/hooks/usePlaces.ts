import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreatePlaceRequest } from "@/types/Api";
import { Api } from "@/types/Api";
import usePersistentData from "./usePersistentData";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL }).api;

const QUERY_KEYS = {};

const MUTATION_KEYS = {
  placeCreate: "placeCreate",
};


// Hook to create a place using react-query
export const useCreatePlace = () => {
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.placeCreate],
    mutationFn: (payload: CreatePlaceRequest) =>
      api.placesCreate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return mutation;
};