import React, { useState, useEffect } from 'react';
import Header from '../header/header'; // Corrected import path
import Sidebar from '../sidebar/Sidebar'; // Corrected import path
import FruitTypeForm from '../form/FruitTypeForm'; // Corrected import path
import axios from 'axios';

const FruitTypeBody = () => {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    name: "",
    date: "",
    description: ""
  });
  const [dataEdit, setDataEdit] = useState({
    _id: "",
    name: "",
    date: "",
    description: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitAdd = async (e) => { // Defined handleSubmitAdd
    e.preventDefault();
    axios
      .post("/Fruit/add", data)
      .then(() => {
        alert("Fruit Added");
        getFetchData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSubmitEdit = async (e) => { // Defined handleSubmitEdit
    e.preventDefault();
    console.log("Updating Fruit with ID:", dataEdit._id);
    axios
      .patch(`/Fruit/update/${dataEdit._id}`, dataEdit)
      .then(() => {
        alert("Fruit Updated");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const handleEditOnChange = (e) => { // No need for async here
    const { value, name } = e.target;
    setDataEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (fruit) => {
    setDataEdit(fruit);
    setEditSection(true);
  };

  const handleDelete = async (id) => { // Defined handleDelete
    axios.delete(`/Fruit/delete/${id}`).then(() => {
      alert("Successfully Delete");
      getFetchData();
    });
  };

  const getFetchData = async () => {
    axios
      .get("/Fruit/")
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <>
      <Header /> 
      <Sidebar /> 
      <div className="container">
        <div></div>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>
        </div>
        <div>
        {addSection && (
          <FruitTypeForm
            handleSubmit={handleSubmitAdd} 
            handleOnChange={handleOnChange}
            rest={data}
          />
        )}
        {editSection && (
          <FruitTypeForm
            handleSubmit={handleSubmitEdit} 
            handleOnChange={handleEditOnChange} 
            rest={dataEdit}
          />
        )}
        
        </div>

        <div className="table table-striped">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length ? (
                dataList.map((fruit) => (
                  <tr key={fruit._id}>
                    <td>{fruit.name}</td>
                    <td>{fruit.date}</td>
                    <td>{fruit.description}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(fruit)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(fruit._id)}
                      >
                        Delete
                      </button>
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
    </>
  );
};

export default FruitTypeBody;
