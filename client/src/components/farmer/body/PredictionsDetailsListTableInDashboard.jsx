import React from 'react';
import { Link } from 'react-router-dom';

const PredictionsDetailsListTableInDashboard = ({ items }) => {
    
    const displayedItems = items.slice(0, 10);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return '#60f775';
            case 'Declined':
                return '#f25b50';
            case 'pending':
                return '#e6e663';
            default:
                return '';
        }
    };

    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col' style={{ width: '5%' }}>#</th>
                        <th className="col" style={{ width: '15%' }}>Fruit</th>
                        <th className="col" style={{ width: '15%' }}>Sub Category</th>
                        <th className="col" style={{ width: '10%' }}>Quality</th>
                        <th className="col" style={{ width: '15%' }}>Quantity</th>
                        <th className="col" style={{ width: '15%' }}>Price of 1kg</th>
                        <th className="col" style={{ width: '15%' }}>Date Can Be Given</th>
                        <th className="col" style={{ width: '15%' }}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((prediction, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{prediction.fruit}</td>
                            <td>{prediction.subCategory}</td>
                            <td>{prediction.quality}</td>
                            <td>{prediction.quantity} kg</td>
                            <td>Rs. {prediction.price}</td>
                            <td>{prediction.dateCanBeGiven}</td>
                            <td>
                                <div style={{ backgroundColor: getStatusColor(prediction.status), width: '75px', height: '20px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'black' }}>
                                    {prediction.status}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/PredictionDetails" className="btn btn-primary btn-sm">View All</Link>
            </div>
        </div>
    );
};

export default PredictionsDetailsListTableInDashboard;
