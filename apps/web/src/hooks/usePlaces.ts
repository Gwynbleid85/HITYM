import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreatePlaceRequest } from "@/types/Api";
import { Api } from "@/types/Api";
import usePersistentData from "./usePersistentData";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL }).api;

const QUERY_KEYS = {
  places: "places",
};

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

// Hook to get all places for the user using react-query
export const usePlaces = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.places],
    queryFn: () =>
      api.userPlacesList({
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};
