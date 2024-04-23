import React from 'react';

function PageTitle({ page }) {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <div className='pagetitle'>
      <h1>Hello, Heshan</h1>
      <p>Today is {formattedDate}</p>
    </div>
  );
}

export default PageTitle;