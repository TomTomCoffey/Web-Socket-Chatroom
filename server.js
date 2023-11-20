const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
});

//serve the public foldler
app.use(express.static('public'));

io.on("connection", (socket) => {
  // ...
  console.log("a user connected");

socket.emit("message", "Hello from server");

socket.on("message", (message) => {
    console.log(message);
    ///broadcast to all clients but sender
    socket.broadcast.emit("message", message);
}
);
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
});

httpServer.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
