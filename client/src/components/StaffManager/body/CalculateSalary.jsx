import React, { useEffect, useState } from "react";
import axios from "axios";
import CalculateSalaryForm from "./CalculateSalaryForm";

function CalculateSalary() {
  const [editSection, setEditSection] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    _id: "",
    name: "",
    jobrole: "",
    salary: "",
    allowance: "",
    epfe: "",
    epfr: "",
    etf: "", 
    netsalary: "",
  });
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/CalculateSalary/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Employee with ID:", dataEdit._id);
    try {
      await axios.put(`/CalculateSalary/update/${dataEdit._id}`, dataEdit); 
      alert("Salary Calculated");
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

  return (
    <>
      <div id="main">
        {editSection && (
          <CalculateSalaryForm
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
                <th scope="col">Account Number</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Basic</th>
                <th scope="col">Allowance</th>
                <th scope="col">Net Salary</th>
                <th>Calculator</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length ? (
                dataList.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.jobrole}</td>
                    <td>{employee.nic}</td>
                    <td>{employee.accno}</td>
                    <td>{employee.bankname}</td>
                    <td>{employee.salary}</td>
                    <td>{employee.allowance}</td>
                    <td>{employee.netsalary}</td>
                    <td>
                      <div className="buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(employee)}
                        >
                          <i className="bi bi-calculator"></i>
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

export default CalculateSalary;
