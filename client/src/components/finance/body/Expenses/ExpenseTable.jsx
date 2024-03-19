import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseFormModal from './ExpenseFormModal';



const ExpenseTable = ({ items }) => {
  const [showFormModal, setShowFormModal] = useState(false); // State variable for form modal visibility
  const [dataEdit, setDataEdit] = useState({
    _id: '',
    date: '',
    category: '',
    amount: '',
    description: ''
  });

   // Handle show modal function
   const handleShowModal = () => {
    setShowFormModal(true);
  };
  // Fetch data effect
  useEffect(() => {
    getFetchData();
  }, []);

  // Fetch data function
  const getFetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8070/expense/');
    } catch (err) {
      alert(err);
    }
  };

  // Handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8070/expense/update/${dataEdit._id}`, dataEdit);
      alert('Expense Record Updated');
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  // Handle edit on change function
  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle edit function
  const handleEdit = (item) => {
    console.log("Edit button clicked");
    setDataEdit(item);
    setShowFormModal(true);
  };

  // Handle delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/expense/delete/${id}`);
      alert('Successfully Deleted');
      getFetchData();

    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
       <button onClick={handleShowModal}>
        Add Expense
      </button>
      <div>
        <table className="table table-bordeless datatable">
          <thead className="table-light">
            <tr>
              <th className="col">Date</th>
              <th className="col">Category</th>
              <th className="col">Amount</th>
              <th className="col">Description</th>
              <th className="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.length > 0 &&
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td>Rs.{item.amount.toFixed(2)}</td>
                  <td>{item.description}</td>
                  <td>
                    <div className="buttons">
                      <button className="btn-table edit" onClick={() => handleEdit(item)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <ExpenseFormModal
        show={showFormModal}
        handleClose={() => setShowFormModal(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleEditOnChange}
        rest={dataEdit}
      />

                      <button className="btn-table delete" onClick={() => handleDelete(item._id)}>
                        <i className="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseTable;
