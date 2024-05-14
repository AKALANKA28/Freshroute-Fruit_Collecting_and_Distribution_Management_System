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
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Salary by Job Role',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
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
                    // Use colors variable here
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
        <div id='salaryChart' style={{ minHeight: '480px' }} className='echart'>
        </div>
    );
}

export default SalaryChart;
