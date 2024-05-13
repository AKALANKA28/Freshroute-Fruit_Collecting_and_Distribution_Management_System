import React, { useEffect, useState } from 'react'
import CardFilter from './CardFilter'

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
                        Revenue<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
        <i className="bi bi-graph-up-arrow"></i> {/* Example icon */}
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
                    Volume<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= "bi bi-clipboard-pulse"></i>
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
                        Price<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center justify-content-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= "bi bi-bar-chart"></i>
                        </div>
                        <div className="ps-3">
                            {/* <h6 className='card-price'>
                                {card.name === 'Revenue' || 'Sales'
                                ? 'Rs. ' + card.amount.toLocaleString('en-US')
                                : card.amount.toLocaleString('en-US')}
                            </h6> */}
                            {/* <span className= {`${
                                card.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`}
                            >
                                {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                %
                                
                            </span> */}
                            {/* <span className="text-muted small pt-2 ps-1">
                                {card.percentage > 0 ? 'increase' : 'decrease'}
                            </span> */}
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
