import React from 'react'

const SuppliersDetailsListTableInDashboard = ({items}) => {

    return (
        <div>
          <table className='table table-bordeless datatable'>
            <thead className="table-light">
                <tr>
                    {/* <th className="col"d>#</th> */}
                
                    <th className="col"d>NIC</th>
                    <th className="col"d>Username</th>
                    <th className="col"d>Name</th>
                    <th className="col"d>Email</th>
                    <th className="col"d>City </th>
                </tr>
            </thead>
            <tbody>
                {items &&
                 items.length > 0 &&
                 items.map(item => (
                    <tr key={item._id}>
                        <td>{item.NIC}</td>
                        <td>{item.username}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.city}</td>
                    </tr>
                 )) }
            </tbody>
          </table>
        </div>
      )
    };

export default SuppliersDetailsListTableInDashboard;