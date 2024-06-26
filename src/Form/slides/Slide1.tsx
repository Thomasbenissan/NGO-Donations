import React, { useEffect, useState } from 'react';
import enterIcon from '../assets/enter.svg'; // Import the SVG icon
import '../Form.css'; // Import the CSS file

const Slide1: React.FC<{ nextSlide: () => void }> = ({ nextSlide }) => {
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
      <div className="statement">Your generosity is what keeps us going.</div>
      <div className="answer">
        <span className="text invs">
          press <span className="bold">Enter</span>
        </span>
        <img src={enterIcon} width="20px" height="20px" alt="Enter icon" className='enterArrow invs'/>
        <button className="button" onClick={handleClick}>Donate now</button>
        <span className="text" onClick={handleClick}>
          press <span className="bold">Enter</span>
        </span>
        <img src={enterIcon} width="20px" height="20px" alt="Enter icon" className='enterArrow'/>
      </div>
    </div>
  );
};

export default Slide1;
