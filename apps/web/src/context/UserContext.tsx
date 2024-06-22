import React, { createContext, useContext, useState } from "react";
import type { User } from "@/types/Api";

interface UserContextValue {
  user: User | null;
  updateUser: (userData: User | null) => void;
}

const UserContext = createContext<UserContextValue>({
  user: null,
  updateUser: () => {},
});

export const useUserContext = () => useContext(UserContext); // Custom hook for accessing context

/**
 * Provides the User context for the application.
 */
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null); // initial state is null

  /**
   * Updates the user data in the User context.
   */
  const updateUser = (newUserData: User | null) => {
    setUser(newUserData);
  };

  return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>;
};
