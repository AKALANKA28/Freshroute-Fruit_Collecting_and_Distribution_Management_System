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
import CalculateSalaryForm from "./CalculateSalaryForm";
import CalculateSalaryReport from "./CalculateSalaryReport";
import SpinnerModal from '../../../spinner/SpinnerModal'
import "./CalculateSalary.css";
import { ToastContainer, toast } from 'react-toastify';
axios.defaults.baseURL = "http://localhost:8070/";

function CalculateSalary() {
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [selectedCalculateSalary, setSelectedCalculateSalary] = useState(null);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    // Fetch data
    getFetchData();
    // Simulate loading for 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Clear timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setFilteredDataList(dataList); // Initialize filteredDataList with dataList
  }, [dataList]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/CalculateSalary/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    const filteredList = dataList.filter((employee) => {
      const fullName = `${employee.name} ${employee.jobrole} ${employee.nic} ${employee.accno} ${employee.bankname}`; // Customize this according to your data structure
      return fullName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredDataList(filteredList);
  };

  const handleRefreshClick = () => {
    getFetchData();
  };

  const generateExcelFile = () => {
    
    const rearrangedDataList = dataList.map(salary => ({
      Name: salary.name,
      Job_Role: salary.jobrole,
      Salary: salary.salary,
      Date: salary.date,
      Allowance: salary.allowance,
      Employee_Contribution: salary.epfe,
      Employer_Contribution: salary.epfr,
      ETF: salary.etf,
      
    }));
  
    // Define the worksheet
    const ws = XLSX.utils.json_to_sheet(rearrangedDataList);
    
    // Define the workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Salary Report");
    
    // Generate the Excel file
    writeFile(wb, "salary_report.xlsx");
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

  const handleEditModalOpen = (calculateSalary) => {
    setSelectedCalculateSalary(calculateSalary);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/CalculateSalary/delete/${id}`);
      toast.success("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };



  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(`/CalculateSalary/update/${formData._id}`, formData);
      toast.success("Salary Calculated");
      handleEditModalClose();
      getFetchData();
    } catch (err) {
      alert(err.message);
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
          
            <div class="page-header">
              <div class="add-item d-flex">

              <div class="card-title">
                  Employee Salary Details
                  <h6>Manage employee salary details</h6>
                </div>
              </div>

              <ul class="table-top-head">
              <li>
              <BlobProvider
                  document={<CalculateSalaryReport dataList={dataList}/>}
                  fileName="SalaryReport.pdf"
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
              </div>  

              <Modal show={editModalOpen} onHide={handleEditModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Salary Calculator</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CalculateSalaryForm
                handleSubmit={handleEditSubmit}
                initialData={selectedCalculateSalary}
              />
            </Modal.Body>
          </Modal>

        <div className="table-container">
        <SearchBar onSearch={handleSearch} />
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
            {filteredDataList.length ? (
                  filteredDataList.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.jobrole}</td>
                    <td>{employee.nic}</td>
                    <td>{employee.accno}</td>
                    <td>{employee.bankname}</td>
                    <td>{employee.salary ? `Rs.${employee.salary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>
                    <td>{employee.allowance ? `Rs.${employee.allowance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>
                    <td>{employee.netsalary ? `Rs.${employee.netsalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>

                    
                    <td>
                      <div className="justify-content-center buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() =>handleEditModalOpen(employee)}
                        >
                          <i className="bi bi-calculator"></i>
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

export default CalculateSalary;
