import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerForm from "./FarmerForm";

axios.defaults.baseURL = "http://localhost:8070/";

function SuppliersList() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
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
      await axios.post("/Farmer/add", data);
      alert("Farmer Added");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Farmer/");
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
    console.log("Updating Farmer with ID:", dataEdit._id);
    try {
      await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
      alert("Farmer Updated");
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

  const handleEdit = (farmer) => {
    setDataEdit(farmer);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Farmer/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <sidebar />
      <div>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add Farmer
        </button>
        </div>
        {addSection && (
          <FarmerForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            rest={data}
          />
        )}

        {editSection && (
          <FarmerForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            rest={dataEdit}
          />
        )}

        <div>
          <table className="table table-bordeless datatable">
            <thead className="table-light">
              <tr>
                <th scope="col">NIC</th>
                <th scope="col">username</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">city</th>
                <th scope="col">lane</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length ? (
                dataList.map((farmer) => (
                  <tr key={farmer._id}>
                    <td>{farmer.NIC}</td>
                    <td>{farmer.username}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.email}</td>
                    <td>{farmer.city}</td>
                    <td>{farmer.lane}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(farmer)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(farmer._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No Data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
    </>
  );
}

export default SuppliersList;