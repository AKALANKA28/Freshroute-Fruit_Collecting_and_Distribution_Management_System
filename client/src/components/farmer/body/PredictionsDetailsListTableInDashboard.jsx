import React from 'react';
import { Link } from 'react-router-dom';

const PredictionsDetailsListTableInDashboard = ({ items }) => {
    
    const displayedItems = items.slice(0, 10);

    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col' style={{ width: '5%' }}>#</th>
                        <th className="col" style={{ width: '15%' }}>Fruit</th>
                        <th className="col" style={{ width: '15%' }}>Sub Category</th>
                        <th className="col" style={{ width: '15%' }}>Quality</th>
                        <th className="col" style={{ width: '15%' }}>Quantity</th>
                        <th className="col" style={{ width: '15%' }}>Price of one</th>
                        <th className="col" style={{ width: '15%' }}>Date Can Be Given</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((prediction, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{prediction.fruit}</td>
                            <td>{prediction.subCategory}</td>
                            <td>{prediction.quality}</td>
                            <td>{prediction.quantity}</td>
                            <td>{prediction.price}</td>
                            <td>{prediction.dateCanBeGiven}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/PredictionDetails" className="btn btn-primary btn-sm">View More</Link>
            </div>
        </div>
    );
};

export default PredictionsDetailsListTableInDashboard;
