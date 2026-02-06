const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Phone connected 📱");

  socket.on("button-pressed", (data) => {
    console.log("Button pressed:", data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

