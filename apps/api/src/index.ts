import { WebSocketServer, WebSocket, type RawData } from "ws"
import http from "http"
import { v4 as uuidv4 } from "uuid"
import { type LoggedInMessage, type SubscribeUserInfoMessage, type WsMessage } from "./types/WsEvents"

const server = http.createServer()
const wsServer = new WebSocketServer({ server })

const port = 8000
const connectionPool: {[userId: string]: WebSocket} = {} 
const broadcastGroups: {[originUserId: string]: string[]} = {} // [originUser: [receiverUsers]]
const userSubscribedTo: {[userId: string]: string[]} = {} // [receiverUser: [originUsers]]


const handleMessage = (message: RawData, user: string) => {
  const parsedMessage = JSON.parse(message.toString());

  broadcast({sender: user, ...parsedMessage}, [user]);
}

const handleClose = (code: number, user: string) => {

  // Notify subscribed users that this user has disconnected
  broadcastToGroup({
    sender: user,
    event: "userDisconnected",
    code : code
  }, 
  broadcastGroups[user] || [])

  // Remove user from broadcast groups
  for (const broadcastGroupId in userSubscribedTo[user]){
    const group = broadcastGroups[broadcastGroupId]
    if(group){
      broadcastGroups[broadcastGroupId] = group.filter((userId) => userId !== user)
    }
  }

  // Remove user from userSubscribedTo
  delete userSubscribedTo[user];
  
  // Remove user from connectionPool
  delete connectionPool[user];
  
}

const handleSubscribeUserInfoMessage = (message: SubscribeUserInfoMessage, user: string) => {
  const { usersToSubscribe } = message;
  
  usersToSubscribe.forEach((userId) => {
    if(!broadcastGroups[userId]){
      broadcastGroups[userId] = []
    }
    broadcastGroups[userId].push(user)

    if(!userSubscribedTo[user]){
      userSubscribedTo[user] = []
    }
    userSubscribedTo[user].push(userId)

    // Notify subscribed user that this user has connected
    // Send subscribing user the position of the subscribed user
  })
}

const broadcast = (message: WsMessage, exclude?: string[]) => {
  Object.keys(connectionPool).forEach((uuid) => {
    // Skip excluded connections
    if (exclude?.includes(uuid)) return
    
    const connection = connectionPool[uuid]
    connection?.send(JSON.stringify(message))
  })
}

const broadcastToGroup = (message: WsMessage, group: string[]) => {
  group.forEach((uuid) => {
    const connection = connectionPool[uuid]
    connection?.send(JSON.stringify(message))
  })

}

wsServer.on("connection", (connection) => {
  const id = uuidv4();
  console.log(`New connection: ${id}`);
  connectionPool[id] = connection;

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
