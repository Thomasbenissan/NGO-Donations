import React, { useState, useEffect } from 'react';
import rightArrow from '../assets/rightArrow.svg'; // Import the right arrow SVG
import warning from '../assets/error.svg'; // Import the warning icon
import '../Form.css'; // Import the CSS file

const Slide2: React.FC<{ nextSlide: () => void, onNameChange: (name: string) => void }> = ({ nextSlide, onNameChange }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(''); // State to store the error message

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value.trim()) setError(''); // Clear error if input is not empty
    onNameChange(event.target.value); // Call onNameChange on each input change
  };

  const handleSubmit = () => {
    if (!name.trim()) { // Check if 'name' is empty or only whitespace
      setError('Please enter your first name.'); // Set error message
    } else {
      nextSlide();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [name, nextSlide]);

  return (
    <div className="form">
      <div className="question">
        <span className="number">1</span>
        <img src={rightArrow} className="arrow" alt="Right Arrow" />
        Hi there, supporter. What's your first name?*
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          placeholder="And your name is..."
          required
          value={name}
          onChange={handleChange}
        />
        {error && (
          <div className="error-message" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={warning} alt="Warning" style={{ width: '20px', height: '20px', marginRight: '5px'}} />
            {error}
          </div>
        
        )}
        <button className="ok-button" onClick={handleSubmit}>OK</button>
      </div>
    </div>
  );
};

export default Slide2;
