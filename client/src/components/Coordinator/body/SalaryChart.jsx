import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const SalaryChart = () => {
    // State variable to store aggregated salary data
    const [jobRoleSalaries, setJobRoleSalaries] = useState({});

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8070/salary/");
                const data = await response.json();
                // Aggregate salaries for each job role
                const aggregatedSalaries = data.reduce((acc, item) => {
                    acc[item.jobrole] = (acc[item.jobrole] || 0) + item.salary;
                    return acc;
                }, {});
                setJobRoleSalaries(aggregatedSalaries);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Convert aggregated salary data to echarts-compatible format
    const chartData = Object.entries(jobRoleSalaries).map(([jobRole, salary]) => ({
        name: jobRole,
        value: salary,
    }));

    // Define an array of colors for the job roles
    const colors = ['#606c38', '#283618', '#dda15e', '#bc6c25', '#b17a96'];

    useEffect(() => {
        const chart = echarts.init(document.querySelector('#salaryChart'));
        chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: (params) => {
                    let salary = params.value;
                    if (typeof salary === 'string') {
                        salary = parseFloat(salary.replace(/[^\d.-]/g, ''));
                    }
                    return `${params.name}: Rs.${salary.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
                },
            },
            graphic: [
                {
                    type: 'text',
                    left: '47%', 
                    top: 'middle',
                    style: {
                        text: 'Job Role',
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                },
            ],
            legend: {
                orient: 'vertical',
                right: -4,
                top: 'center',
            },
            series: [
                {
                    name: 'Salary by Job Role',
                    type: 'pie',
                    radius: ['32%', '75%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: chartData,
                    color: colors,
                },
            ],
        });
    
        // Dispose chart instance when component unmounts
        return () => {
            chart.dispose();
        };
    }, [chartData]);
    
    
    




return (
    <div
        id='salaryChart'
        style={{ width: '100%', height: '100%', minHeight: '290px', marginTop: "-55px", left: "-50px", marginBottom: "-20px" }}
        className='echart'>
    </div>
);

}

export default SalaryChart;
