// ./client/src/components/Coordinator/FruitType.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import FruitType from './body/FruitType/FruitType'; 
import Footer from './footer/Footer';

const Coordinator = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <FruitType />
      <Footer />
    </div>
  );
};

export default Coordinator;
