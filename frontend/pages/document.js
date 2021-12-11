
import React, { useContext, useState } from "react";
import Chat from "../components/chat";
import { UserContext } from "../contexts/user";
import { SocketContext } from "../contexts/socket";

function Dashboard() {
  const { username } = useContext(UserContext);
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState("");
  const [otherUser, setOtherUser] = useState(""); /* for private rooms */
  const socket = useContext(SocketContext);
  const joinRoom = () => {
    if (room != "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  return (
    <div className="flex flex-col justify-a items-center w-full h-full space-y-7">
      {" "}
      <h1 className="text-4xl font-extralight">
        {showChat ? `Chanel ${room}` : `Hi ${username} !`}
      </h1>
      {!showChat ? (
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <h1 className="text-center mb-2 font-medium">Join romm</h1>
            <div className="flex space-x-4">
              <input
                onChange={(e) => setRoom(e.target.value)}
                value={room}
                className="w-48 h-8 rounded-full pl-3 font-light focus:outline-none bg-gray-100"
                type="text"
                placeholder="Room Id ..."
              />
              <button onClick={joinRoom}>Join</button>
            </div>
          </div>
        </div>
      ) : (
        <Chat roomId={room} />
      )}
    </div>
  );
}

export default Dashboard;