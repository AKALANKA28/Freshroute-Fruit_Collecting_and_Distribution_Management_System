import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from "moment";

axios.defaults.baseURL = "http://localhost:8070/";

const dateFormat = (dateString) => {
  return  moment(dateString).format("YYYY-MM-DD");
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
              <th className="col ">Price for 1kg</th>
              <th className="col">Date Can Be Given</th>
              <th className="col">Contact No</th>
            </tr>
            </thead>
            <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.supplierName ? item.supplierName: "Heshan Perera"}</td>
                  <td>{item.fruit}</td>
                  <td>{item.subCategory}</td>
                  <td>{item.quality}</td>
                  <td >{item.quantity}</td>
                  <td >{item.price}</td>
                  <td >{dateFormat(item.dateCanBeGiven)}</td>
                  <td >{item.contact? item.contact: "077-8236523"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SuppliersTable;
