import { useLocalStorage } from "@rehooks/local-storage";
import { useCallback } from "react";
import type { AuthData, AppData } from "@/types/persistentData";

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

  return {
    authData,
    updateAuthData,
    deleteAuthData,
    appData,
    updateAppData,
    resetAppData,
  };
};

export default usePersistentData;
