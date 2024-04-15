import React, {useEffect, useState} from 'react'
import * as echarts from 'echarts'

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

    //chart
    useEffect(()=> {

        echarts.init(document.querySelector('#expenseChart')).setOption({
            tooltip: {
               trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap : false,
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
               
                },
            ],
        });
        
    }, [chartData]);

  return (
    <div
        id='expenseChart'
        style={{minHeight: '480px'}}
        className='echart'> 
    </div>
  );
}

export default WebTrafficChart
