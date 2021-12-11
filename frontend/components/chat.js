import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../contexts/socket";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ roomId }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [listMessage, setListMessage] = useState([""]);
  const socket = useContext(SocketContext);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomId,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setListMessage((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    console.log("Hello");
    socket.on("receive_message", (data) => {
      setListMessage((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="w-full h-full flex-col flex items-center justify-around">
      <ScrollToBottom>
        <div className="w-96 h-pl-4 self-start mb-5 ">
          {listMessage.map(({ message, time, author }) => (
            <div>
              <h1 className="font-semibold">{message}</h1>

              <p>{time}</p>
            </div>
          ))}
        </div>
      </ScrollToBottom>

      <div className="mb-8 space-x-6 flex justify-center">
        <input
          className="bg-gray-100 pl-4 w-60 h-8 focus:outline-none rounded-full font-light"
          type="text"
          placeholder="Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          className="bg-gray-900 text-white w-16 h-8 rounded-full"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;