import { WebSocketServer } from "ws";
import http from "http";
import { onWsConnection } from "./api/websocket/websocket";

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { env } from "process";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { options } from "./swaggerOptions";
import userRouter from "./api/rest/routers/user.router";
import groupRouter from "./api/rest/routers/group.router";
import placeRouter from "./api/rest/routers/place.router";
import groupEventRouter from "./api/rest/routers/groupEvent.router";
import usersRouter from "./api/rest/routers/users.router";

config();

const restPort = env.REST_PORT ?? 3000;
const wsPort = env.WS_PORT ?? 8000;

const app = express();

// Add swagger documentation
expressJSDocSwagger(app)(options);

const server = http.createServer(app);

// Create a WebSocket server
const wsServer = new WebSocketServer({ server });
wsServer.on("connection", onWsConnection);

// CORS middleware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// Map REST routes
app.use("/user", userRouter);
app.use("/users", usersRouter);
app.use("/groups", groupRouter);
app.use("/places", placeRouter);
app.use("/group-events", groupEventRouter);

// Default route returning 404
app.use((_req, res) => {
  res.status(404).send("Not found");
});

// Start websocket server
server.listen(wsPort, () => {
  console.log(`[${new Date().toISOString()}] Websocket listening on port ${wsPort}`);
});

// Start REST server
app.listen(restPort, () => {
  console.log(`[${new Date().toISOString()}] Rest listening on port ${restPort}`);
});
