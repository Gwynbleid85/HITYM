import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupRequest, UpdateGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {};

const MUTATION_KEYS = {
  groupCreate: "groupCreate",
  groupUpdate: "groupUpdate",
};

export const useGroupCreate = () => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.groupCreate],
    mutationFn: (payload: CreateGroupRequest) =>
      api.groups.groupsCreate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),

    onSuccess: () => {
      //TODO invalidate group list
    },
  });

  return mutation;
};

export const useGroupUpdate = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.groupUpdate],
    mutationFn: (payload: UpdateGroupRequest) => api.groups.groupsUpdate(id, payload),

    onSuccess: () => {
      //TODO invalidate group list
    },
  });

  // TODO update the picture
  return mutation;
};
