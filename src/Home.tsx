
import React, { useState } from 'react';
import ListMachine from './Listmachine'; // make sure the path is correct


const Home: React.FC = () => {
  return (
    <div>
    <div className="page-wrapper">
      <header>
        <h1>Home Page for Vite + React + TS Website App 2.0</h1>
        <h3>Learning FrontEnd Coding in 2025</h3>
        <h5>Front End Software Developer March-31st-2025</h5>
        <h5>Darin Sicurello darin.sicurello@gmail.com</h5>
      </header>

      <ListMachine />

      <footer>
        Darin Sicurello @2025
      </footer>
    </div>
  </div>
  );
};

export default Home;



