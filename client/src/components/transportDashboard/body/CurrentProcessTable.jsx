import React from 'react'


const CurrentProcessTable = ({items}) => {
    const handleStatus = current_status => {
    switch (current_status) {
        case 'Complete':
            return 'success';
            break;
        case 'pending':
            return 'warning';
            break;
         case 'Late':
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
                <th className="col"d>Process ID</th>
                <th className="col"d>Vehicle Number</th>
                <th className="col"d>Driver Name</th>
                <th className="col"d>Current Status</th>
            </tr>
        </thead>
        <tbody>
            {items &&
             items.length > 0 &&
             items.map(item => (
                <tr key={item._id}>
                    <th className="row">
                            {item.process_ID}
                    </th>
                    <td>{item.vehicle_no}</td>
                    <td>
                            {item.driver_name}
                    </td>
                    {/* <td>${item.price}</td> */}
                    <td>
                        <span className={`badge bg-${handleStatus(item.current_status)}`}>
                            {item.current_status}
                        </span>
                    </td>
                </tr>
             )) }
        </tbody>
      </table>
    </div>
  )
}

export default CurrentProcessTable
