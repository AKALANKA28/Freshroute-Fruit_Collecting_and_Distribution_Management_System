import React from 'react';

const PredictionsDetailsListTableInDashboard = ({ items }) => {
    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th className="col"d>Fruit Type</th>
                        <th className="col"d>Quality</th>
                        <th className="col"d>Quantity</th>
                        <th className="col"d>Price of one</th>
                        <th className="col"d>Date Can Be Given</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((prediction, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{prediction.fruitType}</td>
                            <td>{prediction.quality}</td>
                            <td>{prediction.quantity}</td>
                            <td>{prediction.price}</td>
                            <td>{prediction.dateCanBeGiven}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PredictionsDetailsListTableInDashboard;