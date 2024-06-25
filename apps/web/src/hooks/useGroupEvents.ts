import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupRequest, UpdateGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;
const api = new Api({ baseUrl: baseURL }).api;

const QUERY_KEYS = {
  groupEvent: "groupEvent",
  groupExtended: "groupExtended", //TODO
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
