// Megan Rochella - 0706022210028
// ISSG W6

const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });

  socket.on("message", (data) => {
    let { username, message, hash } = data;
    console.log(`Receiving message from ${username}: ${message}`);

    // Relaying message and hash back to all clients
    // Test if the message can be altered
    // message = message + " (modified by server)";
    io.emit("message", { username, message, hash });
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${3000}`);
});