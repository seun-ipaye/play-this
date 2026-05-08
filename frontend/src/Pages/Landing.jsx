import { useNavigate } from "react-router-dom";
import "./Landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="logolanding">
          play<span>this</span>
        </div>
      </nav>

      <div className="textunder">Make song requests without bugging the DJ</div>

      <div className="action-cards">
        <button
          className="card-btn primary"
          onClick={() => navigate("/create")}
        >
          <div className="card-title">Create room</div>
        </button>

        <button className="card-btn" onClick={() => navigate("/join")}>
          <div className="card-title">Join room</div>
        </button>
      </div>
    </div>
  );
}

export default Landing;
