import React, { useState, useEffect } from 'react';
import rightArrow from '../assets/rightArrow.svg'; // Import the right arrow SVG
import warning from '../assets/error.svg'; // Ensure this path is correct
import '../Form.css'; // Import the CSS file

const Slide3: React.FC<{ nextSlide: () => void; incrementProgress: (amount: number) => void; decrementProgress: (amount: number) => void; setLastName: (name: string) => void }> = ({ nextSlide, incrementProgress, decrementProgress, setLastName }) => {
  const [lastName, setLastNameState] = useState('');
  const [lastNameTyped, setLastNameTyped] = useState(false);
  const [error, setError] = useState(''); // State to manage the error message
  const totalActions = 11; // Ensure this matches the total actions in FormContainer

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLastNameState(value);
    setLastName(value); // Update last name in parent state
    if (value.length > 0) {
      if (!lastNameTyped) {
        incrementProgress(100 / totalActions); // Increment progress if last name is typed for the first time
        setLastNameTyped(true);
      }
    } else {
      if (lastNameTyped) {
        decrementProgress(100 / totalActions); // Decrement progress if input is cleared
        setLastNameTyped(false);
      }
    }
    setError(value ? '' : 'Last name is required'); // Update error message based on input
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
  }, [lastName, nextSlide]);

  const handleSubmit = () => {
    if (lastName) {
      nextSlide();
    } else {
      setError('Please enter your last name.');
    }
  };

  return (
    <div className="form">
      <div className="question">
        <span className="number">2</span>
        <img src={rightArrow} className="arrow" alt="Right Arrow" />
        And your last name?
      </div>
      <div className="input-container">
        <input
          className="input"
          type="text"
          required
          placeholder="Over here again..."
          value={lastName}
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

export default Slide3;
