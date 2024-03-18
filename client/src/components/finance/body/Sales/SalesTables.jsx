import React from 'react'

const SalesTables = ({items}) => {
  const handleStatus = status => {
    switch (status) {
        case 'Paid':
            return 'success';
            break;
        case 'DUE':
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
    <div >
      <table className='table table-bordeless datatable'>
        <thead className="table-light">
            <tr>
                {/* <th className="col"d>#</th> */}
            
                <th className="col"d>Customer</th>
                <th className="col"d>Date</th>
                <th className="col"d>Total</th>
                <th className="col"d>Paid</th>
                <th className="col"d>Due</th>
                <th className="col"d>Payment Status</th>
                <th className="col"d>Action</th>
            </tr>
        </thead>
        <tbody>
            {items &&
             items.length > 0 &&
             items.map(item => (
                <tr key={item._id}>
                    {/* <th className="row">
                        <a href="#">
                            {item.number}
                        </a>
                    </th>  ------ if you want to show custom id numbers..use this commented code and the above column also--------*/}
                    <td>{item.customer_name}</td>
                    <td>
                        <a href='#' className='text-primary'>
                            {item.fruit_name}
                        </a>
                    </td>
                    <td>${item.amount.toFixed(2)}</td>
                    <td>
                        <span className={`badge bg-${handleStatus(item.status)}`}>
                            {item.status}
                        </span>
                    </td>
                </tr>
             )) }
        </tbody>
      </table>
    </div>
  )
}

export default SalesTables
