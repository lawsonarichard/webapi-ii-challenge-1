const express = require("express");
const server = express();

// Routes
const postsRouter = require("../posts/postsRouter");

// server use
server.use(express.json());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});
module.exports = server;
