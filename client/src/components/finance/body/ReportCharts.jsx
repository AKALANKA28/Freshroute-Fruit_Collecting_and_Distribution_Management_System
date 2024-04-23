import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { base_url } from '../../../Utils/Config';

const ReportCharts = ({ filter }) => {
    const [data, setData] = useState({
        series: [],
        options: {
            chart: {
                height: 310,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            markers: {
                size: 4,
            },
            colors: ['#283739', '#a2c11c', '#f8b400'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let startDate, endDate;

                if (filter === 'Today') {
                    const today = new Date();
                    startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
                    endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
                } else if (filter === 'This Month') {
                    const today = new Date();
                    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
                    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
                    startDate = firstDayOfMonth;
                    endDate = lastDayOfMonth;
                } else if (filter === 'This Year') {
                    const today = new Date();
                    const firstDayOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
                    const lastDayOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
                    startDate = firstDayOfYear;
                    endDate = lastDayOfYear;
                }
                
                

                // Fetch sales data
                const salesReq = await fetch(`${base_url}sales/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                const salesData = await salesReq.json();
                const salesSeries = salesData.map(item => 
                    ({ x: 
                        new Date(item.date).getTime(), 
                        y:
                         item.amount
                    }));

                // Fetch expense data
                const expenseReq = await fetch(`${base_url}expense/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
                const expenseData = await expenseReq.json();
                const expenseSeries = expenseData.map(item => 
                    ({ x: 
                        new Date(item.date).getTime(),
                       y: 
                        item.amount
                     }));

                setData(prevState => ({
                    ...prevState,
                    series: [
                        { name: 'Sales', data: salesSeries },
                        { name: 'Expense', data: expenseSeries }
                    ],
                    options: {
                        ...prevState.options,
                        xaxis: { ...prevState.options.xaxis,
                                 min: startDate.getTime(),
                                 max: endDate.getTime() },
                    },
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filter]);

    return (
        <div>
            <Chart
                options={data.options}
                series={data.series}
                type={data.options.chart.type}
                height={data.options.chart.height}
            />
        </div>
    );
};

export default ReportCharts;
