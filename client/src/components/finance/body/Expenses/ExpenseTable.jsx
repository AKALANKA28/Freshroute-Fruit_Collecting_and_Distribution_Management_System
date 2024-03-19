import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseFormModal from './ExpenseFormModal';
import ExpenseForm from './ExpenseForm';

axios.defaults.baseURL = "http://localhost:8070/";


const ExpenseTable = ({ items }) => {
  const [editSection, setEditSection] = useState(false);

  const [showFormModal, setShowFormModal] = useState(true); // State variable for form modal visibility

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    date: '',
    category: '',
    amount: '',
    description: '',
  });


    // Get data
    const [dataList, setDataList] = useState([]);

    const getFetchData = async () => {
      try {
        const response = await axios.get("/expense/");
        setDataList(response.data);
      } catch (err) {
        alert(err.message);
      }
    };


    useEffect(() => {
      getFetchData();
    }, []);

    // //edit data
        const handleUpdate = async(e) => {
          e.preventDefault()
          console.log("Updating Expense with ID:", dataEdit._id);
        axios.patch(`http://localhost:8070/expense/update/${dataEdit._id}`, dataEdit)
        .then(() => {
          setShowFormModal(false);

          alert("Expense Record Updated");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
        
        }

    const handleEditOnChange = async(e) => {
      const {value,name} = e.target;
      setDataEdit((preve)=>{
        return{
          ...preve,
          [name] : value,
        }
        
      }) ;
    };

    const handleEdit = (item) =>{
      setDataEdit(item)   
      setShowFormModal(true); // Show the form modal
      setEditSection(true);

    };




  // Delete data
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
{/*      
     {editSection && (
        <ExpenseForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
       */}
      
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
                      <button className="btn-table edit" data-bs-toggle="modal"  data-bs-target="#expenseModal" onClick={() => handleEdit(item)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      
     
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
      {editSection && (
        <ExpenseForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
      
        {/*---------- Form Popup ------------*/}
        {showFormModal && (
        <ExpenseFormModal
          handleClose={() => setShowFormModal(false)}
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
    </>
  );
};

export default ExpenseTable;
