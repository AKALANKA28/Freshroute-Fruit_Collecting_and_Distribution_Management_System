import React from 'react';

function PageTitle({ page }) {
  // Get current date
  const currentDate = new Date();
  // Format date as "DayOfWeek, Day Month Year"
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  return (
    <div className='pagetitle'>
      <h1>Hello, Thusitha</h1>
      <p>Today is {formattedDate}</p>

      <h1>{page}</h1>
        <nav>
            <ol className="breadcumb">
                <li className="breadcumb-item">
                    <a href='/'>
                    </a>
                </li>
            </ol>
        </nav>
    </div>
  );
}

export default PageTitle;
