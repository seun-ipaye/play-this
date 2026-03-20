import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './GuestRoom.css'

function GuestRoom() {
  const { code } = useParams()
  const [search, setSearch] = useState('')

  const songs = [
    { song_id: '1', title: 'Blinding Lights', artist: 'The Weeknd', votes: 24 },
    { song_id: '2', title: 'As It Was', artist: 'Harry Styles', votes: 17 },
    { song_id: '3', title: 'Unholy', artist: 'Sam Smith', votes: 11 },
  ]

  return (
    <div className="guestroom">

      <nav className="top-nav">
        <div className="logo">playthis</div>
        <div className="nav-badge">{code}</div>
      </nav>

      <section className="gr-hero">
        <h1>Request a song</h1>
        <p className="gr-sub">Search for a song and vote for what you want to hear.</p>
      </section>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a song or artist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="song-queue">
        <div className="queue-header">
          <h2>Current requests</h2>
        </div>

        {songs.map((song) => (
          <div className="song-row" key={song.song_id}>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
            <button className="vote-btn">▲ {song.votes}</button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default GuestRoom