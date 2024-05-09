import React from 'react'

const AssingedOrdersItem = ({item}) => {
  return (
    <>
    

    <div>
      <table className='table table-bordeless datatable'>
        <thead className="table-light">
            <tr>
                {/* <th className="col"d>#</th> */}
            
                <th className="col"d>Fruit Type</th>
                <th className="col"d>Quantity</th>
                <th className="col"d>Price</th>
                <th className="col"d>Status </th>
            </tr>
        </thead>
        <tbody>
        {/* {recentOrders &&
                        recentOrders.map(item => ( */}
                <tr key={item._id}>
                    {/* <th className="row">
                        <a href="#">
                            {item.number}
                        </a>
                    </th>  ------ if you want to show custom id numbers..use this commented code and the above column also--------*/}
                    <td><ul>
                          {item.orderItems.map((item) => (
                            <li key={item._id} className="border-bottom">{item.product.title}</li>
                          ))}
                        </ul></td>
                    <td>
                    <ul className='ms-0'>
                          {item.orderItems.map((item) => (
                            <li key={item._id} className="border-bottom">{item.quantity} kg</li>
                          ))}
                        </ul>
                    </td>
                    <td>Rs. {((item?.totalPrice * 2) / 100 + item?.totalPrice).toFixed(2)}</td>
                    <td>
                    {/* <span className={`badge bg-${handleStatus(item.orderStatus)}`}> */}
                    <span>
                            {item.orderStatus}
                        </span>
                    </td>
                </tr>
             {/* )) } */}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default AssingedOrdersItem





