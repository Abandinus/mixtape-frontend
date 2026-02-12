import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './App.css' // We'll share styles for now

function TapeDeck() {
  const { id } = useParams() // Grabs "5" from the URL /tape/5
  const [tape, setTape] = useState(null)
  const [loading, setLoading] = useState(true)
  const [pin, setPin] = useState('')
  const [spotifyUrl, setSpotifyUrl] = useState('')
  const [error, setError] = useState(null)
  // Helper: Converts a standard Spotify link to an Embed link
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      
      // 1. Hostname Check: Must be a Spotify URL (Strict check)
      if (!urlObj.hostname.includes('spotify.com')) return null;

      // 2. If it's already an embed link (has /embed), use it as is
      if (urlObj.pathname.startsWith('/embed')) return url;

      // 3. Otherwise, add '/embed' to the path
      // e.g. https://open.spotify.com/playlist/123 -> https://open.spotify.com/embed/playlist/123
      return `${urlObj.protocol}//${urlObj.hostname}/embed${urlObj.pathname}`;
      
    } catch (e) {
      console.error("Invalid URL:", e);
      return null;
    }
  }
  
  const handleRecord = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin, spotify_url: spotifyUrl })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to record tape')
      }

      // Success! Update the local tape data to show the "Recorded" state
      setTape(data.tape)
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    // Fetch JUST this specific tape
    fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Tape not found")
        return res.json()
      })
      .then(data => {
        setTape(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="app-container">Loading Tape Deck...</div>
  if (!tape) return <div className="app-container">Tape {id} does not exist.</div>

  return (
    <div className="app-container" style={{ textAlign: 'center' }}>
      {/* Navigation Back */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>← Back to Collection</Link>
      </nav>

      <h1>Tape Deck #{tape.id}</h1>

      {/* THE LOGIC SPLIT */}
      <div className="recorder-interface" style={{ maxWidth: '600px', margin: '0 auto', border: '2px solid #333', padding: '20px', borderRadius: '10px' }}>
        
        {/* The Tape Image (Always visible) */}
        <img 
          src={tape.is_recorded ? "/tape-placeholder-sq.webp" : "/tape-wireframe-sq.webp"} 
          alt="Tape" 
          style={{ width: '100%', maxWidth: '400px' }}
        />

        {/* STATE A: BLANK (The Recording Studio) */}
        {!tape.is_recorded && (
          <div className="recording-controls">
            <h2>This tape is blank.</h2>
            <p>Enter your 4-digit PIN to claim it.</p>
            
            <form onSubmit={handleRecord} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '20px auto' }}>
              
              <input 
                type="text" 
                placeholder="Enter 4-Digit PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={{ padding: '10px', fontSize: '1rem', textAlign: 'center' }}
                maxLength="4"
              />

              <input 
                type="text" 
                placeholder="Paste Spotify Link"
                value={spotifyUrl}
                onChange={(e) => setSpotifyUrl(e.target.value)}
                style={{ padding: '10px', fontSize: '1rem' }}
              />

              {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

              <button type="submit" style={{ padding: '10px 20px', fontSize: '1.2rem', background: '#e63946', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
                ● RECORD
              </button>
            </form>
          </div>
        )}

        {/* STATE B: RECORDED (The Player) */}
        {tape.is_recorded && (
          <div className="playback-controls">
            
            {/* The Spotify Player */}
            <div style={{ marginTop: '20px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
              {/* NOTE: We use tape.playlist_url here because that is what matches your database */}
              {getEmbedUrl(tape.playlist_url) ? (
                <iframe 
                  style={{ borderRadius: '12px' }} 
                  src={getEmbedUrl(tape.playlist_url)} 
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                ></iframe>
              ) : (
                <div style={{ padding: '20px', color: 'red', background: '#ffe6e6' }}>
                  <p><strong>Error:</strong> Invalid Spotify Link</p>
                  <p style={{fontSize: '0.8rem'}}>Saved URL: {tape.playlist_url}</p>
                </div>
              )}
            </div>

            <p style={{ marginTop: '15px', opacity: 0.7, fontSize: '0.9rem' }}>
              Tape #{tape.id} • Recorded by User
            </p>
            
            {/* Optional: A button to go back to the gallery */}
            <button 
              onClick={() => window.location.href = '/'}
              style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid #333', cursor: 'pointer', borderRadius: '20px' }}
            >
              Back to Collection
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default TapeDeck