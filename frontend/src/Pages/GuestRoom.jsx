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

  const [songList, setSongList] = useState([]);

  useEffect(() => {
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

    loadPage();
  }, []);

  return (
    <div className="guestroom">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Exit
        </button>
        <div className="logo">playthis</div>
        <div className="nav-badge">{code}</div>
      </nav>

      <section className="gr-hero">
        <h1>Hi {guestName}</h1>
        <p className="gr-sub">{roomTitle}</p>
      </section>

      <section className="gr-hero">
        <h1>Request a song</h1>
        <p className="gr-sub">
          Search for a song and vote for what you want to hear.
        </p>
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

        {songList.map((song) => (
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
  );
}

export default GuestRoom;
