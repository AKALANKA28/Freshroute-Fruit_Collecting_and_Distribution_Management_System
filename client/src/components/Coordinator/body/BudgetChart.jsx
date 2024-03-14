import React, {useEffect} from 'react'
import * as echarts from 'echarts'


const BudgetChart = () => {

    useEffect(()=> {
        echarts.init(document.querySelector('#budgetChart')).setOption({
            legend: {
                data: ['Allocated Budget', 'Actual Spending'],
            },
            radar: {
                shape: 'circle',
                indicator: [
                    {
                        name: 'Sales',
                        max: 95000,
                    },
                    {
                        name: 'Administration',
                        max: 95000,
                    },
                    {
                        name: 'Transportation',
                        max: 95000,
                    },
                    {
                        name: 'bla bla',
                        max: 95000,
                    },
                    {
                        name: 'Marketing',
                        max: 95000,
                    },
                    {
                        name: 'bla bla',
                        max: 95000,
                    },
                ],
            },

            series: [
                {
                    name: 'Budget vs Spending',
                    type: 'radar',
                    data: [
                        {
                            value: [67000, 52000, 32000, 60000, 90000, 70000],
                            name: 'Allocated Budget',
                        },
                        {
                            value: [50000, 65000, 60000, 53000, 80000, 65000],
                            name: 'Actual Spending',
                        },
                    ],
                },
            ],
        });
    }, []);
  return (
    <div
        id='budgetChart'
        style={{minHeight: '480px'}}
        className='echart'>
    </div>
  );
}

export default BudgetChart
