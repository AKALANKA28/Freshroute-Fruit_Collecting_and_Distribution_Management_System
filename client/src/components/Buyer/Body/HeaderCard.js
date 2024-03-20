import React,{useState, useEffect} from "react";
import axios from "axios";


export default function () {
    const [rname, setRname] = useState("");
    const [fruit, setFruit] = useState("");
    const [category, setCategory] = useState("PID");
    const [quantity, setQuantity] = useState("");
    const [quality, setQuality] = useState("");
    const [date, setDate] = useState("");
    

    function sendData(a){


        a.preventDefault();
        const newOrder = {
              rname,
              fruit,
              category,
              quantity,
              quality,
              date,
        }
              
      
          axios.post("http://localhost:8070/request/save", newOrder).then(() =>{
              alert("Order Record Added") 
          }).catch((err)=>{
              alert(err)
          })
      
      
      }

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
    
  return (
    <div>
         <div className='container' style={{marginLeft:"20px", marginTop:"-100px"}}>
        <div className='row'>
            <div className="col">
            <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">Payment</h5>
    <p class="card-text">RS. 2000.00</p>

  </div>
</div>
            </div>
            <div className='col'>
            <div class="card" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">Total Order</h5>
    <p class="card-text">10</p>

  </div>
</div>
            </div>

            <div className='col'>
                <a href='#1'>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{width:"200px", height:"70px", borderRadius:"25px", backgroundColor:"#76B81F", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", border:"none"}} >Custom Order</button>
                </a>
            </div>

            <div className='col'>
            <a href='#1'>
                <button style={{width:"200px", height:"70px", borderRadius:"25px", backgroundColor:"#FFBB38", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", border:"none"}}>Track Order</button>
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
        
        onChange={(e) => {
            setRname(e.target.value);
        }}
    />
</div>

        <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Fruit</label>
        <select class="form-select" aria-label="Default select example"
          onChange={(e)=>{
            setFruit(e.target.value)
          }}
        >
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>

<div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Sub Category</label>
        <select class="form-select" aria-label="Default select example"
          onChange={(e)=>{
            setCategory(e.target.value)
          }}
        >
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>

<div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Quantity</label>
        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Enter Quantity"
        max={"2000"} min={"1"}
        onChange={(e) => {
            setQuantity(e.target.value);
        }}
    />
</div>

<div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">Quality</label>
        <select class="form-select" aria-label="Default select example"
          onChange={(e)=>{
            setQuality(e.target.value)
          }}
        >
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
</div>

<div className="mb-3">
    <label htmlFor="dateInput" className="form-label">Date you want supplies</label>
    <input type="date" id="dateInput" name="date" max={""} value={date}
    className="form-control"
     onChange={(e) => setDate(e.target.value)}
      required/>
  </div>

        
      </div>
      <div class="modal-footer">
        
        <button type="submit" class="btn">Save changes</button>
       
      </div>
      </form>
    </div>
  </div>
</div>

      </div>
    </div>
  )
}

