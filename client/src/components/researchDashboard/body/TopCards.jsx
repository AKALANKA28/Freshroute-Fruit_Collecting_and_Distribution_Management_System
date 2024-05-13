import React, { useEffect, useState } from 'react'
import CardFilter from './CardFilter'
import avatar1 from './photo/TopFarmer.png'
import avatar2 from './photo/Buyers.png'
import avatar3 from './photo/Aud.png'
import avatar4 from './photo/camp.png'
import avatar5 from './photo/Res.png'
import avatar6 from './photo/Apply.png'

const TopCards = () => {
    const [totalSalesAmount, setTotalSalesAmount] = useState(0);
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);


    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

    const [sales, setSales] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [revenue, setRevenue] = useState([]);

    const fetchSales = () => {
        fetch("http://localhost:8070/sales/")
            .then(res => res.json())
            .then(data => {
                // Calculate total amount
                const sum = data.reduce((total, sale) => total + sale.amount, 0);
                setTotalSalesAmount(sum);
            })
            .catch(error => console.error('Error fetching sales data:', error));
    };

    const fetchExpenses = () => {
        fetch("http://localhost:8070/expense/")
            .then(res => res.json())
            .then(data => {
                // Calculate total amount
                const sum = data.reduce((total, expense) => total + expense.amount, 0);
                setTotalExpenseAmount(sum);
            })
            .catch(error => console.error('Error fetching expenses data:', error));
    };

    const fetchRevenue = () => {
        fetch("http://localhost:8070/revenue/")
            .then(res => res.json())
            .then(data => {
                setRevenue(data);
            })
            .catch(error => console.error('Error fetching revenue data:', error));
    };

    useEffect(() => {
        fetchSales();
        fetchExpenses();
        fetchRevenue();
    }, []);
    
  return (
    <div>
      <div className="col-12">
        <div className="row">
        <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Top Farmers<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar1} alt="Top Farmers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>

                </div>
            </div>
        </div> 

        <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                    Total Buyers<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar2} alt="Total Buyers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>
                </div>
            </div>
        </div> 

        <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Target Audience<span> | {filter} </span>
                    </h5>
                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar3} alt="Total Buyers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>
                </div>
            </div>
        </div>  
        <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Campaign <span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar4} alt="Top Farmers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>

                </div>
            </div>
        </div>
        <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Accessing Resources<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar5} alt="Top Farmers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>

                </div>
            </div>
        </div>
        <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Apply For Resources<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        {/* Display the image with the 'rounded-circle' class */}
        <img src={avatar6} alt="Top Farmers" className="rounded-circle" style={{ width: '100%', height: '100%' }} />
    </div>
</div>

                </div>
            </div>
        </div> 
        </div>
      </div>
    </div>
    
  )
}

export default TopCards
