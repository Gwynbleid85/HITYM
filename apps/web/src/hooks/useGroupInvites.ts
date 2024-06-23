import { inviteUserToGroupSchema } from "./../../../api/src/api/rest/validationSchemas/user.validationSchemas";
import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InviteUserToGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {
  invites: "invites",
};

const MUTATION_KEYS = {
  inviteUser: "inviteUser",
  acceptInvite: "acceptInvite",
  rejectInvite: "rejectInvite",
};

// Hook to invite a user to a group
export const useInviteUserToGroup = (userId: string) => {
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.inviteUser],
    mutationFn: (payload: InviteUserToGroupRequest) =>
      api.users.groupsInvitesCreate(userId, payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),

    onSuccess: () => {
      // TODO Invalidate the query to refetch the data
    },
  });

  return mutation;
};

// Hook to get all invites for the user using react-query
export const useInvites = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.invites],
    queryFn: () =>
      api.user.groupsInvitesList({
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook to accept an invite
export const useAcceptInvite = (inviteId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.acceptInvite],
    mutationFn: () =>
      api.user.groupsInvitesAcceptCreate(inviteId, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),

    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.invites],
      });
    },
  });

  return mutation;
};

// Hook to reject an invite
export const useRejectInvite = (inviteId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.rejectInvite],
    mutationFn: () =>
      api.user.groupsInvitesDelete(inviteId, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),

    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.invites],
      });
    },
  });

  return mutation;
};
