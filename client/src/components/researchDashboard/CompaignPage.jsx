// ./client/src/components/researchDashboard/CompaignPage.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Compaign from './body/Compaign/Compaign'; 
import Footer from './footer/Footer';

const CompaignPage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Compaign />
      <Footer />
    </div>
  );
};

export default CompaignPage;
