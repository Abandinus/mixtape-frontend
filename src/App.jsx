import { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from './Header'; 

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
      <Header />
      
      <div className="app-container">
        <main>
          {/* THE MANIFESTO */}
          <div className="manifesto-block">
             <p>50 Physical Prints. 50 Digital Mixtapes.</p>
             <p>You hold the key. What is your soundtrack?</p>
          </div>

          <div className="tape-grid">
            {tapes.map((tape) => {
              const formattedId = tape.id.toString().padStart(2, '0');
              const imagePath = `/tapes/tape-${formattedId}.webp`;

              return (
                <Link to={`/tape/${tape.id}`} key={tape.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className={`tape-card ${tape.is_recorded ? 'is-claimed' : 'is-blank'}`}>
                    
                    <div className="tape-image-container">
                      <img 
                        src={imagePath} 
                        alt={`Tape ${formattedId}`} 
                        className="tape-image" 
                        loading="lazy"
                      />
                      {/* SHARPIE OVERLAY ON THE GRID */}
                      {tape.is_recorded && (
                        <div className="grid-sharpie-overlay">
                          {tape.song}
                        </div>
                      )}
                    </div>

                    <div className="tape-controls">
                      <div className="tape-pill">
                        TAPE {formattedId}
                      </div>
                      <div className={`status-dot ${tape.is_recorded ? 'recorded' : 'empty'}`}></div>
                    </div>

                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App