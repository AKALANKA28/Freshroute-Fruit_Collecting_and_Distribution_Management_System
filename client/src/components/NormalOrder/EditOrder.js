import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from '../buyerManager/sidebar/Sidebar';
import Header from '../buyerManager/header/header';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditOrder(props) {

    const { id } = useParams();
  
    // Define state variables
    const [rname, setRname] = React.useState("");
    const [fruit, setFruit] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [quality, setQuality] = React.useState("");
    const [date, setDate] = React.useState("");
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
        date
      };
  
      axios.put(`http://localhost:8070/request/update/${id}`, updateOrder)
        .then(() => {
          alert("Order Record Updated");
          navigate("/BMDashboard");
          window.location.reload();
        })
        .catch((err) => {
          console.error("Error updating order:", err);
          alert("Failed to update order. Please try again.");
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

  return (
    <div >
      <Header/>
      <Sidebar/>
      <div  style={{marginTop:"100px", width:"45%", marginLeft:"30%"}} >
      <form onSubmit={sendData}>
        <h5>Edit Normal Order</h5>
        <br></br>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Customer</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Name"
            onChange={(e) => {
              setRname(e.target.value);
            }}
            value={rname}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Fruit</label>
          <select className="form-select" aria-label="Default select example"
            onChange={(e)=>{
              setFruit(e.target.value)
            }}
            value={fruit}
          >
            <option selected>Open this select menu</option>
            <option value="Banana">Banana</option>
            <option value="Mango">Mango</option>
            <option value="Pineapple">Pineapple</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Sub Category</label>
          <select className="form-select" aria-label="Default select example"
            onChange={(e)=>{
              setCategory(e.target.value)
            }}
            value={category}
          >
            <option selected>Open this select menu</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
          </select>
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
          <select className="form-select" aria-label="Default select example"
            onChange={(e)=>{
              setQuality(e.target.value)
            }}
            value={quality}
          >
            <option selected>Open this select menu</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Date you want supplies</label>
          <input type="date" id="dateInput" name="date" max={""} value={date}
            className="form-control"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="modal-footer">
          <button type="submit" className="btn">Save</button>
        </div>
      </form>
      </div>
    </div>
  );
}
