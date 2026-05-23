// src/pages/Dashboard.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const room = location.state?.room;
  const roomID = location.state?.roomID;

  const [loading, setLoading] = useState(false);
  const [songList, setSongList] = useState([]);
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  const [error, setError] = useState("");

  const roomCode = room?.code;
  const joinUrl = roomCode ? `${window.location.origin}/join/${roomCode}` : "";

  async function loadPage() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomID}/songs`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load songs");
      }

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

      if (!response.ok) {
        throw new Error(data.detail || "Failed to load guest number");
      }

      console.log("number of guests:", data);

      setNumberOfGuests(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  }

  useEffect(() => {
    if (roomID) {
      loadPage();
    }
  }, [roomID]);

  return (
    <div className="dashboard">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/create")}>
          ← Back
        </button>

        <div className="logo">
          play<span>this</span>
        </div>
      </nav>

      <main className="dashboard-content">
        <section className="dash-hero dashboard-room-panel">
          <div className="room-code-label">Room</div>
          <h1 className="room-code">{room?.title}</h1>

          {roomCode && (
            <div className="room-details-card">
              <div>
                <p className="detail-label">Room code</p>
                <p className="detail-value">{roomCode}</p>
              </div>

              <div>
                <p className="detail-label">Guests</p>
                <p className="detail-value">{numberOfGuests}</p>
              </div>
            </div>
          )}

          {roomCode && (
            <button className="show-qr-btn" onClick={() => setShowQRCode(true)}>
              Show QR code
            </button>
          )}

          <p className="dash-sub">{numberOfGuests} guests in the room</p>

          {error && <p style={{ color: "tomato" }}>{error}</p>}
        </section>

        <section className="song-queue dashboard-queue-panel">
          <div className="queue-header">
            <div>
              <h2>Up next</h2>
            </div>

            <div className="queue-count">{songList.length} songs</div>
          </div>

          {loading && <p className="dash-sub">Loading queue...</p>}

          {!loading && songList.length === 0 && (
            <div>
              <p>No songs yet.</p>
            </div>
          )}

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
        </section>
      </main>

      {showQRCode && (
        <div className="qr-overlay" onClick={() => setShowQRCode(false)}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="qr-close-btn"
              onClick={() => setShowQRCode(false)}
            >
              ×
            </button>

            <h2>Scan to join</h2>

            <div className="qr-code-box">
              <QRCodeCanvas
                value={joinUrl}
                size={220}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
