import React from 'react';

const RecorderInterface = ({ tapeId, spotifyUrl, isRecorded }) => {
  return (
    <div className="recorder-container">
      
      {/* LAYER 1: THE SPOTIFY PLAYER (BEHIND) */}
      <div className="spotify-window">
        {isRecorded ? (
          <iframe 
            src={spotifyUrl.replace("spotify.com/", "spotify.com/embed/")} 
            allow="encrypted-media"
          ></iframe>
        ) : (
          <div className="blank-tape-placeholder">
             {/* You can put your spinning reels animation here! */}
             <p style={{color: 'white'}}>READY TO RECORD</p>
          </div>
        )}
      </div>

      {/* LAYER 2: THE SVG BODY (THE FRAME) */}
      <svg className="recorder-svg-body" viewBox="0 0 444.4 818.8" xmlns="http://www.w3.org/2000/svg">
        {/* I've omitted the 200 lines of polygon code for brevity, 
            but you will paste your FULL SVG path/polygon code here */}
        <path d="M433.4,7.6h-22.3V0h-9.7l-7.6,7.6H58.5l-7.6-7.6h-9.7v7.6H11C4.9,7.6,0,12.6,0,18.6v780.5..." fill="#231f20"/>
        {/* ... paste all the <rect>, <polygon>, and <g> tags here ... */}
      </svg>

      {/* Inside Layer 3: INTERACTIVE OVERLAYS */}
        <div className="recorder-controls">
        {/* The Record Button */}
        <div style={{ position: 'absolute', left: '10.5%', top: '0' }}>
            <RecordButton 
                isRecording={isRecorded} 
                onClick={() => {/* Trigger your existing record modal or logic */}} 
            />
        </div>
  
        {/* You can add the other buttons (Play, Stop, etc.) here later */}
</div>
      
    </div>
  );
};

export default RecorderInterface;