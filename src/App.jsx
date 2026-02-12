import { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from './Header'; // Import the new component

function App() {
  const [tapes, setTapes] = useState([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tapes`) 
      .then(response => response.json())
      .then(data => setTapes(data))
      .catch(error => console.error('Error fetching tapes:', error))
  }, [])

  return (
    <div className="App">
      {/* 1. New Hero Header (Stretches full width) */}
      <Header />
      
      {/* 2. Main Content Wrapper (Centered & Padded) */}
      <div className="app-container">
        <main>
          <div className="tape-grid">
            {tapes.map((tape) => (
              <Link to={`/tape/${tape.id}`} key={tape.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tape-card">
                  
                  <div className="tape-image-container">
                    <img 
                      src={tape.is_recorded ? "/tape-placeholder-sq.webp" : "/tape-wireframe-sq.webp"} 
                      alt={tape.song} 
                      className="tape-image" 
                    />
                  </div>

                  <div className="tape-controls">
                    <div className="tape-pill">
                      TAPE {tape.id.toString().padStart(2, '0')}
                    </div>
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
    </div>
  )
}

export default App