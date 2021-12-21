import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [roomID, setRoomID] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
    }
  };
  return (
    <div>
      <h3>Join A Chat</h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID..."
        onChange={(e) => setRoomID(e.target.value)}
      />
      <button onClick={joinRoom}>Join A Room</button>
    </div>
  );
}

export default App;
