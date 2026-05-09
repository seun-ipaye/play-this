import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import "./GuestRoom.css";

function GuestRoom() {
  const { code } = useParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const roomTitle = location.state?.roomTitle;
  const roomID = location.state?.roomID;
  const guestName = location.state?.guestName;
  const guestID = location.state?.guestID;

  const [songList, setSongList] = useState([]);
  const [songResults, setSongResults] = useState([]);

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");

  async function loadPage() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomID}/songs`,
      );

      const data = await response.json();

      console.log("song list:", data);

      setSongList(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  // YourComponent.jsx
  useEffect(() => {
    if (!title.trim()) {
      setSongResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchSongs(title);
    }, 300);

    return () => clearTimeout(timer);
  }, [title]);

  async function searchSongs(songName) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/songs/search?song=${encodeURIComponent(songName)}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to search songs");
      }

      setSongResults(data);
      console.log("Song results:", data);
    } catch (err) {
      console.error(err);
      setSongResults([]);
    }
  }

  async function addSong() {
    try {
      setArtist("");
      setTitle("");
      // this might not be good practice^
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/songs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            artist: artist,
            room_id: roomID,
            guest_id: guestID,
          }),
        },
      );

      const data = await response.json();
      await loadPage();
      console.log("song list:", data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function voteSong(songID) {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/songs/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            song_id: songID,
            guest_id: guestID,
            room_id: roomID,
          }),
        },
      );

      const data = await response.json();
      await loadPage();
      console.log("song:", data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  // GuestRoom.jsx

  function selectSong(song) {
    setTitle(song.name);
    setArtist(song.artist);
    setSongResults([]);
  }

  return (
    <div className="guestroom">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/join")}>
          ← Back
        </button>
        <div className="logo">
          play<span>this</span>
        </div>
      </nav>
      <section className="gr-hero">
        <h2>Hi {guestName},</h2>
        <h2>You're in '{roomTitle}'</h2>
      </section>
      <section className="gr-hero">
        <h1>Request a song</h1>
        {/* <p className="gr-sub">
          Search for a song and vote for what you want to hear.
        </p> */}
      </section>
      <div className="search-box">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setArtist("");
          }}
        />

        {songResults.length > 0 && (
          <div className="song-results">
            {songResults.map((song) => (
              <button
                className="song-result"
                key={song.spotify_id}
                onClick={() => selectSong(song)}
              >
                <div className="song-result-title">{song.name}</div>
                <div className="song-result-artist">{song.artist}</div>
              </button>
            ))}
          </div>
        )}
      </div>
      <button className="vote-btn" onClick={() => addSong()}>
        Request
      </button>
      <div className="song-queue">
        <div className="queue-header">
          <h1>Current requests</h1>
        </div>

        {songList.map((song) => (
          <div className="song-row" key={song.song_id}>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
            <button className="vote-btn" onClick={() => voteSong(song.song_id)}>
              ▲ {song.votes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestRoom;
