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
                        Income<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= "bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                        <h6 className='card-price'>
                                Rs. {totalSalesAmount.toLocaleString('en-US')}
                        </h6>

                            {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                            <span className= 'text-danger small pt-1 fw-bold'> -2%   
                                {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                                                           
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                                decrease
                                {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                            </span>
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
                    Expense<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= ""></i>
                        </div>
                        <div className="ps-3">
                        <h6 className='card-price'>
                                Rs. {totalExpenseAmount.toLocaleString('en-US')}
                        </h6>
                            {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                            <span className= 'text-success small pt-1 fw-bold'> 5%   
                                {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                                                           
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                                increase
                                {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                            </span>
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
                        Revenue<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= ""></i>
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