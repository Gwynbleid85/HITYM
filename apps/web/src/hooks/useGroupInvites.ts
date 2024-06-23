import { inviteUserToGroupSchema } from './../../../api/src/api/rest/validationSchemas/user.validationSchemas';
import usePersistentData from "@/hooks/usePersistentData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InviteUserToGroupRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {};

const MUTATION_KEYS = {
  inviteUser: "inviteUser",
};

// Hook to invite a user to a group
export const useInviteUserToGroup = (userId : string) => {
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
