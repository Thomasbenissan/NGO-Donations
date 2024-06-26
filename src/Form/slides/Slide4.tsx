import React, { useEffect, useState } from 'react';
import rightArrow from '../assets/rightArrow.svg'; // Import the right arrow SVG
import '../Form.css'; // Import the CSS file


const Slide4: React.FC<{ nextSlide: () => void, name: string, incrementProgress: (amount: number) => void, onAmountSelect: (amount: number) => void }> = ({ nextSlide, name, incrementProgress, onAmountSelect }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | string>(''); // Ensure customAmount is always a string or number
  const [progressUpdated, setProgressUpdated] = useState(false); // Track if progress has been updated
  const amounts = [25, 50, 100, 250, 500];
  const totalActions = 11; // Ensure this matches the total actions in FormContainer

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(''); // Clear custom amount input when a predefined amount is selected
    if (!progressUpdated) {
      incrementProgress(100 / totalActions); // Increment progress when a button is clicked
      setProgressUpdated(true); // Mark progress as updated
      onAmountSelect(amount); // Notify parent component of the selected amount
    }
  };

  const handleCustomAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = event.target.value;
    setCustomAmount(amount);
    setSelectedAmount(null); // Deselect other buttons
    if (!progressUpdated && amount) {
      incrementProgress(100 / totalActions); // Increment progress when a custom amount is entered
      setProgressUpdated(true); // Mark progress as updated
      onAmountSelect(Number(amount)); // Notify parent component of the selected amount
    }
  };

  const handleSubmit = () => {
    if (selectedAmount !== null || customAmount) {
      nextSlide();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (selectedAmount !== null || customAmount)) {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedAmount, customAmount, nextSlide]);



  return (
    <div className="form">
      <div className="question slide4">
        <span className="number slide4">3</span>
        <img src={rightArrow} className="arrow" alt="Right Arrow" />
        We're very grateful you're here to donate, {name}. How much are you willing to give today?
      </div>
      <div className="description slide4">in $USD</div>
      <div className="multiple-choice">
        {amounts.map(amount => (
          <button
            key={amount}
            className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
            onClick={() => handleAmountClick(amount)}
          >
            {amount}
          </button>
        ))}
        <input
          className="amount-button custom-amount-input"
          type="text"
          placeholder="Other"
          value={customAmount}
          onChange={handleCustomAmountChange}
        />
      </div>
      <button className="ok-button" onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default Slide4;
