import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  UpdateImageRequest,
  UpdateUserRequest,
  UpdateUserStatusRequest,
  UserLoginRequest,
  UserRegistrationRequest,
} from "@/types/Api";
import { Api } from "@/types/Api";
import usePersistentData from "./usePersistentData";
import { useUserContext } from "@/context/UserContext";

const baseURL = import.meta.env.VITE_API_URL;

const api = new Api({ baseUrl: baseURL });

const QUERY_KEYS = {
  user: "user",
  users: "users",
  userStatus: "userStatus",
};

const MUTATION_KEYS = {
  userRegistrate: "userRegistrate",
  userLogin: "userLogin",
  userUpdate: "userUpdate",
  userProfilePictureUpdate: "userProfilePictureUpdate",
  userStatusUpdate: "userStatusUpdate",
  userStatusDelete: "userStatusDelete",
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

// Hook for fetching all users
export const useUsers = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.users],
    queryFn: () =>
      api.users.usersList({
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook for fetching a logged in user
export const useUser = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: () =>
      api.user.userList({
        headers: {
          Authorization: `Bearer ${authData.token}`, // Add Bearer token to headers
        },
      }),
  });

  return { data, isLoading };
};

// Hook for updating user data
export const useUserUpdate = () => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userUpdate],
    mutationFn: (payload: UpdateUserRequest) =>
      api.user.userUpdate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),

    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.user],
      });
    },
  });

  return mutation;
};

// Hook for updating user profile picture
export const useUserProfilePictureUpdate = () => {
  const queryClient = useQueryClient();
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userProfilePictureUpdate],
    mutationFn: (payload: UpdateImageRequest) =>
      api.user.profilePictureUpdate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),

    onSuccess: () => {
      // Invalidate the query to refetch the data
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.user],
      });
    },
  });

  return mutation;
};

// Hook for updating user status
export const useUserStatusUpdate = () => {
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userStatusUpdate],
    mutationFn: (payload: UpdateUserStatusRequest) =>
      api.user.userStatusCreate(payload, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return mutation;
};

// Hook for deleting user status
export const useUserStatusDelete = () => {
  const { authData } = usePersistentData();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userStatusDelete],
    mutationFn: () =>
      api.user.userStatusDelete({
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return mutation;
};

// Hook for getting user status
export const useUserStatus = (userId: string) => {
  const { authData } = usePersistentData();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.userStatus, userId],
    queryFn: () =>
      api.users.userStatusDetail(userId, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return { data, isLoading, isSuccess };
};
