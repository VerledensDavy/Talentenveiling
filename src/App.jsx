import React from 'react';
import './App.css';
import BiddingPlatform from './components/BiddingPlatform.jsx';  // Zorg ervoor dat het pad klopt

function App() {
  return (
    <div className="App">
      <header>
        <h1>Talentenveiling VBS De Watermolen</h1>
      </header>
      <BiddingPlatform />
    </div>
  );
}

export default App;
