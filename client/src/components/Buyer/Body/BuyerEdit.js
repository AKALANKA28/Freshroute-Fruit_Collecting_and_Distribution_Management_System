import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../sidebar/Sidebar';
import Header from '../header/header';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function BuyerEdit(props) {

    const { id } = useParams();
  
    // Define state variables
    const [rname, setRname] = React.useState("");
    const [fruit, setFruit] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [quality, setQuality] = React.useState("");
    const [date, setDate] = React.useState("");
    const [datetobe, setDateToBe] = React.useState("");
    const navigate = useNavigate();
  
    // Fetch order data based on id when component mounts
    React.useEffect(() => {
      axios.get(`http://localhost:8070/request/${id}`)
        .then((res) => {
          const request = res.data.request;
  
          setRname(request.rname);
          setFruit(request.fruit);
          setCategory(request.category);
          setQuantity(request.quantity);
          setQuality(request.quality);
          setDate(request.date);
          setDateToBe(request.datetobe);
        })
        .catch((err) => {
          console.error("Error fetching order data:", err);
        });
    }, [id]);
  
    // Handle form submission
    const sendData = (e) => {
      e.preventDefault();
  
      const updateOrder = {
          rname,
          fruit,
          category,
          quantity,
          quality,
          date,
          datetobe
      };
  
      axios.put(`http://localhost:8070/request/update/${id}`, updateOrder)
          .then(() => {
              Swal.fire({
                  title: 'Success!',
                  text: 'Order Record Updated',
                  icon: 'success',
                  confirmButtonText: 'OK'
              }).then(() => {
                  navigate("/BuyerDashboard");
                  window.location.reload();
              });
          })
          .catch((err) => {
              console.error("Error updating order:", err);
              Swal.fire({
                  title: 'Error!',
                  text: 'Failed to update order. Please try again.',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          });
  }
  

  useEffect(() => {
    // Get the current date
    var currentDate = new Date();

    // Set the maximum date attribute for the input to the current date
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var day = currentDate.getDate().toString().padStart(2, '0');
    var maxDate = `${year}-${month}-${day}`;

    document.getElementById('dateInput').setAttribute('max', maxDate);
  }, []);

  const validateName = () => {
    const { d_name } = this.state;
    if (!d_name) {
      return "Name is required";
    }

    // Check if the name contains any uppercase letters
    if (/[A-Z]/.test(d_name)) {
      return "Please enter name in lowercase letters";
    }

    return "";
  };

  return (
    <div  id="main">
      <Header/>
      <Sidebar/>
      <div className='container' style={{marginTop:"5%"}}>
      <form onSubmit={sendData}>
        <h5>Edit Normal Order</h5>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Customer</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Name" 
          onKeyPress={(e) => {
            const pattern = /[a-zA-Z\s]/; // Regular expression to match letters and spaces
            if (!pattern.test(e.key)) {
                e.preventDefault(); // Prevents the input of characters other than letters and spaces
            }
        }}
            onChange={(e) => {
              setRname(e.target.value);
            }}
            value={rname}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Fruit</label>
          <select className="form-select" aria-label="Default select example" disabled
           value={fruit}
            onChange={(e)=>{
              setFruit(e.target.value)
            }}
           
          >
            <option selected>Open this select menu</option>
            <option value="Banana">Banana</option>
            <option value="Mango">Mango</option>
            <option value="Pineapple">Pineapple</option>
            <option value="Woodapple">Woodapple</option>
            <option value="Orange">Orange</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Sub Category</label>
           <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Name"
           value={category}
           onChange={(e)=>{
             setCategory(e.target.value)
           }} 
           disabled
           />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Quantity</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
            min={"1"}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            value={quantity}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Quality</label>
          <select className="form-select" aria-label="Default select example" disabled
            onChange={(e)=>{
              setQuality(e.target.value)
            }}
            value={quality}
          >
            <option selected>Open this select menu</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Date you want supplies</label>
          <input type="date" id="dateInput" name="date" max={""} value={date}
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
            required
            disabled
          />
        </div>

        <div className="mb-3">
            <label htmlFor="dateInput" className="form-label">Due Date</label>
            <input 
                type="date"
                className="form-control"
                min={date} // Set the minimum date to today
                value={datetobe}
                onChange={(e) => setDateToBe(e.target.value)}
                required
            />
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn-success">Save</button>
        </div>
      </form>
      </div>
    </div>
  );
}
