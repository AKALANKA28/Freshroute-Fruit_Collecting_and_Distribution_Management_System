import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";
import "./Employee.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Employee() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    name: "",
    jobrole: "",
    nic: "",
    address: "",
    email: "",
    accno: "",
    bankname: "",
    qualifications: "",
    joineddate: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    name: "",
    jobrole: "",
    nic: "",
    address: "",
    email: "",
    accno: "",
    bankname: "",
    qualifications: "",
    joineddate: "",
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
      await axios.post("/Employee/add", data);
      alert("Employee Added");
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
      const response = await axios.get("/Employee/");
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
    console.log("Updating Employee with ID:", dataEdit._id);
    try {
      await axios.put(`/Employee/update/${dataEdit._id}`, dataEdit); // fixed string interpolation
      alert("Employee Updated");
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

  const handleEdit = (employee) => {
    setDataEdit(employee);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Employee/delete/${id}`); // fixed string interpolation
      alert("Successfully Delete");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div id="main">
        <div>
          <button className="btn btn-add" onClick={() => setAddSection(true)}>
            <i className="bi bi-plus-circle"></i> Add
          </button>
        </div>
        {addSection && (
          <EmployeeForm
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            rest={data}
          />
        )}

        {editSection && (
          <EmployeeForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            rest={dataEdit}
          />
        )}

        <div className="table-container">
          <table className="table table-borderless datatable">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Job Role</th>
                <th scope="col">NIC</th>
                <th scope="col">Address</th>
                <th scope="col">Email Address</th>
                <th scope="col"> Account Number</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Qualifications</th>
                <th scope="col">Joined Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length ? (
                dataList.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.jobrole}</td>
                    <td>{employee.nic}</td>
                    <td>{employee.address}</td>
                    <td>{employee.email}</td>
                    <td>{employee.accno}</td>
                    <td>{employee.bankname}</td>
                    <td>{employee.qualifications}</td>
                    <td>{employee.joineddate}</td>
                    <td>
                      <div className="buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(employee)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(employee._id)}
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
    </>
  );
}

export default Employee;
