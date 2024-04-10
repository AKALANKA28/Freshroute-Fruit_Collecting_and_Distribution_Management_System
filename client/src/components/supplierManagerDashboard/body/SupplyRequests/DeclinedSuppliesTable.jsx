import React from 'react';

function DeclinedSupplies({ declinedSupplies }) {
  return (
    <div id="main col-8">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Declined Supply Requests
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
            <th>Total Quantity(kg)</th>
            <th>Price for 1kg(Rs)</th>
            <th>Total Price(Rs)</th>
            <th>Date Can Be Given</th>
          </tr>
        </thead>
        <tbody>
          {declinedSupplies.map((supply) => (
            <tr key={supply._id}>
              <td>{supply.fruit}</td>
              <td>{supply.subCategory}</td>
              <td>{supply.quality}</td>
              <td>{supply.quantity}</td>
              <td>{supply.price}</td>
              <td>{supply.price * supply.quantity}</td>
              <td>{supply.dateCanBeGiven}</td>
            </tr>
          ))}
        </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeclinedSupplies;