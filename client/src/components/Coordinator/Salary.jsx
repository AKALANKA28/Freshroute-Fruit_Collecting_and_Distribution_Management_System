// ./client/src/components/Coordinator/Salary.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Salary from './body/Salary/Salary'; 
import Footer from './footer/Footer';

const Coordinator = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Salary />
      <Footer />
    </div>
  );
};

export default Coordinator;
