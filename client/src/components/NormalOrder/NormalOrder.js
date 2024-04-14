import React, { Component } from 'react'
import axios from "axios";
import Sidebar from '../buyerManager/sidebar/Sidebar';
import Header from '../buyerManager/header/header';
import Chart from 'chart.js/auto';
import "./style.css"

export default class NormalOrder extends Component {

    constructor(props){
        super(props)

        this.state = {
            requests:[]
        }
    } 

    componentDidMount(){
        this.retriveRequest()
        this.initializeChart(this.state.requests);
    }

    retriveRequest(){
        axios.get("http://localhost:8070/requests").then((res) =>{
            
            if(res.data.success){
                this.setState({
                    requests:res.data. existingRequest,
                }, () =>{
                    this.initializeChart(this.state.requests);
                });
                

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

    filterData(requests, searchKey){
        const result = requests.filter((request) =>
            request.rname.toLowerCase().includes(searchKey) 
            
        );
    
        this.setState({requests: result});
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;
    
        axios.get('http://localhost:8070/requests').then((res) => {
          if (res.data.success) {
            this.filterData(res.data.existingRequest, searchKey);
          }
        });
      };

    initializeChart(requests) {
        const ctxB = document.getElementById('barChart');
    
        if (!ctxB || !requests) return;
    
        if (this.chartInstance) {
          this.chartInstance.destroy(); // Destroy existing chart instance
        }
    
        const labels = requests.map((request) => request.fruit );
        const data = requests.map((request) => request.quantity);
    
        this.chartInstance = new Chart(ctxB, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Quantity',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red background
                borderColor: 'rgba(255, 99, 132, 1)', // Red border
                borderWidth: 1,
                
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Fruits',
                  color:"red"
                  
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Quantity',
                  color:"red"
                },
              },
            },
          },
        });
      }

  render() {
    return (
      <div id="main">
        <Header/>
        <Sidebar/>

        <div className='container'>

        <div id='barChartContainer' style={{ marginBottom: '5%' }}>
            Friut and Selling Quantity
            <canvas id='barChart'></canvas>

          </div>

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
                        <a className='btn' href={`/EditOrder/${requests._id}`} style={{backgroundColor: "white", width:"50px", height:"45px", borderRadius:"50%"}}>
                        <i className='fas fa-pen' style={{color:"black"}}></i>
                        </a>
                        &nbsp;
                        <a className='btn' href='# 1' onClick={() => this.onDelete(requests._id)} style={{backgroundColor: "white", width:"50px", height:"45px", borderRadius:"50%"}}>
                            <i className='fas fa-trash-alt' style={{color:"red"}}></i>
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
