import { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'

function App() {
  const [tapes, setTapes] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tapes`) 
      .then(response => response.json())
      .then(data => setTapes(data))
      .catch(error => console.error('Error fetching tapes:', error))
  }, [])

  return (
    <div className="app-container">
      <header>
        <h1>Mixtape Collection</h1>
      </header>
      
      <main>
        <div className="tape-grid">
  {tapes.map((tape) => (
    /* THE LINK IS NOW THE WRAPPER */
    <Link to={`/tape/${tape.id}`} key={tape.id} style={{ textDecoration: 'none', color: 'inherit' }}>
      
      {/* The div is now inside. verify you REMOVED key={tape.id} from this div */}
      <div className="tape-card">
        
        {/* 1. The Image Layer */}
        <div className="tape-image-container">
          <img 
            src={tape.is_recorded ? "/tape-placeholder-sq.webp" : "/tape-wireframe-sq.webp"} 
            alt={tape.song} 
            className="tape-image" 
          />
        </div>

        {/* 2. The Footer Layer (Pill + Button) */}
        <div className="tape-controls">
          
          {/* The Pill */}
          <div className="tape-pill">
            TAPE {tape.id.toString().padStart(2, '0')}
          </div>

          {/* The Play Button */}
          {/* Note: Clicking this will now ALSO take you to the page because it's inside the Link */}
          <button 
            className={`play-btn ${tape.is_recorded ? 'active' : 'inactive'}`}
            disabled={!tape.is_recorded} 
          >
            <span className="play-icon">▶</span>
          </button>

        </div>

      </div>
    </Link>
  ))}
</div>
      </main>
    </div>
  )
}

export default App