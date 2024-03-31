import React, { useEffect } from 'react';
import ElfSightWeatherWidget from './ElfSightWeatherWidget';

const BudgetChart = () => {
  useEffect(() => {
    // Run any necessary code after the component mounts
    // For example, you might want to fetch data or perform other initialization tasks
  }, []);

  return (
    <div>
      <h1></h1>
      {/* Add the ElfSight weather widget component here */}
      <ElfSightWeatherWidget />
    </div>
  );
};

export default BudgetChart;