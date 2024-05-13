import React, { useState, useEffect } from 'react';
import axios from "axios";
import SupplyDetailsPieChart from './SupplyDetailsPieChart';

const SupplyDetails = () => {
    const [pendingSuppliesData, setPendingSupplyData] = useState([]);
    const [approvedSuppliesData, setApprovedSupplyData] = useState([]);
    const [declinedSuppliesData, setDeclinedSupplyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pendingResponse = await axios.get("/pendingSupply/");
                const approvedResponse = await axios.get("/acceptedSupply/");
                const declinedResponse = await axios.get("/declinedSupply/");

                setPendingSupplyData(pendingResponse.data);
                setApprovedSupplyData(approvedResponse.data);
                setDeclinedSupplyData(declinedResponse.data);
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
                        Supply Requests Details
                    </h5>
                    <SupplyDetailsPieChart
                        pendingSuppliesData={pendingSuppliesData}
                        approvedSuppliesData={approvedSuppliesData}
                        declinedSuppliesData={declinedSuppliesData}
                    />
                </div>
            </div>
        </div>
    );
};

export default SupplyDetails;
