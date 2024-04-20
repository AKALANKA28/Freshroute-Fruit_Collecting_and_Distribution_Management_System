// ./client/src/components/Coordinator/Category.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Category from './body/Category/Category'; 
import Footer from './footer/Footer';

const Coordinator = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Category />
      <Footer />
    </div>
  );
};

export default Coordinator;
