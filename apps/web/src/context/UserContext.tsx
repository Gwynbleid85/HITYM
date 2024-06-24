import React, { createContext, useContext, useState } from "react";
import type { User } from "@/types/Api";
import usePersistentData from "@/hooks/usePersistentData";

const baseURL = import.meta.env.VITE_API_URL;

type UserState = "loggedOut" | "loggedIn" | "fetching";

type UserValue = {
  user: User | null;
  state: UserState;
};

interface UserContextValue {
  userContext: UserValue;
  updateUser: (userData: UserValue) => void;
  fetchUser: () => void;
  isLoggedIn: () => boolean;
  isAuthorized: (userId: string) => boolean;
}

const UserContext = createContext<UserContextValue>({
  userContext: { user: null, state: "fetching" },
  updateUser: () => {},
  fetchUser: () => {},
  isLoggedIn: () => false,
  isAuthorized: () => false,
});

export const useUserContext = () => useContext(UserContext); // Custom hook for accessing context

/**
 * Provides the User context for the application.
 */
export const UserProvider = ({ children }: any) => {
  const [userContext, setUserContext] = useState<UserValue>({ user: null, state: "fetching" }); // initial state is null
  const { authData } = usePersistentData(); // Get the auth data from local storage

  const isLoggedIn = () => {
    return userContext.state === "loggedIn";
  };

  const isAuthorized = (userId: string) => {
    return userContext.user?.id === userId;
  };

  const updateUser = (newUserData: UserValue) => {
    setUserContext(newUserData);
  };

  const fetchUser = async () => {
    // Fetch only if user is not already saved in context
    if (userContext.state !== "fetching") return;

    if (authData) {
      // Cant user tanstack-query here, because it break!
      const newUser = await fetch(`${baseURL}/user`, {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      const parsedUser = await newUser.json();
      // If user is authorized, save the user in context
      if (newUser.ok) {
        setUserContext({ user: parsedUser as User, state: "loggedIn" });
        return;
      }
    }
    setUserContext({ user: null, state: "loggedOut" });
  };

  return (
    <UserContext.Provider value={{ userContext, updateUser, fetchUser, isLoggedIn, isAuthorized }}>
      {children}
    </UserContext.Provider>
  );
};
