// ./client\src\components\researchDashboard\PromotionPage.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Promotion from './body/Promotions/Promotion'; 
import Footer from './footer/Footer';

const PromotionPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Promotion />
      <Footer />
    </div>
  );
};

export default PromotionPage;
