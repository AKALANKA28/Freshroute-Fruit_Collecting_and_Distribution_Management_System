import React, { useEffect, useState } from "react";
import axios from "axios";
import { BlobProvider, } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import SearchBar from './SearchBar';
import Excel from "../../../../assests/img/icons/excel.png";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import EmployeeForm from "./EmployeeForm";
import EmployeeReport from "./EmployeeReport";
import SpinnerModal from '../../../spinner/SpinnerModal'
import "./Employee.css";
import { ToastContainer, toast } from 'react-toastify';
axios.defaults.baseURL = "http://localhost:8070/";

function Employee() {
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [jobRoleFilter, setJobRoleFilter] = useState("all"); 

  useEffect(() => {
    // Fetch data
    getFetchData();
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Employee/");
      setDataList(response.data);

      console.log(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((employee) => {
      const fullName = `${employee.name} ${employee.jobrole} ${employee.address} ${employee.nic} ${employee.email} ${employee.accno} ${employee.bankname} ${employee.joineddate}`; // Customize this according to your data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  const generateExcelFile = () => {
    
    const rearrangedDataList = dataList.map(employee => ({
      
      Date: employee.name,
      Joined_Date: employee.joineddate,
      Job_Role: employee.jobrole,
      NIC: employee.nic,
      Email: employee.email,
      Accno: employee.accno,
      Bank_Name: employee.bankname,
      
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employee Report");
    
    // Generate the Excel file
    writeFile(wb, "employee_report.xlsx");
  };

  const handleButtonClick = () => {
    getFetchData();
    generateExcelFile();
  };

  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleEditModalOpen = (salary) => {
    setSelectedEmployee(salary);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDeleteModalOpen = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/Employee/delete/${employeeToDelete}`);
      toast.success("Successfully Deleted");
      getFetchData();
      handleDeleteModalClose();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post("/Employee/add", formData);
      toast.success("Employee Added");
      handleAddModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      const response = await axios.put(`/Employee/update/${formData._id}`, formData);
     toast.success("Employee Updated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  

  // Step 2: Get unique job roles from data
  const jobRoles = Array.from(new Set(dataList.map(employee => employee.jobrole)));

  // Step 3: Handle changes in the dropdown selection
  const handleJobRoleChange = (e) => {
    const selectedRole = e.target.value;
    setJobRoleFilter(selectedRole);
    if (selectedRole === "all") {
      setFilteredDataList(dataList); // Show all data when "All Job Roles" is selected
    } else {
      const filteredList = dataList.filter(employee => employee.jobrole === selectedRole);
      setFilteredDataList(filteredList);
    }
  };

  return (
    <div id='main' className='main'>
      <br/><br/>
      {loading ? ( // Display spinner while loading is true
        <SpinnerModal show={loading} />
      ) : (
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
          <div className="page-header">
            <div className="add-item d-flex">
              <div className="card-title">
                Employee Details
                <h6>Manage employee details</h6>
              </div>
            </div>

            <ul className="table-top-head">
            <li>
              <BlobProvider
                  document={<EmployeeReport dataList={dataList}/>}
                  fileName="CategoryReport.pdf"
                >
                  {({ url, blob }) => (
                    <div className="button-container">
                      <a href={url} target="_blank">
                        <img src={Pdf} alt="Pdf Icon" className="icon" />
                      </a>
                    </div>
                  )}
                </BlobProvider>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleButtonClick}>
                    <img src={Excel} alt="Excel Icon" className="icon" />
                  </a>
                </div>
              </li>
              <li>
                <div className="button-container">
                  <a href="#" onClick={handleRefreshClick}>
                    <img src={Refresh} alt="Refresh Icon" className="icon" />
                  </a>
                </div>
              </li>
            </ul>
            <div className="page-btn">
              <button
                type="button"
                className="btn btn-added"
                onClick={handleAddModalOpen}
              >
                <i className="bi bi-plus-circle"></i> Add New Employee
              </button>
            </div>
            
          </div>
          <Modal show={addModalOpen} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EmployeeForm handleSubmit={handleAddSubmit} />
            </Modal.Body>
          </Modal>

          <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Employee Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EmployeeForm
                handleSubmit={handleEditSubmit}
                initialData={selectedEmployee}
              />
            </Modal.Body>
          </Modal>

          <Modal show={deleteModalOpen} onHide={handleDeleteModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDeleteModalClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteConfirmed}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="table-container">
            
            <SearchBar onSearch={handleSearch} />
         
            <div className="dropdown">
              <select 
                className="form-select"
                value={jobRoleFilter} 
                onChange={handleJobRoleChange}>
                <option value="all">All Job Roles</option>
                {jobRoles.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <table className="table table-borderless datatable">
              <thead className="table-light">
                <tr>
                <th scope="col">Image</th>
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
              {filteredDataList.length ? (
  filteredDataList.map((employee) => (
    <tr key={employee._id}>
      <td>
        {employee.imageUrl && (
          <img
            src={employee.imageUrl}
            alt="Employee Profile"
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
        )}
      </td>
      <td>{employee.name}</td>
      <td>{employee.jobrole}</td>
      <td>{employee.nic}</td>
      <td>{employee.address}</td>
      <td>{employee.email}</td>
      <td>{employee.accno}</td>
      <td>{employee.bankname}</td>
      <td>
        {employee.fileUrl && (
          <a href={employee.fileUrl} target="_blank" rel="noopener noreferrer">
            View Qualifications
          </a>
        )}
      </td>
      <td>{employee.joineddate}</td>
      <td>
        <div className="buttons">
          <button
            className="btn btn-edit"
            onClick={() => handleEditModalOpen(employee)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-delete"
            onClick={() => handleDeleteModalOpen(employee._id)}
          >
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="10">No Data</td>
  </tr>
)}
</tbody>
            </table>
          </div>
        </div>
      </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Employee;