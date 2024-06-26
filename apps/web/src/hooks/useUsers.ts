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

const api = new Api({ baseUrl: baseURL }).api;

const QUERY_KEYS = {
  user: "user",
  users: "users",
  userStatus: "userStatus",
  userTrackConfig: "userTrackConfig",
};

const MUTATION_KEYS = {
  userRegistrate: "userRegistrate",
  userLogin: "userLogin",
  userUpdate: "userUpdate",
  userProfilePictureUpdate: "userProfilePictureUpdate",
  userStatusUpdate: "userStatusUpdate",
  userStatusDelete: "userStatusDelete",
  userFollowGroup: "userFollowGroup",
  userUnfollowGroup: "userUnfollowGroup",
  userSharePositionWithGroup: "userSharePositionWithGroup",
  userStopSharingPositionWithGroup: "userStopSharingPositionWithGroup",
};

//
export const useUserRegistrate = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userRegistrate],
    mutationFn: (payload: UserRegistrationRequest) => api.userRegistrationCreate(payload),
  });

  return mutation;
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userLogin],
    mutationFn: (payload: UserLoginRequest) => api.userLoginCreate(payload),
  });

  return mutation;
};

// Hook for fetching all users
export const useUsers = () => {
  const { authData } = usePersistentData();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.users],
    queryFn: () =>
      api.usersList({
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
      api.userList({
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
      api.userUpdate(payload, {
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
      api.userProfilePictureUpdate(payload, {
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
      api.userUserStatusCreate(payload, {
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
      api.userUserStatusDelete({
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
      api.usersUserStatusDetail(userId, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return { data, isLoading, isSuccess };
};

export const useUserTrackingConfig = () => {
  const { authData } = usePersistentData();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.userTrackConfig],
    queryFn: () =>
      api.userPositionSharingConfigList({
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }),
  });

  return { data, isLoading, isSuccess };
};

export const useFollowGroup = (groupId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userFollowGroup, groupId],
    mutationFn: () =>
      api.userPositionSharingSubscriptionsCreate(
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userTrackConfig],
      });
    },
  });

  return mutation;
};

export const useUnfollowGroup = (groupId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userUnfollowGroup, groupId],
    mutationFn: () =>
      api.userPositionSharingSubscriptionsDelete(
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userTrackConfig],
      });
    },
  });

  return mutation;
};

export const useSharePositionWithGroup = (groupId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userSharePositionWithGroup, groupId],
    mutationFn: () =>
      api.userPositionSharingShareWithGroupsCreate(
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userTrackConfig],
      });
    },
  });

  return mutation;
};

export const useStopSharingPositionWithGroup = (groupId: string) => {
  const { authData } = usePersistentData();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [MUTATION_KEYS.userStopSharingPositionWithGroup, groupId],
    mutationFn: () =>
      api.userPositionSharingShareWithGroupsDelete(
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.userTrackConfig],
      });
    },
  });

  return mutation;
};
