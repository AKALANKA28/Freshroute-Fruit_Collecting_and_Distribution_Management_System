
import React, { useEffect, useState } from "react";
import axios from "axios";
import SalaryForm from "./SalaryForm";
import "./Salary.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Salary() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    jobrole: "",
    date: "",
    salary: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    jobrole: "",
    date: "",
    salary: "",
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
      await axios.post("/Salary/add", data);
      alert("Salary Added");
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
      const response = await axios.get("/Salary/");
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
    console.log("Updating Salary with ID:", dataEdit._id);
    try {
      await axios.put(`/Salary/update/${dataEdit._id}`, dataEdit);
      alert("Salary Updated");
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

  const handleEdit = (salary) => {
    setDataEdit(salary);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Salary/delete/${id}`);
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
        <SalaryForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          data={data}
        />
      )}

      {editSection && (
        <SalaryForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          data={dataEdit}
        />
      )}

      <div className="table-container">
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Job Role</th>
              <th scope="col">Date</th>
              <th scope="col">Salary(Rs)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((salary) => (
                <tr key={salary._id}>
                  <td>{salary.jobrole}</td>
                  <td>{salary.date}</td>
                  <td>{salary.salary}</td>
                  <td className="action">
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(salary)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(salary._id)}
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
  );
}

export default Salary;
