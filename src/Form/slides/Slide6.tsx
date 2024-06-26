import React, { useState, useEffect } from 'react';
import rightArrow from '../assets/rightArrow.svg';
import warning from '../assets/error.svg';
import '../Form.css';

const Slide6: React.FC<{ nextSlide: () => void, firstName: string, incrementProgress: (amount: number) => void }> = ({ nextSlide, firstName, incrementProgress }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [emailTyped, setEmailTyped] = useState(false);
  const totalActions = 11; // Adjust total actions based on your form steps

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (!emailTyped && event.target.value) {
      incrementProgress(100 / totalActions);
      setEmailTyped(true);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
      setError('Please enter a valid email address.');
    } else {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!error) {
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
  }, [email, error, nextSlide]);

  return (
    <div className="form">
      <div className="question">
        <span className="number">4</span>
        <img src={rightArrow} className="arrow" alt="Right Arrow" />
        Thank you so much {firstName}, we'll send you the receipt by email. What email address should we use?
      </div>
      <div className="input-container">
        <input
          className="input"
          type="email"
          required
          placeholder="name@example.com"
          value={email}
          onChange={handleChange}
        />
        {error && (
          <div className="error-message" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={warning} alt="Warning" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
            {error}
          </div>
        )}
        <button className="ok-button" onClick={handleSubmit} disabled={!email || !!error}>OK</button>
      </div>
    </div>
  );
};

export default Slide6;
