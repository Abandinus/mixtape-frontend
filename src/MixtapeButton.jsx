import React from 'react';

const MixtapeButton = ({ type, onClick, isRecording }) => {
  // Common background and frame used by all buttons
  const ButtonFrame = () => (
    <g>
      <rect x="1.4" y="1.3" width="56.4" height="81.6" rx="7.4" ry="7.4" fill="#e6e7e8"/>
      <path d="M50.3,84.1H8.8c-4.8,0-8.7-3.9-8.7-8.7V8.7C0,3.9,4,0,8.8,0h41.5c4.8,0,8.7,3.9,8.7,8.7v66.7c0,4.8-3.9,8.7-8.7,8.7ZM8.8,2.6c-3.4,0-6.1,2.8-6.1,6.1v66.7c0,3.4,2.8,6.1,6.1,6.1h41.5c3.4,0,6.1-2.8,6.1-6.1V8.7c0-3.4-2.8-6.1-6.1-6.1H8.8Z" fill="#e6e7e7"/>
    </g>
  );

  const renderIcon = () => {
    switch (type) {
      case 'record':
        return (
          <>
            <path d="M29.7,9h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
            <circle cx="29.7" cy="41.4" r="10.7" fill="#ec1c24" stroke="#231f20" strokeWidth="1.7" className={isRecording ? 'recording-pulse' : ''} />
          </>
        );
      case 'rewind':
        return (
          <>
            <polygon points="40.9 52.7 40.9 31.4 30.5 41.8 40.9 52.7" fill="#231f20"/>
            <polygon points="28.6 52.7 28.6 31.4 18.2 41.8 28.6 52.7" fill="#231f20"/>
            <path d="M30.5,9.6h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
          </>
        );
      case 'play':
        return (
          <>
            <polygon points="23.9 31.4 23.9 52.7 39.3 42.1 23.9 31.4" fill="#231f20"/>
            <path d="M29.6,9.6h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
          </>
        );
      case 'ffwd':
        return (
          <>
            <polygon points="18.2 52.7 18.2 31.4 28.6 41.8 18.2 52.7" fill="#231f20"/>
            <polygon points="30.5 52.7 30.5 31.4 40.9 41.8 30.5 52.7" fill="#231f20"/>
            <path d="M28.6,9.6h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
          </>
        );
      case 'stop':
        return (
          <>
            <rect x="18.8" y="31.4" width="21.4" height="21.4" fill="#231f20"/>
            <path d="M29.6,9.6h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
          </>
        );
      case 'eject':
        return (
          <>
            <path d="M29.6,9.6h0c12.2,0,22,9.8,22,22v20.9c0,12.2-9.8,22-22,22h0c-12.2,0-22-9.8-22-22v-20.9c0-12.2,9.8-22,22-22Z" fill="none" stroke="#231f20" strokeWidth="1.7"/>
            <g>
              <path d="M20.8,48.2c-.4,0-.7.3-.7.7v3.3c0,.4.3.7.7.7h17.5c.4,0,.7-.3.7-.7v-3.3c0-.4-.3-.7-.7-.7h-17.5Z" fill="#231f20"/>
              <path d="M29.2,31.6l-9,13.8v.4c0,0,.2.2.4.2h18c.2,0,.3,0,.4-.2v-.4l-9-13.8c0-.1-.2-.2-.4-.2s-.3,0-.4.2Z" fill="#231f20"/>
            </g>
          </>
        );
      default: return null;
    }
  };

  return (
    <button onClick={onClick} className="mechanical-btn">
      <svg viewBox="0 0 59.1 84.1" xmlns="http://www.w3.org/2000/svg">
        <ButtonFrame />
        {renderIcon()}
      </svg>
    </button>
  );
};

export default MixtapeButton;