import React, { Component } from 'react'
import axios from "axios";
import Sidebar from '../buyerManager/sidebar/Sidebar';
import Header from '../buyerManager/header/header';


export default class RequestedOrder  extends Component {

    constructor(props){
        super(props)

        this.state = {
            requests:[]
        }
    } 

    componentDidMount(){
        this.retriveRequest()
    }

    retriveRequest(){
        axios.get("http://localhost:8070/requests").then((res) =>{
            if(res.data.success){
                this.setState({
                    requests:res.data. existingRequest
                })

                console.log(this.state.requests)
            }
        })
    }


    onDelete = (id) =>{
        const isConfirmed = window.confirm('Are you sure you want to delete this Order?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/request/delete/${id}`)
                .then((res) => {
                    this.retriveRequest();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }



  render() {
    return (
      <div >
        <Header/>
        <Sidebar/>
        
        <div id='main'>
        <div className='container' style={{marginTop:"100px", position:"relative"}}>
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
                    <td>{requests.date}</td>
                    <td>
                        <a className='btn' href={"#1"} style={{backgroundColor: "green", width:"80px", height:"40px", borderRadius:"25px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}>
                        Confirm
                        </a>
                        &nbsp;
                        <a className='btn' href='# 1' onClick={() => this.onDelete(requests._id)} style={{backgroundColor: "red", width:"80px", height:"40px", borderRadius:"25px", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}>
                            Reject
                        </a>
                    </td>
                </tr>
            ))}
    
        </tbody>
         </table>    
        
      </div>
      </div>
      </div>
    )
  }
}