// ./client\src\components\researchDashboard\PromotionPage.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import AccResourceForm from './body/AccResource/ResourceAccessForm'; 
import Footer from './footer/Footer';

const AccResourcePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <AccResourceForm />
      <Footer />
    </div>
  );
};

export default AccResourcePage;
