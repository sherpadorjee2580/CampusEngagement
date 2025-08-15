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
    }, 3000);

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
        <p className="webwelcome-subtitle">Beyond the Classroom, a Connected Community</p>
        {/* <p className="webwelcome-subtitle">and Social Campus Life</p> */}
      </div>
    </div>
  );
};

export default WebWelcome;