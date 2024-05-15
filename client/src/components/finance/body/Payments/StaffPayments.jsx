import React, { useEffect, useState } from 'react'
import "../Expenses/expense.css"
import axios from 'axios';

const StaffPayments = () => {
    const [dataList, setDataList] = useState([]);
    const [filteredDataList, setFilteredDataList] = useState([]);
  
    useEffect(() => {
      getFetchData();
    }, []);
  
    const getFetchData = async () => {
      try {
        const response = await axios.get("/Employee//");
        setDataList(response.data);
      } catch (err) {
        alert(err.message);
      }
    };
  
    // Function to handle payment
    const handlePayment = async (employee) => {
      try {
        // Perform payment logic here, for demonstration purposes let's assume it's successful
        // Update the payment status in the backend
        // await axios.put(`/Vehicle/${vehicle._id}`, { paid: true });
        const currentDate = new Date(); // Get current date and time
  
        // Add expense
        const expenseData = {
          date: currentDate.toISOString(), // Convert date to ISO string format
          category: "Payments",
          amount: employee.netsalary, // Assuming the amount is available in the vehicle object
          description: `Payment for ${employee.name} (Manager)`, // Customize the description as needed
        };
        await axios.post("/expense/add", expenseData);
    
        // Update the dataList state to reflect the change
        const updatedDataList = dataList.map((item) =>
          item._id === employee._id ? { ...item, paid: true } : item
        );
        setDataList(updatedDataList);
    
        // Fetch updated expense data and update the state to reflect the new entry in the expense table
        // Example:
        // const updatedExpenses = await axios.get("/expenses");
        // setExpenseData(updatedExpenses.data);
      } catch (err) {
        console.error("Error while processing payment:", err);
        // Handle error gracefully, e.g., show a toast message
      }
    };
    
  
    return (
      <>
        <div>
          <table className="table datatable">
            <thead className="table-light">
              <tr>
                <th>Employee Name</th>
                <th>Bank Name</th>
                {/* <th>Branch</th> */}
                <th>Account Number</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.bankname}</td>
                    {/* <td>{employee.Branch}</td> */}
                    <td>{employee.accno}</td>
                    <td>Rs. {employee.netsalary.toFixed(2)}</td>
                    <td className="action">
                      <div className="buttons">
                        <button
                          className="btn btn-edit"
                          onClick={() => handlePayment(employee)}
                          disabled={employee.paid} // Disable button if payment is already made
                          
                        >
                          {employee.paid ? "Paid" : "Pay"}
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
      </>
    );
  };
  

export default StaffPayments
