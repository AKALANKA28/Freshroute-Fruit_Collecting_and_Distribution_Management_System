import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios'; // Import axios for HTTP requests

const WebTrafficChart = ({ dataList }) => {
    // State variable to store aggregated employee count data
    const [employeeCounts, setEmployeeCounts] = useState({});

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming the endpoint for fetching employee data is "/Employee/"
                const response = await axios.get("http://localhost:8070/Employee/");
                const data = response.data;

                // Aggregate employee count for each job role
                const aggregatedCounts = data.reduce((acc, employee) => {
                    acc[employee.jobrole] = (acc[employee.jobrole] || 0) + 1;
                    return acc;
                }, {});
                setEmployeeCounts(aggregatedCounts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [dataList]); // Include dataList in the dependency array if it's needed to trigger re-fetching

    // Convert aggregated employee count data to echarts-compatible format
    const chartData = Object.entries(employeeCounts).map(([jobRole, count]) => ({
        name: jobRole,
        value: count,
    }));

    // Define an array of colors for the job roles
    const colors = ['#0047b3', '#e60000','#ffcc00','#00b300', '#ff0055'];

    // Chart
    useEffect(() => {
        echarts.init(document.querySelector('#employeeChart')).setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '1%',
               left:'center'
               
            },
            series: [
                {
                    name: 'Employee Count',
                    type: 'pie',
                    radius: ['40%', '70%'], // Set the radius to a percentage to maximize the size of the pie chart
                    center: ['50%', '50%'], // Center the pie chart within the container
                    avoidLabelOverlap: false,
                    label: {
                        show: false, // Set show to false to hide the labels inside the pie chart
                        position: 'center',
                        formatter: '{b}: {c}', // Set formatter to an empty string to remove the job role name from inside the pie chart
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: chartData,
                    // Set colors for each job role
                    color: colors,
                },
            ],
        });
    }, [chartData]);

    return (
        <div
            id='employeeChart'
            style={{minHeight: '400px'}}       
                 className='echart'>
        </div>
    );
}

export default WebTrafficChart;
