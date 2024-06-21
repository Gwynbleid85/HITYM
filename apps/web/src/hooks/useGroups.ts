import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupRequest, UpdateGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {
  groups: "groups",
  group: "group",
};

const MUTATION_KEYS = {
  groupCreate: "groupCreate",
  groupUpdate: "groupUpdate",
};

// Hook to get all groups for the user using react-query
export const useGroups = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.groups],
    queryFn: () =>
      api.user.groupsList({
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook to get basic info for a group using react-query
export const useGroup = (id: string) => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.group, id],
    queryFn: () =>
      api.groups.groupsDetail(id, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook to get extended info for a group using react-query
export const useGroupExtended = (id: string) => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.group, id],
    queryFn: () =>
      api.groups.extendedDetail(id, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook to create a new group using react-query
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

// Hook to update a group using react-query
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
