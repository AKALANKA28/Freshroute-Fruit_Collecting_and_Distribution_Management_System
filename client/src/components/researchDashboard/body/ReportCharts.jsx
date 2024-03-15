import React, {useState} from 'react'
import Chart from 'react-apexcharts'

const ReportCharts = () => {
    const [data, setData] = useState ({
        series: [
            {
                name:'Sales',
                data: [31, 40, 28, 51, 42, 82, 56],
            },
            {
                name:'Revenue',
                data: [31, 0, 28, 81, 92, 82, 66],
            },
            {
                name:'Customers',
                data: [31, 30, 70, 59, 42, 32, 96],
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
            colors: ['#4154f1', '#2eca6a', '#ff771d'],
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
                    '2018-09-19T00:00:000Z',
                    '2018-09-19T01:30:000Z',
                    '2018-09-19T02:30:000Z',
                    '2018-09-19T03:30:000Z',
                    '2018-09-19T04:30:000Z',
                    '2018-09-19T05:30:000Z',
                    '2018-09-19T06:30:000Z',
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

export default ReportCharts
