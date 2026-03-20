import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">

      <nav className="landing-nav">
        <div className="logo">play<span>this</span></div>
        <div className="nav-badge">BETA</div>
      </nav>

      <section className="hero">
        <div className="eyebrow">Live at your event</div>
        <h1>The crowd picks the <span className="accent">vibe.</span></h1>
        <p className="hero-sub">Guests request and vote on songs. You play what the room actually wants.</p>
      </section>

      <div className="action-cards">
        <button className="card-btn primary" onClick={() => navigate('/create')}>
          <div className="card-label">
            <div className="card-title">Start a room</div>
            <div className="card-desc">DJ / host — create your event</div>
          </div>
          <div className="card-icon">🎧</div>
        </button>

        <div className="divider"><span>or</span></div>

        <button className="card-btn" onClick={() => navigate('/join')}>
          <div className="card-label">
            <div className="card-title">Join a room</div>
            <div className="card-desc">Got a code? Jump right in</div>
          </div>
          <div className="card-icon">🎵</div>
        </button>
      </div>

    </div>
  )
}

export default Landing