import React, { useEffect, useState } from 'react';
import CardFilter from './CardFilter';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8070/";
const TopCards = () => {
    
    const [fruitCount, setFruitCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);
    const [filter, setFilter] = useState('Today');

    const handleFilterChange = filter => {
        setFilter(filter);
    };

    


    const fetchFruitCount = () => {
        fetch("http://localhost:8070/fruittype/")
            .then(res => res.json())
            .then(data => {
                
                
                const count = data.length;
                setFruitCount(count);
            })
            .catch(error => console.error('Error fetching fruit data:', error));
    };

    const fetchCategoryCount = () => {
        fetch("http://localhost:8070/category/")
            .then(res => res.json())
            .then(data => {
                // Filter categories where price is null
                const filteredCategories = data.filter(category => category.qualityStatus === 0);
                
                // Get the count of filtered categories
                const count = filteredCategories.length;
                setCategoryCount(count);
            })
            .catch(error => console.error('Error fetching category data:', error));
    };
    

    const fetchVehileCount = () => {
        fetch("http://localhost:8070/transportfee/")
            .then(res => res.json())
            .then(data => {
                
                
                const count = data.length;
                setVehicleCount(count);
            })
            .catch(error => console.error('Error fetching category data:', error));
    };
    


    useEffect(() => {
        
        fetchFruitCount();
        fetchCategoryCount();
        fetchVehileCount();
  }, []);


    return (
        <div>
            <div className="col-12">
                <div className="row">
                    {/* Salary count card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                        <a href="/FruitType" className="text-decoration-none">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Total Fruit Types
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className= "bi bi-bucket"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                             {fruitCount} Fruits
                                        </h6>
                                        
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>

                    {/* Expense card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                        <a href="/Category" className="text-decoration-none">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                Category Without Quliality 
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-bucket"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                        {categoryCount} Fruits 
                                        </h6>
                                        
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>

                    {/* Employee card */}
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
                        <a href="/TransportFee" className="text-decoration-none">
                            <CardFilter filterChange={handleFilterChange} />
                            <div className="card-body">
                                <h5 className="card-title">
                                     Total Vehicles  
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-truck"></i>
                                    </div>
                                    <div className="ps-3">
                                        <h6 className='card-price'>
                                        {vehicleCount} Vehicles
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopCards;
