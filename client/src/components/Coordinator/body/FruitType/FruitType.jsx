// ./client/src/components/Coordinator/body/FruitType/FruitType.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import FruitTypeForm from "./FruitTypeForm";

import "./FruitType.css";

import SearchBar from './SearchBar'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";



axios.defaults.baseURL = "http://localhost:8070/";

function FruitType() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    name: "",
    date: "",
    description: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    name: "",
    date: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/FruitType/add", data);
      alert("Fruit Type Added");
      getFetchData();
      setAddSection(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/FruitType/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleRefreshClick = () => {
    getFetchData();
  };
  
  const handleButtonClick = () => {
    getFetchData();
  };

  // Edit data
  const handleEdit = (fruitType) => {
    setDataEdit(fruitType);
    setEditSection(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Fruit Type with ID:", dataEdit._id);
    try {
      await axios.put(`/FruitType/update/${dataEdit._id}`, dataEdit);
      alert("Fruit Type Updated");
      setEditSection(false);
      getFetchData();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/FruitType/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="main">
    <div className="card recent-sales overflow-auto">
     
          <div className="card-body">
          
            <div class="page-header">
              <div class="add-item d-flex">

              <div class="card-title">
                  Fruit Details
                  <h6>Manage fruit details</h6>
                </div>
              </div>

              <ul class="table-top-head">
                <li>
                  <div className="button-container">
                      <a href="#" onClick={handleButtonClick}>
                          <img src={Pdf} alt="Pdf Icon"  className="icon"  />
                      </a>
                  </div>
                </li> 
                <li>
                  <div className="button-container">
                      <a href="#" onClick={handleButtonClick}>
                          <img src={Excel} alt="Excel Icon"  className="icon"  />
                      </a>
                  </div>
                </li>  
                <li>
                  <div className="button-container">
                      <a href="#" onClick={handleRefreshClick}>
                      <img src={Refresh} alt="Refresh Icon"  className="icon"  />
                      </a>
                  </div>
                </li>    
              </ul>
      <div class="page-btn">
        <button type="button" className="btn btn-added" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i> Add Fruit
        </button>
      </div>
      </div>
      {addSection && (
        <FruitTypeForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          data={data}
        />
      )}

      {editSection && (
        <FruitTypeForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          data={dataEdit}
        />
      )}


      

       
<div className="table-container">
      <SearchBar/>
        <table className="table table-borderless datatable">

          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((fruitType) => (
                <tr key={fruitType._id}>
                  <td>{fruitType.name}</td>
                  <td>{fruitType.date}</td>
                  <td className="description">{fruitType.description}</td>
                  <td>
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(fruitType)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(fruitType._id)}
                      >
                       <i className="bi bi-trash-fill"></i>
                      </button>
                      </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    </div>
  );
}

export default FruitType;
