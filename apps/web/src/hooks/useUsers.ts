import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserLoginRequest, UserRegistrationRequest } from "@/types/Api";
import { Api } from "@/types/Api";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {};

const MUTATION_KEYS = {
  userRegistrate: "userRegistrate",
  userLogin: "userLogin",
};

//
export const useUserRegistrate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userRegistrate],
    mutationFn: (payload: UserRegistrationRequest) => api.user.registrationCreate(payload),

    onSuccess: () => {
      //TODO
    },
  });

  return mutation;
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userLogin],
    mutationFn: (payload: UserLoginRequest) => api.user.loginCreate(payload),

    onSuccess: () => {
      //TODO
    },
  });

  return mutation;
};
