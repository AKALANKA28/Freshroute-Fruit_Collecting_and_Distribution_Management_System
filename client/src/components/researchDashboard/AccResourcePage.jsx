// ./client\src\components\researchDashboard\PromotionPage.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import AccResource from './body/AccResource/AccResource'; 
import Footer from './footer/Footer';

const AccResourcePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <AccResource />
      <Footer />
    </div>
  );
};

export default AccResourcePage;
