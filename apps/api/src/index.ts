import { WebSocketServer } from "ws";
import http from "http";
import { onWsConnection } from "./api/websocket/websocket";

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { env } from "process";
import userRouter from "./api/rest/routers/user.router";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { options } from "./swaggerOptions";

config();
const restPort = env.REST_PORT ?? 3000;
const wsPort = env.WS_PORT ?? 8000;

const app = express();

expressJSDocSwagger(app)(options);

const server = http.createServer(app);

const wsServer = new WebSocketServer({ server });
wsServer.on("connection", onWsConnection);

// CORS middleware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// Default route returning 404
app.use((_req, res) => {
  res.status(404).send("Not found");
});

server.listen(wsPort, () => {
  console.log(`[${new Date().toISOString()}] Websocket listening on port ${wsPort}`);
});

app.listen(restPort, () => {
  console.log(`[${new Date().toISOString()}] Rest listening on port ${restPort}`);
});
