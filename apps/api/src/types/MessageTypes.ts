export type WsMessage = UserConnectedMessage
												| PositionChangedMessage
												| UserDisconnectedMessage
												| SimpleMessage
												| LoggedInMessage;

export type MessageBase = {
  sender: string;
}

export type SimpleMessage = MessageBase &{
	event: "simple";
	data: string;
};

export type UserConnectedMessage = MessageBase &{
  event: "userConnected";
};

export type LoggedInMessage = MessageBase &{
	event: "loggedIn";
};

export type PositionChangedMessage = MessageBase &{
  event: "positionChanged";
  data: {
    x: number;
    y: number;
  };
};

export type UserDisconnectedMessage = MessageBase &{
	event: "userDisconnected";
	code: number;
}

export type UserClickedButtonMessage = MessageBase &{
	event: "userClickedButton";
	clicks: number;
}