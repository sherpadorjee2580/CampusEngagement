import React, { useState, useEffect } from 'react';
import './webwelcome.css';

const WebWelcome = ({ onTimeout }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onTimeout) {
        onTimeout();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onTimeout]); 

  if (!isVisible) {
    return null;
  }

  return (
    <div className="webwelcome">
      <div className="webwelcome-container">
        <div className="webwelcome-logo">
          <img src={"logo.png"} alt="Logo" />
        </div>
        <p className="webwelcome-subtitle">Connecting Campus Communities, One</p>
        <p className="webwelcome-subtitle">Click at a Time.</p>
      </div>
    </div>
  );
};

export default WebWelcome;