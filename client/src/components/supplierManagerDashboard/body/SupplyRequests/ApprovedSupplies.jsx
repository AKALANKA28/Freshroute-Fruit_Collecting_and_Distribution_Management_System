// import React from 'react'
// import './supplyRequests.css';

// function ApprovedSupplies({ approvedSupplies })  {
//   return (
//     <div>
//       <h2>Approved Supplies</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Fruit</th>
//             <th>Sub Category</th>
//             <th>Quality</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Date Can Be Given</th>
//           </tr>
//         </thead>
//         <tbody>
//           {approvedSupplies.map((supply) => (
//             <tr key={supply._id}>
//               <td>{supply.fruit}</td>
//               <td>{supply.subCategory}</td>
//               <td>{supply.quality}</td>
//               <td>{supply.quantity}</td>
//               <td>{supply.price}</td>
//               <td>{supply.dateCanBeGiven}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ApprovedSupplies


import React from 'react'
import './supplyRequests.css';

function ApprovedSupplies({ approvedSupplies })  {
  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Approved Supply Requests
              </div>
            </div>
          </div>

          <div className="table-container">
          <table className="table datatable">
            <thead className="table-light">
            <tr>
                <th>Fruit</th>
                <th>Sub Category</th>
                <th>Quality</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date Can Be Given</th>
            </tr>
            </thead>
            <tbody>
            {approvedSupplies.map((supply) => (
                <tr key={supply._id}>
                <td>{supply.fruit}</td>
                <td>{supply.subCategory}</td>
                <td>{supply.quality}</td>
                <td>{supply.quantity}</td>
                <td>{supply.price}</td>
                <td>{supply.dateCanBeGiven}</td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApprovedSupplies
