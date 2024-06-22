import { useLocalStorage } from "@rehooks/local-storage";
import { useCallback } from "react";
import type { AuthData, AppData } from "@/types/persistentData";
import { useUserContext } from "@/context/UserContext";
import { useUser } from "@/hooks/useUsers";

const AUTH_DATA_STORAGE_KEY = "AuthData";
const APP_DATA_STORAGE_KEY = "appData";

const AUTH_DATA_DEFAULT: AuthData = {
  token: "",
};

const APP_DATA_DEFAULT: AppData = {
  // TODO all other fields from API
};

/**
 * Custom hook for managing persistent data in local storage.
 * It provides functions to update and delete authData, as well as update and reset app data.
 *
 * @returns An object containing the authData, appData and functions to modify them.
 */
const usePersistentData = () => {
  const { user, updateUser } = useUserContext();

  const [authData, setAuthData] = useLocalStorage<AuthData>(AUTH_DATA_STORAGE_KEY, {
    ...AUTH_DATA_DEFAULT,
  });

  const [appData, setAppData] = useLocalStorage<AppData>(APP_DATA_STORAGE_KEY, {
    ...APP_DATA_DEFAULT,
  });

  const updateAuthData = (newAuthData: AuthData) => {
    setAuthData(newAuthData);
  };

  const deleteAuthData = useCallback(() => {
    setAuthData({ ...AUTH_DATA_DEFAULT });
  }, [setAuthData]);

  const updateAppData = (newAppData: AppData) => {
    setAppData(newAppData);
  };

  const resetAppData = useCallback(() => {
    setAppData({ ...APP_DATA_DEFAULT });
  }, [setAppData]);

  // Function which returns if the user is logged in or not
  const isLoggedIn = () => {
    // Check if user is saved in context
    if (user) {
      return true;
    }
    // If user is not saved in context, check manually if user is loggen in and authorized
    if (authData.token !== "") {
      const newUser = useUser().data;
      // If user is authorized, save the user in context
      if (newUser?.ok) {
        updateUser(newUser.data);
        return true;
      }
    }
    return false;
  };

  return {
    authData,
    updateAuthData,
    deleteAuthData,
    isLoggedIn,
    appData,
    updateAppData,
    resetAppData,
  };
};

export default usePersistentData;
