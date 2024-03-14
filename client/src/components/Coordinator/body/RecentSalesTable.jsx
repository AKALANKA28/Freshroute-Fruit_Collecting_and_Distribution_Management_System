import React from 'react'


const RecentSalesTable = ({items}) => {
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
                <th className="col"d>Customer</th>
                <th className="col"d>Product</th>
                <th className="col"d>Price</th>
                <th className="col"d>Status </th>
            </tr>
        </thead>
        <tbody>
            {items &&
             items.length > 0 &&
             items.map(item => (
                <tr key={item._id}>
                    <th className="row">
                        <a href="#">
                            {item.number}
                        </a>
                    </th>
                    <td>{item.customer}</td>
                    <td>
                        <a href='#' className='text-primary'>
                            {item.product}
                        </a>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
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

export default RecentSalesTable
