// ./client/src/components/researchDashboard/CompaignPage.jsx
import React from 'react';
import Header from './header/header';
import Sidebar from './sidebar/Sidebar';
import Resource from './body/Resource/Resource'; 
import Footer from './footer/Footer';

const ResourcePage = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <Resource />
      <Footer />
    </div>
  );
};

export default ResourcePage;
