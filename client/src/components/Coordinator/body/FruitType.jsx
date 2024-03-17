// ./client/src/components/Coordinator/body/FruitType.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import FruitTypeForm from "./FruitTypeForm";
import "./FruitType.css"
// import "./main.css"


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

  // Edit data
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Fruit Type with ID:", dataEdit._id);
    try {
      await axios.put(`/FruitType/update/${dataEdit._id}`, dataEdit);
      alert("Fruit Type Updated");
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

  const handleEdit = (fruitType) => {
    setDataEdit(fruitType);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/FruitType/delete/${id}`);
      alert("Successfully Delete");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <div id="main">
      <div >
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
        <i className="bi bi-plus-circle"></i> Add
        </button>
        </div>  
        {addSection && (
        <FruitTypeForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          rest={data}
        />
      )}
  
      {editSection && (
        <FruitTypeForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
       
      <div>
         <table className="table table-bordeless datatable">
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
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Data</td>
              </tr>
            )}
            </tbody>
           </table>
          </div>
        </div>
    </>
  );
  
}

export default FruitType;


