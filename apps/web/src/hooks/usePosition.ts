import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  isWsMessage,
  type LoggedInMessage,
  type PositionChangedMessage,
  type UserConnectedMessage,
  type WsMessage,
} from "../types/wsMessage";
import { set } from "react-hook-form";

const DEFAULT_POSITION_X = 51.505;
const DEFAULT_POSITION_Y = -0.09;

const useWebsockets = () => {
  const [lastMessage, setLastMessage] = useState<WsMessage | null>();
  const [messages, setMessages] = useState<WsMessage[]>([]);
  const [positions, setPositions] = useState<{ [key: string]: [number, number] }>({});
  const [id, setId] = useState<string>("");

  const WS_URL = "ws://127.0.0.1:8000";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL, {
    share: true,
    shouldReconnect: () => true,
    onOpen: () => {
      sendJsonMessage({
        sender: "unknown",
        event: "auth",
        token: localStorage.getItem("JWT"),
      });
    },
  });

  // Run when the connection state (readyState) changes
  // useEffect(() => {
  //   console.log("Connection state changed");
  //   if (readyState === ReadyState.OPEN) {
  //     sendJsonMessage({
  //       event: "userConnected",
  //     });
  //   }
  // }, [readyState]);

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if (!isWsMessage(lastJsonMessage)) return;

    const message = lastJsonMessage as WsMessage;
    console.log("New message received", message);
    setLastMessage(message);
    setMessages([...messages, message]);

    switch (message.event) {
      case "positionChanged":
        handlePositionChanged(message);
        break;
      case "loggedIn":
        handleLoggedIn(message);
        break;
      case "userConnected":
        handleUserConnected(message);
        break;
    }
  }, [lastJsonMessage]);

  const handlePositionChanged = (message: PositionChangedMessage) => {
    setPositions((val) => ({
      ...val,
      [message.sender]: [message.data.x, message.data.y],
    }));
  };

  const handleLoggedIn = (message: LoggedInMessage) => {
    setId(message.data.id);
    setPositions((val) => ({
      ...val,
      [message.sender]: [DEFAULT_POSITION_X, DEFAULT_POSITION_Y],
    }));
    console.log(`Logged in as ${message.sender}`);
  };

  const updatePositionRelative = (x: number, y: number) => {
    console.log(`X: ${positions[id] ? positions[id][0] + x : x}`);
    console.log(`Y: ${positions[id] ? positions[id][1] + y : y}`);

    setPositions((val) => ({
      ...val,
      [id]: [val[id] ? val[id][0] + x : x, val[id] ? val[id][1] + y : y],
    }));
    sendJsonMessage({
      event: "positionChanged",
      data: {
        x: positions[id] ? positions[id][0] + x : DEFAULT_POSITION_X,
        y: positions[id] ? positions[id][1] + y : DEFAULT_POSITION_Y,
      },
    });
  };

  const handleUserConnected = (message: UserConnectedMessage) => {
    setPositions((val) => ({
      ...val,
      [message.sender]: [DEFAULT_POSITION_X, DEFAULT_POSITION_Y],
    }));
  };

  return {
    sendJsonMessage,
    lastMessage,
    messages,
    readyState,
    positions,
    id,
    updatePositionRelative,
  };
};

export default useWebsockets;
