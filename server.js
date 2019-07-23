const express = require("express");
const cors = require("cors");

const UserRouter = require("./users/user-router");
const setupGlobalMiddleware = require("./setup-middleware");

const server = express();

server.use(cors({ credentials: true, origin: "http://localhost:3000" }));

setupGlobalMiddleware(server);

server.use("/api", UserRouter);

module.exports = server;
