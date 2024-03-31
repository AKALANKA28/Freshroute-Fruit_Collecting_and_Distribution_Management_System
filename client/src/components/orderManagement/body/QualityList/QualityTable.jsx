import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8070/";


const QualityTable = ({ items, updateQualityList, editItem }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/quality/delete/${id}`);
      updateQualityList();
      alert('Successfully Deleted');

    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert("An error occurred while deleting the quality record");
      }
    }
  };

  const handleEdit = (itemData) => {
    editItem(itemData);
  }

  return (
    <>
      <div>
        <table className="table table-bordeless datatable">
          <thead className="table-light">
            <tr>
              <th className="col">Fruit Type</th>
              <th className="col">Grade</th>
              <th className="col">Quality Description</th>
              <th className="col">Storage Conditions</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.fruitCategory}</td>
                  <td>{item.grade}</td>
                  <td >{item.qualityDesc}</td>
                  <td >{item.storageCond}</td>
                  <td>
                    <div className="buttons">
                    <button className="btn-table edit"  onClick={() => handleEdit(item)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className="btn-table delete" onClick={ () =>  handleDelete(item._id)}>
                        <i className="bi bi-trash3-fill"></i>
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

export default QualityTable;
