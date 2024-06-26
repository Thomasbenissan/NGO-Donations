import React, { useState } from 'react';
import Slide1 from './slides/Slide1';
import Slide2 from './slides/Slide2';
import Slide3 from './slides/Slide3';
import Slide4 from './slides/Slide4';
import Slide5 from './slides/Slide5';
import Slide6 from './slides/Slide6';
import Slide7 from './slides/Slide7';
import bg from './assets/bg.png';
import logo from './assets/logo.png';
import exit from './assets/exit.svg';
import leftArrow from './assets/leftArrow.svg';
import './Form.css';

const FormContainer: React.FC<{ onHide: () => void }> = ({ onHide }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [progress, setProgress] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [animation, setAnimation] = useState('fadeInUp');
  const [nameTyped, setNameTyped] = useState(false);
  const totalActions = 11;

  const incrementProgress = (amount: number) => {
    setProgress(prev => Math.min(prev + amount, 100));
  };

  const decrementProgress = (amount: number) => {
    setProgress(prev => Math.max(prev - amount, 0));
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setAnimation('fadeOutUp');
      setTimeout(() => {
        setCurrentSlide(currentSlide + 1);
        setAnimation('fadeInUp');
        incrementProgress(100 / totalActions);
      }, 500);
    } else {
      setTimeout(onHide);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      decrementProgress(100/totalActions)
      setAnimation('fadeOutUp');
      setTimeout(() => {
        setCurrentSlide(currentSlide - 1);
        setAnimation('fadeInUp');
      }, 500);
    }
  };

  const handleExitClick = () => {
    setTimeout(onHide);
  };

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const handleNameChange = (name: string) => {
    setName(name);
    if (name.length > 0 && !nameTyped) {
      incrementProgress(100 / totalActions);
      setNameTyped(true);
    } else if (name.length === 0 && nameTyped) {
      decrementProgress(100 / totalActions);
      setNameTyped(false);
    }
  };

  const handleLastNameChange = (lastName: string) => {
    setLastName(lastName);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    incrementProgress(100 / totalActions);
  };

  const slides = [
    <Slide1 nextSlide={nextSlide} />,
    <Slide2 nextSlide={nextSlide} onNameChange={handleNameChange} />,
    <Slide3 nextSlide={nextSlide} incrementProgress={incrementProgress} decrementProgress={decrementProgress} setLastName={handleLastNameChange} />,
    <Slide4 nextSlide={nextSlide} name={name} incrementProgress={incrementProgress} onAmountSelect={handleAmountSelect} />,
    <Slide5 nextSlide={nextSlide} amount={selectedAmount || 0} />,
    <Slide6 nextSlide={nextSlide} firstName={name} incrementProgress={incrementProgress} />,
    <Slide7 nextSlide={nextSlide} />
  ];

  return (
    <div className="overlay" onClick={handleExitClick}>
      <div className="form-container" onClick={handleContainerClick} style={{ backgroundImage: `url(${bg})` }}>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <div className='logo-container'>
          <img src={leftArrow} alt="Back Arrow" className='backArrow' onClick={prevSlide} style={{ position: 'absolute', top: '50px', left: '20px', width: '30px' }} />
          <img src={logo} alt="Logo" id='logo' style={{ position: 'absolute', top: '40px', left: '60px', width: '125px' }} />
          <img src={exit} alt="exit" onClick={handleExitClick} className='exit'  style={{ position: 'absolute', top: '50px', right: '30px', width: '30px'}} />
        </div>
        <div className={`form ${animation}`}>
          {slides[currentSlide]}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
