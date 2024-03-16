import React from 'react'


const SuppliersTable = ({farmers}) => {
    const handleStatus = status => {
    switch (status) {
        case 'Approved':
            return 'success';
            break;
        case 'Warning':
            return 'warning';
            break;
         case 'Rejected':
            return 'danger';
            break;
         default:
            return 'success';    
    }   
    };

  return (
    <div>
      <table className='table table-bordeless datatable'>
        <thead className="table-light">
            <tr>
                <th className="col"d>#</th>
                <th className="col"d>NIC</th>
                <th className="col"d>Username</th>
                <th className="col"d>Farmer Name</th>
                <th className="col"d>Email</th>
                <th className="col"d>City</th>
                <th className="col"d>Lane</th>
                <th className="col"d>Fruits</th>
                <th className="col"d>Actions</th>
            </tr>
        </thead>
        <tbody>
            {farmers &&
             farmers.length > 0 &&
             farmers.map(farmers => (
                <tr key={farmers._id}>
                    <th className="row">
                        <a href="#">
                            {farmers.number}
                        </a>
                    </th>
                    <td>{farmers.name}</td>
                    <td>
                        <a href='#' className='text-primary'>
                            {farmers.location}
                        </a>
                    </td>
                    <td>${farmers.fruits}</td>
                    <td>
                        <span className={'badge bg-${handleStatus(farmers.status)}'}>
                            {farmers.status}
                        </span>
                    </td>
                </tr>
             )) }
        </tbody>
      </table>
    </div>
  )
}

export default SuppliersTable