const express = require("express");
const http = require("http");
const path = require("path");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "../public")));

let counter = 1;

io.on("connection", (socket) => {
  console.log("someone joined", socket.id);

  socket.emit("connected", "hellooooo world");

  socket.on("userNum", (msg) => {
    const expected = counter % 5 === 0 ? "HOB" : String(counter);
    console.log(msg);
    // if (msg == counter) {
    //   counter++;
    //   socket.emit("serverNum", counter);
    //   counter++;
    // } else {
    //   socket.emit("gameOver", "Wrong number entered");
    // }
    if (msg !== expected) {
      socket.emit("gameOver", "Wrong number entered");
      return;
    }

    counter++;

    const serverMove = counter % 5 === 0 ? "HOB" : String(counter);
    socket.emit("serverNum", serverMove);

    counter++;
  });

  socket.on("restart", () => {
    counter = 1;
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
