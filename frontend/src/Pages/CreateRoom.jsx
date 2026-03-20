import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateRoom.css'

function CreateRoom() {
  const navigate = useNavigate()
  const [eventName, setEventName] = useState('')

  return (
    <div className="createroom">

      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div className="logo">playthis</div>
      </nav>

      <section className="cr-hero">
        <h1>Create a room</h1>
        <p className="cr-sub">Set up your event and share the code with your crowd.</p>
      </section>

      <div className="cr-form">
        <div className="input-group">
          <label>Event name</label>
          <input
            type="text"
            placeholder="e.g. Saturday Night"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <button className="create-btn">
          Create Room
        </button>
      </div>

    </div>
  )
}

export default CreateRoom