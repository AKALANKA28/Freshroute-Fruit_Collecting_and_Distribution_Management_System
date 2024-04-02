import React from 'react';
import { Link } from 'react-router-dom';

const SuppliersDetailsListTableInDashboard = ({ items }) => {
    
    const displayedItems = items.slice(0, 4);

    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col'>#</th>
                        <th className="col"d>NIC</th>
                        <th className="col"d>Username</th>
                        <th className="col"d>Name</th>
                        <th className="col"d>Email</th>
                        <th className="col"d>City</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((farmer, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{farmer.NIC}</td>
                            <td>{farmer.username}</td>
                            <td>{farmer.name}</td>
                            <td>{farmer.email}</td>
                            <td>{farmer.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/SupplierDetails" className="btn btn-primary btn-sm">View More</Link>
            </div>
        </div>
    );
};

export default SuppliersDetailsListTableInDashboard;
