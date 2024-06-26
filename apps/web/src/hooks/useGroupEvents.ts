import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupEventRequest, UpdateGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;
const api = new Api({ baseUrl: baseURL }).api;

const QUERY_KEYS = {
  groupEvent: "groupEvent",
  groupExtended: "groupExtended",
};

const MUTATION_KEYS = {
  createGroupEvent: "createGroupEvent",
  updateGroupEvent: "updateGroupEvent",
  removeGroupEvent: "removeGroupEvent",
  updateGroupEventImage: "updateGroupEventImage",
};

// Hook to remove a group event using react-query
export const useRemoveGroupEvent = () => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.removeGroupEvent],
    mutationFn: (eventId: string) =>
      api.groupEventsDelete(eventId, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),

    onSuccess: () => {
      //Invalidate extended group info (so that updated groups events list was shown)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groupExtended],
      });
    },
  });

  return mutation;
};

// Hook to create a group event using react-query
export const useCreateGroupEvent = () => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.createGroupEvent],
    mutationFn: (payload: CreateGroupEventRequest) =>
      api.groupEventsCreate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
    onSuccess: () => {
      //Invalidate extended group info (so that updated groups events list was shown)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groupExtended],
      });
    },
  });

  return mutation;
};

// Hook to update a group event using react-query
export const useUpdateGroupEvent = (eventId: string) => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.updateGroupEvent],
    mutationFn: (payload: UpdateGroupRequest) =>
      api.groupEventsUpdate(eventId, payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
    onSuccess: () => {
      //Invalidate extended group info (so that updated groups events list was shown)
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.groupExtended],
      });
    },
  });

  return mutation;
};

//Hook to get group event info by id using react-query
export const useGroupEvent = (eventId: string) => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.groupEvent, eventId],
    queryFn: () =>
      api.groupEventsDetail(eventId, {
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};
