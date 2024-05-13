// ./client\src\components\researchDashboard\body\Revenue\RevenuChart.jsx
import React, {useState} from 'react'
import Chart from 'react-apexcharts'

const VoLiChart = () => {
    const [data, setData] = useState ({
        series: [
            {
                name:'Banana',
                data: [31, 40, 28, 51, 42, 82, 56],
            },
            {
                name:'Mango',
                data: [31, 25, 28, 81, 92, 82, 66],
            },
            {
                name:'Orange',
                data: [31, 30, 70, 59, 42, 32, 96],
            },
            {
                name:'Pineapple',
                data: [31, 45, 60, 50, 35, 28, 80],
            },
        ],

        options: {
            chart: {
                height: 350,
                type: 'area',
                toolbar: {
                    show: false,
                },
            },
            markers: {
                size: 4,
            },
            colors: ['#4154f1', '#2eca6a', '#ff771d', '#ff97da'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.3,
                    opacityTo: 0.4,
                    stops: [0, 90, 100]
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            xaxis:{
                type: 'datetime',
                categories: [
                    '2017',
                    '2018',
                    '2019',
                    '2020',
                    '2021',
                    '2022',
                    '2023',
                ],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },


    });
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
}

export default VoLiChart
