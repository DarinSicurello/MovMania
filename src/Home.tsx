
import React, { useState } from 'react';
import MovieReview from './MovieReview';// make sure the path is correct


const Home: React.FC = () => {
  return (
    <div>
    <div className="page-wrapper">
      <header>
        
      </header>

      <MovieReview />

      <footer>
        Darin Sicurello @2025
      </footer>
    </div>
  </div>
  );
};

export default Home;



