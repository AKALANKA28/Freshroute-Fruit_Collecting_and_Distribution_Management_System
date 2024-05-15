import React, { useEffect, useState } from 'react';
import CardFilter from './CardFilter';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8070/";
const TopCards = () => {
    const [totalNetSalary, setTotalNetSalary] = useState(0);
    const [totalCandidatesCount, setTotalCandidatesCount] = useState(0);
    const [totalEmployeeCount, setTotalEmployeeCount] = useState(0); // New state for employee count
    const [filter, setFilter] = useState('Today');

    const handleFilterChange = filter => {
        setFilter(filter);
    };

    

   
    
    const fetchNetSalaryTotal = () => {
        fetch("http://localhost:8070/employee/")
            .then(res => res.json())
            .then(data => {
                // Calculate total amount
                const sum = data.reduce((total, employee) => total + employee.netsalary, 0);
                setTotalNetSalary(sum);
            })
            .catch(error => console.error('Error fetching expenses data:', error));
    };

    

    const fetchEmployeeCount = async () => {
        try {
            const response = await axios.get("/Employee/empcount");
            if (response && response.data) {
                setTotalEmployeeCount(response.data.count);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    
    

    const fetchCandidatesCount = async () => {
        try {
            const response = await axios.get("/Unregistered/count");
            if (response && response.data) {
                setTotalCandidatesCount(response.data.count);
            }
        } catch (err) {
            alert(err.message);
        }
    };
    
    const formattedNetSalary = totalNetSalary.toLocaleString();
    useEffect(() => {
        fetchNetSalaryTotal();
        fetchCandidatesCount();
        fetchEmployeeCount(); // Call the fetch function for employee count
    // const intervalId = setInterval(fetchEmployeeCount, 5000); // Poll every 5 seconds
    // return () => clearInterval(intervalId);
  }, []);


    return (
        <div>
            <div className="col-12">
                <div className="row">
                    {/* Salary count card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Total Salary Count
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className= "bi bi-cash"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                        Rs.{formattedNetSalary}
                                        </h6>
                                        <span className= 'text-success small pt-1 fw-bold'> 5%</span>
                                        <span className="text-muted small pt-2 ps-1"> increase</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expense card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                     Candidates<span> | {filter} </span>
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                        Total : {totalCandidatesCount} 
                                        </h6>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employee card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                     Employees <span> | {filter} </span>
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-people"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                        Total : {totalEmployeeCount} 
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopCards;
