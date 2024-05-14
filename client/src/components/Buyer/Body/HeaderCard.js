import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import BuyerOrder from "./NomalOrder";
import Swal from 'sweetalert2';

export default function () {
    const [rname, setRname] = useState("");
    const [fruit, setFruit] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [quality, setQuality] = useState("");
    const [date, setDate] = useState("");
    const [datetobe, setDateToBe] = useState("");
    const [subcategoryOptions, setSubcategoryOptions] = useState([]); // State to hold subcategory options
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get the current date
        var currentDate = new Date();

        // Set the maximum date attribute for the input to the current date
        var year = currentDate.getFullYear();
        var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        var day = currentDate.getDate().toString().padStart(2, '0');
        var maxDate = `${year}-${month}-${day}`;

        // Update the input element
        var dateInput = document.getElementById('dateInput');
        dateInput.setAttribute('max', maxDate);
        dateInput.setAttribute('min', maxDate); // Set the minimum date to the current date
    }, []);

    useEffect(() => {
      switch (fruit) {
          case "Banana":
              setSubcategoryOptions(["Kolikuttu", "Seeni", "Ambul"]);
              break;
          case "Mango":
              setSubcategoryOptions(["Alponsu", "Vilad"]);
              break;
          case "Orange":
              setSubcategoryOptions(["Mandarin"]);
              break;
          case "Pineapple":
              setSubcategoryOptions(["Mauritius"]);
              break;
          case "Woodapple":
              setSubcategoryOptions(["Sweet"]);
              break;
          default:
              setSubcategoryOptions([]);
              break;
      }
  }, [fruit]);

    function sendData(a) {
        a.preventDefault();
        const newOrder = {
            rname,
            fruit,
            category,
            quantity,
            quality,
            date,
            datetobe,
        };

        axios.post("http://localhost:8070/request/save", newOrder)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Order Record Added',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate("/BuyerDashboard");
                    window.location.reload();
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message || 'Failed to add order',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    }

    return (
        <div id="main">
            <div className='container' style={{ marginTop: "5%" }}>
                <div className='row'>
                    <div className="col">
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Payment</h5>
                                <p class="card-text">RS. 2000.00</p>

                            </div>
                        </div>
                    </div>
                    <div className='col'>
                        <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                                <h5 class="card-title">Total Order</h5>
                                <p class="card-text">10</p>

                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <a href='#1'>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ width: "200px", height: "70px", borderRadius: "25px", backgroundColor: "#76B81F", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", border: "none" }} >Custom Order</button>
                        </a>
                    </div>

                    <div className='col'>
                        <a href='#1'>
                            <button style={{ width: "200px", height: "70px", borderRadius: "25px", backgroundColor: "#FFBB38", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", border: "none" }}>Track Order</button>
                        </a>
                    </div>
                </div>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Custom Order</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={sendData}>
                                <div class="modal-body">

                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Customer</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter Customer Name"
                                            pattern="[A-Za-z\s]+" title="Please enter only letters and spaces" required
                                            onKeyPress={(e) => {
                                                const pattern = /[a-zA-Z\s]/; // Regular expression to match letters and spaces
                                                if (!pattern.test(e.key)) {
                                                    e.preventDefault(); // Prevents the input of characters other than letters and spaces
                                                }
                                            }}

                                            onChange={(e) => {
                                                setRname(e.target.value);
                                            }}
                                        />
                                        {!/^[A-Za-z\s]+$/.test(rname) && (
                                            <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>Please enter only letters and spaces</p>)}
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Fruit</label>
                                        <select class="form-select" aria-label="Default select example"
                                            onChange={(e) => {
                                                setFruit(e.target.value);
                                            }}
                                            required

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
                                        <label for="exampleInputPassword1" className="form-label">Sub Category</label>
                                        <select class="form-select" aria-label="Default select example"
                                            onChange={(e) => {
                                                setCategory(e.target.value);
                                            }}
                                            required
                                        >
                                            <option selected>Open this select menu</option>
                                            {subcategoryOptions.map(option => (
                                                <option value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Quantity (Kg) </label>
                                        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
                                            min={"1"}
                                            max={"300"}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label for="exampleInputPassword1" className="form-label">Quality</label>
                                        <select class="form-select" aria-label="Default select example"
                                            onChange={(e) => {
                                                setQuality(e.target.value)
                                            }}
                                            required
                                        >
                                            <option selected>Open this select menu</option>
                                            <option value="A">A</option>
                                            <option value="B">B</option>
                                            <option value="C">C</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="dateInput" className="form-label">Order placed date</label>
                                        <input type="date" id="dateInput" name="date" max={""} value={date}
                                            className="form-control"
                                            onChange={(e) => setDate(e.target.value)}
                                            required />
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

                                </div>
                                <div class="modal-footer">

                                    <button type="submit" class="btn btn-success">Request for Order</button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <BuyerOrder />
        </div>
    )
}
