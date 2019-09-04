const express = require("express");
const server = express();
const cors = require("cors");
// Routes
const postsRouter = require("../posts/postsRouter");

// server use
server.use(express.json());
server.use(cors());
server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});
module.exports = server;
