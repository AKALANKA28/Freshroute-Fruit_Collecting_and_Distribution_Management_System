import React,{useState, useEffect} from 'react'
import './expense.css'
import SearchBar from './SearchBar'
import ExpenseTable from "./ExpenseTable";
import ExpenseFormModal from './ExpenseFormModal';
import axios from 'axios';
import CardFilter from '../CardFilter'

import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";

axios.defaults.baseURL = "http://localhost:8070/";



const Expense = () => {

  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('Today');
  const [addSection, setAddSection] = useState(false)

    const [data, setData] = useState({
      date : "",
      category : "",
      amount : "",
      description : ""
    })
  

    const handleOnChange = (e) =>{
      const {value,name} = e.target
      setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
        
      }) 
    }
    //add data
    const handleSubmit = async(e)=>{
      e.preventDefault()
      axios.post("http://localhost:8070/expense/add", data).then(() => {
        alert("Expense Added")
        fetchData()
      }).catch((err) =>{
        if (err.response && err.response.data && err.response.data.err) {
          // If the error has a custom message from the backend, display it
          alert(err.response.data.err);
        } else {
          // Otherwise, display a generic error message
          alert("An error occurred while adding the expense record");
        }      
      })
     
    }

 
  
   
  
    const handleFilterChange = filter => {
        setFilter(filter)
    };

    const fetchData = () => {
        fetch("http://localhost:8070/expense/")
         .then(res => res.json())
         .then(data => {
            setItems(data);
         }).catch((err) =>{
          if (err.response && err.response.data && err.response.data.err) {
            alert(err.response.data.err);
          } else {
            alert("An error occurred while retrieving the expense records");
          }      
        })
    };

    useEffect(() => {
        fetchData();
    }, [])

  
    const handleRefreshClick = () => {
      fetchData();
    };

    const handleButtonClick = () => {
      fetchData();
    };

  return (
   
        <div className="card recent-sales overflow-auto">

{/* ---------------------------table filter---------------------- */}
        <CardFilter filterChange={handleFilterChange} />
          <div className="card-body">
            <div class="page-header">
              <div class="add-item d-flex">


{/* --------------------------table name ---------------------------*/}
                <div class="card-title">
                  Expense Details<span>| {filter}</span>
                  <h6>Manage your expenses</h6>
                </div>
              </div>

{/*---------------- pdf,excel report generating icon and refresh -------------------*/}
              <ul class="table-top-head">
                <li>
                  <div className="button-container">
                      <a href="#" onClick={handleButtonClick}>
                          <img src={Pdf} alt="Pdf Icon"  className="icon"  />
                      </a>
                  </div>
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


{/* --------------------add button------------------ */}

              <div class="page-btn">
                  <button type="button" class="btn btn-added" data-bs-toggle="modal"  data-bs-target="#addExpenseModal" onClick={() => setAddSection(true)}>
                    <i className="bi bi-plus-circle" style={{ marginRight: '10px' }}></i>
                      Add Expense
                  </button>
                  </div>
                  <ExpenseFormModal
                    show={addSection}
                    handleClose={() => setAddSection(false)}
                    handleSubmit={handleSubmit}
                    handleOnChange={handleOnChange}
                    rest={data}
                  />

{/* --------------------imported search bar and table data ------------------------*/}
            </div>  
              <SearchBar/>
              <ExpenseTable items = {items} />
            </div> 

        </div>   
   
  )
}

export default Expense
