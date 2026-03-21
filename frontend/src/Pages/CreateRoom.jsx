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
        <div className="logo">playthis</div>
      </nav>

      <section className="cr-hero">
        <h1>Create a room</h1>
        <p className="cr-sub">
          Set up your event and share the code with your crowd.
        </p>
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

        {error && <p style={{ color: "tomato" }}>{error}</p>}

        <button
          className="create-btn"
          onClick={handleCreateRoom}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>
    </div>
  );
}

export default CreateRoom;
