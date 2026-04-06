import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './App.css'; 
import './TapeDeck.css'; 

export default function TapeDeck() {
  const { id } = useParams();
  
  // REAL STATE
  const [tape, setTape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NEW UI STATE
  const [pin, setPin] = useState(['', '', '', '']); // Array for the 4 blocky boxes
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // 1. DATA FETCHING (Talks to Render)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTape(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 2. SPOTIFY URL FORMATTER
  const getEmbedUrl = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.pathname.startsWith('/embed')) return url;
      const parts = urlObj.pathname.split('/');
      return `https://open.spotify.com/embed/${parts[1]}/${parts[2]}`;
    } catch (e) {
      return null;
    }
  }

  // 3. UI HANDLER: 4-Box PIN Input
  const handlePinChange = (index, value) => {
    if (value.length > 1) return; // Only allow 1 character per box
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus next box
    if (value !== '' && index < 3) {
      document.getElementById(`pin-${index + 1}`).focus();
    }
  };

  // 4. SUBMIT LOGIC
  const handleRecord = async (e) => {
    e.preventDefault();
    setError(null);
    const pinString = pin.join(''); // Combine the 4 boxes back into "1234"

    if (pinString.length !== 4) {
        setError("Please enter all 4 digits of your PIN.");
        return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/tapes/${id}/record`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinString, spotify_url: spotifyUrl })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.detail || 'RECORDING FAILED');
      
      // Success! Update the view
      setTape(data.tape);
      setIsEditing(false); 
      setPin(['', '', '', '']); // Clear the boxes
      setSpotifyUrl('');
    } catch (err) {
      setError(err.message);
    }
  };

  // --- RENDER SCREENS ---

  if (loading) return <div className="app-container" style={{textAlign: 'center', marginTop: '20%'}}>INITIALIZING...</div>;
  if (!tape) return <div className="app-container">ERROR 404: TAPE NOT FOUND</div>;

  return (
    <div className="app-container">
      
      {/* STICKY NAV (Kept from your original code) */}
      <nav className="sticky-nav">
        <div className="nav-container">
          <Link to="/">
            <img src="/hf-logo.svg" alt="Logo" className="nav-logo" style={{height: '30px'}} />
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">← back to collection</Link>
          </div>
        </div>
      </nav>

      {/* MAIN REDESIGN WRAPPER */}
      <div className="tape-deck-wrapper" style={{ marginTop: '80px' }}>
        
        {/* 1. THE HERO ARTWORK */}
        <div className="artwork-container">
          <img 
            src="/tape01-filler.png" 
            alt={`Tape ${id} Artwork`} 
            className="tape-artwork"
          />
          <h1 className="tape-title">
             {isEditing ? "RE-RECORDING" : "THIS IS"} TAPE {id.toString().padStart(3, '0')}
          </h1>
        </div>

        {/* 2. THE INTERFACE */}
        <div className="interface-container">
          
          {error && <div className="error-banner">{error}</div>}

          {(!tape.is_recorded || isEditing) ? (
            
            /* UNRECORDED / EDIT VIEW (Claim Screen) */
            <form className="brutalist-form" onSubmit={handleRecord}>
              <div className="form-group">
                <label>4-DIGIT SECURITY PIN</label>
                <div className="pin-pad">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      id={`pin-${index}`}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={digit}
                      onChange={(e) => handlePinChange(index, e.target.value)}
                      className="pin-box"
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>SPOTIFY PLAYLIST URL</label>
                <input 
                  type="url" 
                  placeholder="https://open.spotify.com/playlist/..."
                  value={spotifyUrl}
                  onChange={(e) => setSpotifyUrl(e.target.value)}
                  className="url-box"
                  required
                />
              </div>

              <button type="submit" className="action-button record-button">
                RECORD
              </button>
              
              {isEditing && (
                 <button 
                    type="button" 
                    className="action-button cancel-button" 
                    onClick={() => setIsEditing(false)}
                 >
                    CANCEL
                 </button>
              )}
            </form>

          ) : (

            /* RECORDED VIEW (Playback Screen) */
            <div className="playback-view">
              <div className="spotify-wrapper">
                <iframe 
                    src={getEmbedUrl(tape.playlist_url)} 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                    className="brutalist-iframe"
                ></iframe>
              </div>
              
              <button 
                className="action-button eject-button"
                onClick={() => setIsEditing(true)}
              >
                RE-RECORD
              </button>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}
