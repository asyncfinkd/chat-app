import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p style={{ textAlign: "center" }}>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((item) => {
              return (
                <div
                  className="message"
                  id={username !== item.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{item.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{item.time}</p>
                      <p id="author">{item.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Hey..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
}
