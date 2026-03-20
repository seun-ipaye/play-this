import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './JoinRoom.css'

function JoinRoom() {
  const navigate = useNavigate()
  const [roomCode, setRoomCode] = useState('')
  const [nickname, setNickname] = useState('')

  return (
    <div className="joinroom">

      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="logo">playthis</div>
      </nav>

      <section className="jr-hero">
        <h1>Join a room</h1>
        <p className="jr-sub">Enter the room code and your nickname to get started.</p>
      </section>

      <div className="jr-form">
        <div className="input-group">
          <label>Room code</label>
          <input
            type="text"
            placeholder="e.g. XXPLTS"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
        </div>

        <div className="input-group">
          <label>Your nickname</label>
          <input
            type="text"
            placeholder="e.g. DJ Mikey"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button className="join-btn">
          Join Room
        </button>
      </div>

    </div>
  )
}

export default JoinRoom