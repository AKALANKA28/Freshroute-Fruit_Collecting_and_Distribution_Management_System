import React from 'react';

const SuppliersDetailsListTableInDashboard = ({ items }) => {
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
                    {items.map((farmer, index) => (
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
        </div>
    );
};

export default SuppliersDetailsListTableInDashboard;