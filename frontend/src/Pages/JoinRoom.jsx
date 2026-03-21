import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinRoom.css";

function JoinRoom() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleJoinRoom() {
    if (!roomCode.trim() || !nickname.trim()) {
      setError("Please enter both room code and nickname");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/guests/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nickname,
            room_code: roomCode,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to join room");
      }

      console.log("Joined room as guest:", data);

      const roomRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms/code/${roomCode}`,
      );
      const roomData = await roomRes.json();

      navigate(`/room/${roomCode}`, {
        state: {
          guest: data,
          guestName: data.name,
          roomCode,
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
        <div className="logo">playthis</div>
      </nav>

      <section className="jr-hero">
        <h1>Join a room</h1>
        <p className="jr-sub">
          Enter the room code and your nickname to get started.
        </p>
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

        {error && <p style={{ color: "tomato" }}>{error}</p>}

        <button
          className="join-btn"
          onClick={handleJoinRoom}
          disabled={loading}
        >
          {loading ? "Joining..." : "Join Room"}
        </button>
      </div>
    </div>
  );
}

export default JoinRoom;
