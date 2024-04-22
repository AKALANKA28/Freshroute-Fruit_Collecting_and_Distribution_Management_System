import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8070/";

const dateFormat = (dateString) => {
  const date = new Date(dateString);
  return  date.toLocaleString();
}

const SuppliersTable = ({ items, handleView }) => {

  return (
      <>
        <div>
          <table className="table table-bordeless datatable">
            <thead className="table-light">
            <tr>
                <th className="col">Supplier Name</th>  
              <th className="col">Fruit Type</th>
              <th className="col">Fruit Category</th>
              <th className="col">Quality</th>
              <th className="col">Total Quantity (kg)</th>
              <th className="col date-field">Price for 1kg</th>
              <th className="col date-field">Total Price (Rs)</th>
              <th className="col">Date Can Be Given</th>
              <th className="col">Contact No</th>
              <th className="col">Action</th>
            </tr>
            </thead>
            <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.fruit}</td>
                  <td>{item.category}</td>
                  <td>{item.quality}</td>
                  <td >{item.quantity}</td>
                  <td >{dateFormat(item.placedDate)}</td>
                  <td >{dateFormat(item.dueDate)}</td>
                  <td>{item.opName}</td>
                  <td>
                    <div className="buttons">
                      <button type="button" className="btn btn-outline-warning" onClick={() => handleView(item)}>
                        <i className="bi bi-arrow-up-right-square"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SuppliersTable;
