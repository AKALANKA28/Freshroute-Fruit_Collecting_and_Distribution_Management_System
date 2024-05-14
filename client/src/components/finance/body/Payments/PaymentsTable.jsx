import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

const PaymentsTable = ({ items, updateQualityList, editItem }) => {
  const [dataList, setDataList] = useState([]);
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    getFetchData();
  }, []);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Vehicle/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Function to handle payment
  const handlePayment = async (vehicle) => {
    try {
      // Perform payment logic here, for demonstration purposes let's assume it's successful
      // Update the payment status in the backend
      await axios.put(`/Vehicle/${vehicle._id}`, { paid: true });

      // Update the dataList state to reflect the change
      const updatedDataList = dataList.map((item) =>
        item._id === vehicle._id ? { ...item, paid: true } : item
      );
      setDataList(updatedDataList);
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
              <th>Owner Name</th>
              <th>Bank Name</th>
              <th>Branch</th>
              <th>Account Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((vehicle) => (
                <tr key={vehicle._id}>
                  <td>{vehicle.owner_name}</td>
                  <td>{vehicle.Bank}</td>
                  <td>{vehicle.Branch}</td>
                  <td>{vehicle.account_no}</td>
                  <td className="action">
                    <div className="buttons">
                      <button
                        className="btn btn-edit"
                        onClick={() => handlePayment(vehicle)}
                        disabled={vehicle.paid} // Disable button if payment is already made
                      >
                        {vehicle.paid ? "Paid" : "Pay"}
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

export default PaymentsTable;
