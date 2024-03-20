import React, { useState } from "react";
import Chart from "react-apexcharts";

const EmployeeStatCharts = () => {
  const [data, setData] = useState({
    series: [
      {
        name: "Last Year",
        data: [31, 40, 28, 51, 42, 42, 56, 60, 62, 65, 70, 92],
      },
      {
        name: "This Year",
        data: [31, 5, 28, 81, 92, 82, 66, 70, 76, 82, 83, 96],
      },
    ],

    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#4154f1", "#2eca6a", "#ff771d"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.4,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "String",
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "April",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
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
};

export default EmployeeStatCharts;
