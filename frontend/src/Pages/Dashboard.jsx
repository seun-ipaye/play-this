import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;
  const roomID = location.state?.roomID;

  const [loading, setLoading] = useState();

  const [songList, setSongList] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState();

  async function loadPage() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomID}/songs`,
      );

      const data = await response.json();

      console.log("song list:", data);

      setSongList(data);
      await getGuestNumber();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function getGuestNumber() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomID}/guestnumber`,
      );

      const data = await response.json();

      console.log("number of guests:", data);

      setNumberOfGuests(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  // const nowUp = {
  //   song_id: "1",
  //   title: "Blinding Lights",
  //   artist: "The Weeknd",
  //   votes: 24,
  // };

  return (
    <div className="dashboard">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Exit
        </button>
        <div className="logo">playthis</div>
      </nav>

      <section className="dash-hero">
        <div className="room-code-label">Room</div>
        <div className="room-code">{room?.title}</div>
        <p className="dash-sub">{numberOfGuests} guests in the room</p>
      </section>

      {/* <div className="now-up">
        <div className="now-up-header">
          <div className="now-up-label">Now up</div>
          <div className="timer">2:47</div>
        </div>
        <div className="now-up-card">
          <div className="now-up-info">
            <div className="now-up-title">{nowUp.title}</div>
            <div className="now-up-artist">{nowUp.artist}</div>
            <div className="now-up-votes">▲ {nowUp.votes} votes</div>
          </div>
          <button className="reject-btn">✕ Reject</button>
        </div>
      </div> */}

      <div className="song-queue">
        <div className="queue-header">
          <h2>Up next</h2>
        </div>

        {songList.map((song, index) => (
          <div className="song-row" key={song.song_id}>
            <div className="song-rank">#{index + 1}</div>
            <div className="song-info">
              <div className="song-title">{song.title}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
            <div className="song-votes">▲ {song.votes}</div>
            <button className="action-btn remove">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
