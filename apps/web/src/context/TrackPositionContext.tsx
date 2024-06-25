import { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useUserContext } from "./UserContext";
import usePersistentData from "@/hooks/usePersistentData";
import type {
  AuthMessage,
  AuthRequiredMessage,
  UserChangedPositionMessage,
  UserConnectedMessage,
  UserDisconnectedMessage,
  UserStatusUpdatedMessage,
  WelcomeMessage,
  WsMessage,
} from "../../../../packages/shared-types/WsMessages";
import { useToast } from "@/components/ui/use-toast";

const WS_URL = import.meta.env.VITE_WS_URL as string;

export type UserInfo = {
  name: string;
  profilePicture: string | null;
  position: {
    latitude: number;
    longitude: number;
  } | null;
  status: { status: string; color: string } | null;
  active: boolean;
};

interface TrackPositionValue {
  usersPositions: { [key: string]: UserInfo };

  myPosition: { latitude: number; longitude: number } | null;
  updatePosition: () => void;

  trackPosition: boolean;
  invertTrackPosition: () => void;
}

const TrackPositionContext = createContext<TrackPositionValue>({
  usersPositions: {},
  myPosition: null,
  updatePosition: () => {},
  trackPosition: false,
  invertTrackPosition: () => {},
});

export const useTrackPositionContext = () => useContext(TrackPositionContext);

export const TrackPositionProvider = ({ children }: any) => {
  const [usersPositions, setUsersPositions] = useState<{ [key: string]: UserInfo }>({});
  const [myPosition, setMyPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [trackPosition, setTrackPosition] = useState<boolean>(false);
  const { userContext } = useUserContext();
  const { authData } = usePersistentData();
  const { toast } = useToast();

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    WS_URL,
    {
      share: true,
      shouldReconnect: () => true,
    },
    userContext.state === "loggedIn"
  );

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if (!isWsMessage(lastJsonMessage)) return;

    const message = lastJsonMessage as WsMessage;
    handleWsMessage(message);
  }, [lastJsonMessage]);

  const handleWsMessage = (message: WsMessage) => {
    switch (message.type) {
      case "authRequired":
        handleAuth(message);
        break;
      case "userChangedPosition":
        handlePositionChanged(message);
        break;
      case "welcome":
        handleWelcome(message);
        break;
      case "userConnected":
        handleUserConnected(message);
        break;
      case "userDisconnected":
        handleUserDisconnected(message);
        break;
      case "userStatusUpdated":
        handleUserStatusUpdated(message);
        break;

      default:
        console.warn(`Unknown message type: ${message.type}`);
        break;
    }
  };

  const handleAuth = (_message: AuthRequiredMessage) => {
    sendJsonMessage({
      sender: "unauthorized user",
      type: "auth",
      data: {
        token: authData?.token,
      },
    } as AuthMessage);
  };

  /**
   * Handle Welcome message
   * @param message received message
   */
  const handleWelcome = (message: WelcomeMessage) => {
    // Load followed users positions
    const newUsers: { [key: string]: UserInfo } = {};
    message.data.followedUsers.forEach((user) => {
      // Get last positions
      let lastPosition = null;
      if (user.lastPosition?.latitude && user.lastPosition?.longitude) {
        lastPosition = {
          latitude: user.lastPosition.latitude,
          longitude: user.lastPosition.longitude,
        };
      }

      newUsers[user.userId] = {
        name: user.name,
        profilePicture: user.profilePicture,
        position: lastPosition,
        status: user.status,
        active: user.active,
      };
    });

    setUsersPositions(newUsers);
  };

  /**
   * Handle position changed message
   * @param message received message
   */
  const handlePositionChanged = (message: UserChangedPositionMessage) => {
    setUsersPositions((val) => {
      const user = val[message.sender];
      if (user) {
        return {
          ...val,
          [message.sender]: {
            ...user,
            position: {
              latitude: message.data.latitude,
              longitude: message.data.longitude,
            },
          },
        };
      }
      return val;
    });
  };

  /**
   * Handle user connected message
   * @param message received message
   */
  const handleUserConnected = (message: UserConnectedMessage) => {
    setUsersPositions((val) => {
      const user = val[message.data.userId];
      if (user) {
        return {
          ...val,
          [message.data.userId]: {
            ...user,
            active: true,
          },
        };
      }
      return val;
    });
  };

  /**
   * Handle user disconnected message
   * @param message received message
   */
  const handleUserDisconnected = (message: UserDisconnectedMessage) => {
    setUsersPositions((val) => {
      const user = val[message.data.userId];
      if (user) {
        return {
          ...val,
          [message.data.userId]: {
            ...user,
            active: false,
          },
        };
      }
      return val;
    });
  };

  /**
   * Handle user status updated message
   * @param message received message
   */
  const handleUserStatusUpdated = (message: UserStatusUpdatedMessage) => {
    setUsersPositions((val) => {
      const user = val[message.sender];
      if (user) {
        return {
          ...val,
          [message.sender]: {
            ...user,
            status: message.data.status,
          },
        };
      }
      return val;
    });
  };

  const invertTrackPosition = () => {
    setTrackPosition((val) => !val);
  };

  /**
   * Update user position
   * Get user position and send it to the server
   */
  const updatePosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 1,
    };

    if (!navigator || !navigator.geolocation) {
      toast({
        title: "Geolocation is not supported by your browser",
        variant: "destructive",
      });

      return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };
  function success(pos: GeolocationPosition) {
    const crd = pos.coords;

    setMyPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
    });

    sendJsonMessage({
      type: "userChangedPosition",
      sender: userContext.user?.id,
      data: {
        latitude: crd.latitude,
        longitude: crd.longitude,
      },
    } as UserChangedPositionMessage);
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  return (
    <TrackPositionContext.Provider
      value={{
        usersPositions,
        myPosition,
        invertTrackPosition,
        trackPosition,
        updatePosition,
      }}
    >
      {children}
    </TrackPositionContext.Provider>
  );
};

// Check if the message is a WsMessage
function isWsMessage(message: unknown): message is WsMessage {
  // Adjust the check according to the structure of WsMessage
  return (message as WsMessage) !== undefined && (message as WsMessage) !== null;
}
