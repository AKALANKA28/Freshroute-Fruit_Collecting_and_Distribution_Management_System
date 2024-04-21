import React from 'react';
import { Link } from 'react-router-dom';

const QualityDetailsTableInDashboard = ({ items }) => {
    
    const displayedItems = items.slice(0, 4);

    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col' style={{ width: '5%' }}>#</th>
                        <th className="col" style={{ width: '15%' }}>Fruit</th>
                        <th className="col" style={{ width: '15%' }}>Category</th>
                        <th className="col" style={{ width: '15%' }}>Quality</th>
                        <th className="col" style={{ width: '15%' }}>Quality Description</th>
                        <th className="col" style={{ width: '15%' }}>Storage Conditions</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((quality, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{quality.fruit}</td>
                            <td>{quality.category}</td>
                            <td>{quality.quality}</td>
                            <td>{quality.qualityDesc}</td>
                            <td>{quality.storageCond}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/QualityList" className="btn btn-primary btn-sm">View More</Link>
            </div>
        </div>
    );
};

export default QualityDetailsTableInDashboard;
