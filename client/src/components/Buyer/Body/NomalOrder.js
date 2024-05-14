import React, { Component } from 'react'
import axios from "axios";
import "./style.css"
import Swal from 'sweetalert2';
import BuyerEdit from './BuyerEdit';


export default class NormalOrder extends Component {

    constructor(props){
        super(props)

        this.state = {
            requests:[],
            orderCount: 0,
        }
    } 

    componentDidMount(){
        this.retriveRequest()
        
    }

    retriveRequest(){
        axios.get("http://localhost:8070/requests").then((res) =>{
            
            if(res.data.success){
                const existingRequest = res.data.existingRequest;
                this.setState({
                    requests:existingRequest, 
                    orderCount: existingRequest.length
                });
                console.log(this.state.requests)
            }
        })
    }


    onDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this order!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8070/request/delete/${id}`)
                    .then((res) => {
                        if (res.data.success) {
                            this.retriveRequest();
                            Swal.fire('Deleted!', 'Your order has been deleted.', 'success');
                        } else {
                            throw new Error('Delete operation failed');
                        }
                    })
                    .catch((err) => {
                        console.error('Error deleting request:', err);
                        Swal.fire('Error!', 'Failed to delete order.', 'error');
                    });
            }
        });
    };
    
    
    

    filterData(requests, searchKey){
        const result = requests.filter((request) =>
            request.rname.toLowerCase().includes(searchKey) ||
            request.fruit.toLowerCase().includes(searchKey)
            
        );
    
        this.setState({requests: result, orderCount:result.length});
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
    
        axios.get('http://localhost:8070/requests').then((res) => {
          if (res.data.success) {
            this.filterData(res.data.existingRequest, searchKey);
          }
        });
      };

      orderColor = (orderStatus) => {
        let color;

        if(orderStatus==="REQUEST"){
            color = "tomato"
        }else{
            color = "green"
        }
        return {color};
      }

  render() {
    return (
      <div id="main">
        

        <div className='container' style={{marginLeft:"-5%", marginTop:'4%'}}>

          <div className='col-lg-3 mt-2 mb-2'>
            <input
              className='form-control'
              type='search'
              placeholder='Search'
              name='serchQuery'
              style={{ marginLeft: '20px', borderRadius: '20px' }}
              onChange={this.handleSearchArea}
            />
          </div>

          <div id="supplierCount">
                <div className='card-body'>
                    <h5 className='card-title' id="orderCardTitile" >✅ No. OF ORDERS : <span id="cardText"> {this.state.orderCount} </span></h5>        
                </div>
        </div>

         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Customer</th>
                    <th scope='col'>Fruit</th>
                    <th scope='col'>Sub Category</th>
                    <th scope='col'>Quality</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                    
                </tr>
            </thead>

        <tbody>
            {this.state.requests.map((requests, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>{requests.rname}</td>
                    <td>{requests.fruit}</td>
                    <td>{requests.category}</td>
                    <td>{requests.quantity}</td>
                    <td>{requests.quality}</td>
                    <td>{requests.datetobe}</td>
                    <td style={this.orderColor(requests.orderStatus)}>{requests.orderStatus}</td>
                    <td>
  {requests.orderStatus === "REQUEST" ? (
    <a
      className='btn'
      href={`./BuyerEdit/${requests._id}`}
      style={{ backgroundColor: "white", width: "50px", height: "45px", borderRadius: "50%" }}
    >
      <i className='fas fa-pen' style={{ color: "black" }}></i>
    </a>
  ) : null}
  &nbsp;
  <a
    className='btn'
    href='# 1'
    onClick={() => this.onDelete(requests._id)}
    style={{ backgroundColor: "white", width: "50px", height: "45px", borderRadius: "50%" }}
  >
    <i className='fas fa-trash-alt' style={{ color: "red" }}></i>
  </a>
</td>

                </tr>
            ))}
    
        </tbody>
         </table>    
        
      </div>
      </div>
    )
  }
}
