import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const WebTrafficChart = () => {
    // State variable to store aggregated expense data
    const [categoryExpenses, setCategoryExpenses] = useState({});

    // Fetch data from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8070/expense/");
                const data = await response.json();
                // Aggregate expenses for each category
                const aggregatedExpenses = data.reduce((acc, item) => {
                    acc[item.category] = (acc[item.category] || 0) + item.amount;
                    return acc;
                }, {});
                setCategoryExpenses(aggregatedExpenses);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Convert aggregated expense data to echarts-compatible format
    const chartData = Object.entries(categoryExpenses).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));

    // Define an array of colors for the categories
    const colors = ['#606c38', '#283618', '#fefae0', '#dda15e', '#bc6c25'];

    // Chart
    useEffect(() => {
        echarts.init(document.querySelector('#expenseChart')).setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                right: -4,
                top: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['37%', '65%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'center',
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
                    // Set colors for each category
                    color: colors,
                },
            ],
        });
    }, [chartData]);

    return (
        <div
            id='expenseChart'
            style={{ width: '400px', height: '290px', minHeight: '290px', marginTop: "-55px", left: "-40px", marginBottom: "-20px" }}
            className='echart'>
        </div>
    );
}

export default WebTrafficChart;
