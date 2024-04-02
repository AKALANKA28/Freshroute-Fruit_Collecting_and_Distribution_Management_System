import React, { useState, useEffect } from 'react';
import axios from "axios";
import FruitDetailsChart from './FruitDetailsChart';

const FruitDetails = () => {
    const [predictionData, setPredictionData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/Prediction/");
                setPredictionData(response.data);
            } catch (err) {
                alert(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <div className='card'>
                <div className="card-body pb-0">
                    <h5 className="card-title">
                        Sold Fruits Details
                    </h5>
                    <FruitDetailsChart predictionData={predictionData} />
                </div>
            </div>
        </div>
    );
};

export default FruitDetails;
