// ./client/src/components/Coordinator/body/TransportFee.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TransportFeeForm from "./TransportFeeForm";
import "./TransportFee.css";

axios.defaults.baseURL = "http://localhost:8070/";

function TransportFee() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    vehicletype: "",
    date: "",
    maxweight: "",
    pricepkm: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    vehicletype: "",
    date: "",
    maxweight: "",
    pricepkm: "",
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
      await axios.post("/TransportFee/add", data);
      alert("Transport Fee Added");
      getFetchData();
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/TransportFee/");
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
    console.log("Updating Transport Fee with ID:", dataEdit._id);
    try {
      await axios.put(`/TransportFee/update/${dataEdit._id}`, dataEdit);
      alert("Transport Fee Updated");
      setEditSection(true);
      window.location.reload();
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

  const handleEdit = (transportfee) => {
    setDataEdit(transportfee);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/TransportFee/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="main">
      <div>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i> Add
        </button>
      </div>
      {addSection && (
        <TransportFeeForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          data={data}
        />
      )}

      {editSection && (
        <TransportFeeForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          data={dataEdit}
        />
      )}

      <div className="table-container">
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Date</th>
              <th scope="col">MaxWeight(kg)</th>
              <th scope="col">Price per km (Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((transportfee) => (
                <tr key={transportfee._id}>
                  <td>{transportfee.vehicletype}</td>
                  <td>{transportfee.date}</td>
                  <td>{transportfee.maxweight}</td>
                  <td>{transportfee.pricepkm}</td>
                  <td className="action">
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(transportfee)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(transportfee._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
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
  );
}

export default TransportFee;
