// src/pages/JoinRoom.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JoinRoom.css";

function JoinRoom() {
  const navigate = useNavigate();
  const { roomCodeFromUrl } = useParams();

  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cameFromQRCode = Boolean(roomCodeFromUrl);

  useEffect(() => {
    if (roomCodeFromUrl) {
      setRoomCode(roomCodeFromUrl.toUpperCase());
    }
  }, [roomCodeFromUrl]);

  async function handleJoinRoom() {
    if (!roomCode.trim() || !nickname.trim()) {
      setError("Please enter both room code and nickname");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const cleanRoomCode = roomCode.trim().toUpperCase();

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/guests/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nickname.trim(),
            room_code: cleanRoomCode,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to join room");
      }

      console.log("Joined room as guest:", data);

      const roomRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/code/${cleanRoomCode}`,
      );

      const roomData = await roomRes.json();

      if (!roomRes.ok) {
        throw new Error(roomData.detail || "Failed to get room");
      }

      navigate(`/room/${cleanRoomCode}`, {
        state: {
          guest: data,
          guestName: data.name,
          guestID: data.guest_id,
          roomCode: cleanRoomCode,
          roomTitle: roomData.title,
          roomID: roomData.id,
        },
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="joinroom">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <div className="logo">
          play<span>this</span>
        </div>
      </nav>

      <section className="jr-hero">
        <h1>Join room</h1>
      </section>

      <div className="jr-form">
        <div className="input-group">
          <label>Room code</label>

          <input
            type="text"
            value={roomCode}
            disabled={cameFromQRCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
        </div>

        <div className="input-group">
          <label>Nickname</label>

          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {cameFromQRCode && (
          <p>Room code detected from QR code. Just enter your nickname.</p>
        )}

        {error && <p style={{ color: "tomato" }}>{error}</p>}

        <button
          className="join-btn"
          onClick={handleJoinRoom}
          disabled={loading}
        >
          {loading ? "Joining..." : "Join"}
        </button>
      </div>
      <div>are you a host/dj? join here</div>
    </div>
  );
}

export default JoinRoom;
