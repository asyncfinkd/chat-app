import { useState } from 'react'
import io from 'socket.io-client'
import Chat from 'components/Chat'

const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && roomID !== '') {
      socket.emit('join_room', roomID)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3 style={{ textAlign: 'center' }}>Join A Chat</h3>
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
      ) : (
        <Chat socket={socket} username={username} room={roomID} />
      )}
    </div>
  )
}

export default App
