import { Server } from "socket.io";
let users = []
const io = new Server({
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (room) => {
      console.log(room);
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });
  
    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
      console.log(data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
  
  console.log(`server is listening on port 3001`);
  