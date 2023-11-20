const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const ws_port = process.env.PORT || 3000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');
});

//serve the public foldler
app.use(express.static('public'));

io.on("connection", (socket) => {
  ///random id
  socket.uniqueId = Math.random() * 10000000;
  console.log("a user connected");

socket.emit("message", "Hello from server");

socket.on("message", (message) => {
    console.log(message);
    ///broadcast to all clients but sender
    socket.broadcast.emit("message", message);
}
);

socket.on("CursorMove", (position) => {

    console.log(position);
    ///broadcast to all clients but sender
    socket.broadcast.emit("CursorMove", {position: position, id: socket.uniqueId});
}
);
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
});



httpServer.listen(ws_port, () => {
    console.log("");
});
