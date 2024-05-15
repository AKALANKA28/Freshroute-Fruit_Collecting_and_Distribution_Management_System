import React, { Component } from 'react'
import axios from "axios";
import Sidebar from '../buyerManager/sidebar/Sidebar';
import Header from '../buyerManager/header/header';
import "./style.css"
import PdfButton from '../buyerManager/PdfButton';
import Swal from 'sweetalert2';

export default class NormalOrder extends Component {

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
        axios.get("http://localhost:8070/requests/normal").then((res) =>{
            
            if(res.data.success){
                this.setState({
                    requests:res.data. existingRequest,
                });
                

                console.log(this.state.requests)
            }
        })
    }


    

    filterData(requests, searchKey){
        const result = requests.filter((request) =>
            request.rname.toLowerCase().includes(searchKey) ||
            request.fruit.toLowerCase().includes(searchKey) 
            
        );
    
        this.setState({requests: result});
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
    
        axios.get('http://localhost:8070/requests/normal').then((res) => {
          if (res.data.success) {
            this.filterData(res.data.existingRequest, searchKey);
          }
        });
      };

      
    

  render() {
    return (
      <div id="main" style={{marginTop:"1%"}}>
        <Header/>
        <Sidebar/>

        <div className='container'>


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

         <table className='table table-hover'>
            <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Customer</th>
                    <th scope='col'>Fruit</th>
                    <th scope='col'>Sub Category</th>
                    <th scope='col'>Quality</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Due Date</th>
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
                       <PdfButton request={requests}/>
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
