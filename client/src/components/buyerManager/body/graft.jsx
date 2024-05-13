import React, { Component } from 'react'
import axios from "axios";
import Chart from 'chart.js/auto';


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


   


   

      initializeChart(requests) {
        const ctxB = document.getElementById('barChart');
    
        if (!ctxB || !requests) return;
    
        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy existing chart instance
        }
    
        const fruitMap = new Map();
        // Aggregate quantities by fruit
        requests.forEach(request => {
            const quantity = parseFloat(request.quantity); // Ensure quantity is parsed as a float
            if (fruitMap.has(request.fruit)) {
                fruitMap.set(request.fruit, fruitMap.get(request.fruit) + quantity);
            } else {
                fruitMap.set(request.fruit, quantity);
            }
        });
    
        const labels = Array.from(fruitMap.keys());
        const data = Array.from(fruitMap.values());
        const colors = []; // Array to hold colors for each bar
    
        // Generate random colors for each bar
        for (let i = 0; i < labels.length; i++) {
            const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
            colors.push(randomColor);
        }
    
        this.chartInstance = new Chart(ctxB, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Quantity',
                    data: data,
                    backgroundColor: colors, // Use colors array
                    borderWidth: 1,
                }, ],
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
                            color: "red"
                        },
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Quantity',
                            color: "red"
                        },
                    },
                },
            },
        });
    }
    
    

  render() {
    return (
      <div id="">

        <div className='container card col-xl-12' >

        <div id='barChartContainer' style={{ marginBottom: '5%' }}>
            Friut and Selling Quantity
            <canvas id='barChart'></canvas>

          </div>

          </div>
      </div>
    )
  }
}
