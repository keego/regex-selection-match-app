import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HighlightBoxes } from './components/highlight-boxes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HighlightBoxes />
      </header>
    </div>
  );
}

export default App;
