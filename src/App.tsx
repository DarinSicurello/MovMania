// App.tsx
import React from 'react';
import './styles.css';

const App: React.FC = () => {
  return (
    // Main wrapper div
    <div className="page-wrapper">
      <header>
        <h1>Vite + React + TS Website App 2.0</h1>
        <h3>Learning FrontEnd Coding in 2025</h3>
        <h5>Front End Software Developer March-31st-2025</h5>
        <h5>Darin Sicurello darin.sicurello@gmail.com</h5>
      </header>

      <div className="main-con">
        <div className="left-section">
          <h2>My List Machine</h2>
          {/* Input for new item */}
          <label htmlFor="user-input">New Item:</label>
          <input type="text" id="user-input" name="user-input" placeholder="Apples.." />
          <button>Submit New Item</button>
        </div>

        <div className="right-section">
          <h2>My App</h2>
          <div className="item-container">
            <div className="item-box">Item 1</div>
            <div className="item-box">Item 2</div>
            <div className="item-box">Item 3</div>
            <div className="item-box">Item 4</div>
          </div>
        </div>
      </div>

      <footer>
        Darin Sicurello @2025
      </footer>
    </div>
  );
};

export default App;
