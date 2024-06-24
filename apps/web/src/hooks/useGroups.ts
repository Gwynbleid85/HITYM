import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupRequest, UpdateGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {
  groups: "groups",
  group: "group",
  groupExtended: "groupExtended",
};

const MUTATION_KEYS = {
  groupCreate: "groupCreate",
  groupUpdate: "groupUpdate",
  removeUserFromGroup: "removeUserFromGroup",
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

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.group, id],
    queryFn: () =>
      api.groups.groupsDetail(id, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading, isError };
};

// Hook to get extended info for a group using react-query
export const useGroupExtended = (id: string) => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.groupExtended, id],
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
      //Invalidate group list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groups],
      });
    },
  });

  return mutation;
};

// Hook to update a group using react-query
export const useGroupUpdate = (id: string) => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.groupUpdate],
    mutationFn: (payload: UpdateGroupRequest) =>
      api.groups.groupsUpdate(id, payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),

    onSuccess: () => {
      //Invalidate group list
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groupExtended], //TODO or group?
      });
    },
  });

  // TODO update the picture
  return mutation;
};


// Hook to remove a user from a group using react-query
export const useRemoveUserFromGroup = (groupId: string) => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.removeUserFromGroup],
    mutationFn: (userId: string) =>
      api.groups.usersDelete(groupId, userId, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),

    onSuccess: () => {
      //Invalidate extended group info (so that updated groups users list was shown)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groupExtended],
      });
    },
  });

  return mutation;
};
