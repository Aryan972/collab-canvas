const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const rooms = {};

const io = new Server(server, {
  cors: {
    origin: "**", // Vite frontend port
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  //join room when start
  socket.on("join-room", ((roomId) => {
    socket.join(roomId);

    if(!rooms[roomId]){
      rooms[roomId] = [];
    }

    
    socket.emit("load-board", rooms[roomId]); //send existing strokes to new user in the same room
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    const room = io.sockets.adapter.rooms.get(roomId);
    const userCount = room ? room.size : 0;
    io.to(roomId).emit("room-users", userCount);
  }))

  socket.on("start", (data) => {             //to broadcast to all other clients while start
    console.log("Start recieved from: ", socket.id);
    
    rooms[data.roomId].push({type: "start", ...data});
    socket.to(data.roomId).emit("start", data);
  });

  socket.on("draw", (data) => {             //to broadcast to all other clients while drawing
    console.log("Draw recieved from: ", socket.id);
    
    rooms[data.roomId].push({type: "draw", ...data});
    socket.to(data.roomId).emit("draw", data);
  });

  socket.on("clear", (data) => {             //to broadcast to all other clients while drawing
    console.log("Clear recieved from: ", socket.id);
    
    rooms[data.roomId] = []; //it must reset room state
    socket.to(data.roomId).emit("clear");
  });

  socket.on("disconnect", () => {

    socket.rooms.forEach((roomId) => {
      if(rooms[roomId]) {
        const room = io.sockets.adapter.rooms.get(roomId);
        const userCount = room ? room.size - 1: 0;
        io.to(roomId).emit("room-users", userCount);
      }
    })
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});