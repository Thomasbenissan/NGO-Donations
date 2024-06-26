import React, { useState, useEffect } from 'react';
import './App.css';
import FormContainer from './Form/FormContainer';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) setShouldRender(true);
  }, [isVisible]);

  const showPopup = () => {
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
    }, 500); // Matches the transition time
  };

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isVisible]);

  return (
    <div className="App">
      <button onClick={showPopup} className="donate-button" style={{ opacity: isVisible ? 0 : 1, transition: 'opacity 0.5s' }}>Support GrowNYC</button>
      {shouldRender && (
        <div style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'block'
        }}>
          <FormContainer onHide={hidePopup} />
        </div>
      )}
    </div>
  );
}

export default App;
