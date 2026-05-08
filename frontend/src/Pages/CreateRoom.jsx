import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRoom.css";

function CreateRoom() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    console.log("tryna create now");
    if (!eventName.trim()) {
      setError("Please enter an event name");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/rooms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: eventName,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const room = await response.json();

      console.log("Created room:", room);

      navigate("/dashboard", { state: { room, roomID: room.id } });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="createroom">
      <nav className="top-nav">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="logo">
          play<span>this</span>
        </div>
      </nav>

      <section className="jr-hero">
        <h1>Create room</h1>
      </section>

      <div className="jr-form">
        <div className="input-group">
          <label>Event name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "tomato" }}>{error}</p>}

        <button
          className="create-btn"
          onClick={handleCreateRoom}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
