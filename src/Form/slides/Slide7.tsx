import React, { useEffect, useState } from 'react';
import enterIcon from '../assets/enter.svg'; // Import the SVG icon
import '../Form.css'; // Import the CSS file

const Slide7: React.FC<{ nextSlide: () => void }> = ({ nextSlide }) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !isKeyPressed) {
        setIsKeyPressed(true);
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isKeyPressed, nextSlide]);

  const handleClick = () => {
    setIsKeyPressed(true);
    nextSlide();
  };

  return (
    <div className="form">
      <div className="statement">We're so greatful for your support.</div>
      <div className="statement">Thank you</div>
      <button className="button" onClick={handleClick}>Exit</button>

    </div>
  );
};

export default Slide7;
