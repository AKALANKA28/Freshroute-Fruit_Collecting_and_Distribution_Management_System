import React, { Component } from 'react'
import axios from "axios";


export default class RecentSalesTable extends Component {

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
                    requests:res.data.existingRequest
                })

                console.log(this.state.requests)
            }
        })
    }

    
  render() {
    return (
      <div style={{textAlign: 'right'}}>
         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Customer</th>
                    <th scope='col'>Fruit</th>
                    <th scope='col'>Sub Category</th>
                    
                </tr>
            </thead>

        <tbody>
            {this.state.requests.map((requests, index) =>(
                <tr key={index}>
                    <th scope='row'>{index+1}</th>
                    <td>
                        <a href= {""} style={{textDecoration:"none"}}>
                        {requests.rname}
                        </a>
                        </td>
                    <td>{requests.fruit}</td>
                    <td>{requests.category}</td>
                    
                   
                </tr>
            ))}
    
        </tbody>
         </table>

        
      </div>
    )
  }
}