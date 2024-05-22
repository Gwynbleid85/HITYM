import { WebSocketServer, WebSocket, type RawData } from "ws"
import http from "http"
import { v4 as uuidv4 } from "uuid"
import { type LoggedInMessage, type WsMessage } from "./types/MessageTypes"
const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connections: {[key: string]: WebSocket} = {}



const handleMessage = (message: RawData, user: string) => {
  const parsedMessage = JSON.parse(message.toString());

  if (parsedMessage.event === "positionChanged") {
    console.log(`User ${user} changed position [ ${parsedMessage.data.x} , ${parsedMessage.data.y} ]`)
  }

  broadcast({sender: user, ...parsedMessage}, [user]);
}

const handleClose = (code: number, user: string) => {
  console.log(`Connection closed: ${user}`);

  delete connections[user]

  broadcast({
    sender: user,
    event: "userDisconnected",
    code : code
  })
}

const broadcast = (message: WsMessage, exclude?: string[]) => {
  Object.keys(connections).forEach((uuid) => {
    // Skip excluded connections
    if (exclude?.includes(uuid)) return
    
    const connection = connections[uuid]
    connection?.send(JSON.stringify(message))
  })
}

wsServer.on("connection", (connection) => {
  const id = uuidv4();
  console.log(`New connection: ${id}`);
  connections[id] = connection;

  broadcast({
    sender: id,
    event: "userConnected"
  }, [id]);

  const message: LoggedInMessage = {
    sender: id,
    event: "loggedIn"
  }
  connection.send(JSON.stringify(message));


  connection.on("message", (message) => handleMessage(message, id));
  connection.on("close", (code) => handleClose(code, id));
  
})

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`)
})