import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { base_url } from "../../../Utils/Config";

const ReportCharts = ({ filter }) => {
  const [data, setData] = useState({
    series: [],
    options: {
      chart: {
        height: 310,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 4,
      },
      colors: ["#283739", "#a2c11c", "#f8b400"],
      fill: {
        type: "gradient",
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
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let startDate, endDate;

        if (filter === "Today") {
          // Calculate today's start and end time
          const today = new Date();
          startDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,
            0,
            0
          );
          endDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59,
            59
          );
        } else if (filter === "This Week") {
          // Calculate start of the current week (Sunday)
          const today = new Date();
          const dayOfWeek = today.getDay();
          const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 0); // Adjust when Sunday
          const startOfWeek = new Date(today.setDate(diff));
          startOfWeek.setHours(0, 0, 0, 0);

          // Calculate end of the current week (Saturday)
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          startDate = startOfWeek;
          endDate = endOfWeek;
        } else if (filter === "This Month") {
          // Calculate start and end of the current month
          const today = new Date();
          const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1,
            0,
            0,
            0
          );
          const lastDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0,
            23,
            59,
            59
          );
          startDate = firstDayOfMonth;
          endDate = lastDayOfMonth;
        } else if (filter === "This Year") {
          // Calculate start and end of the current year
          const today = new Date();
          const firstDayOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0);
          const lastDayOfYear = new Date(
            today.getFullYear(),
            11,
            31,
            23,
            59,
            59
          );
          startDate = firstDayOfYear;
          endDate = lastDayOfYear;
        }

        // Fetch sales data
        const salesReq = await fetch(
          `${base_url}user/allorders/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const salesData = await salesReq.json();
        const salesSeries = salesData.map((item) => ({
          x: new Date(item.createdAt).getTime(), // Use the date object directly
          y: (item?.totalPrice * 2) / 100 + item?.totalPrice,
        }));

        // Fetch expense data
        const expenseReq = await fetch(
          `${base_url}expense/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        );
        const expenseData = await expenseReq.json();
        const expenseSeries = expenseData.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.amount,
        }));
        // Fetch revenue data
        // const revenueReq = await fetch(
        //   `${base_url}revenue/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        // );
        // const revenueData = await revenueReq.json();
        // const revenueSeries = Array.isArray(revenueData)
        //   ? revenueData.map((item) => ({
        //       x: new Date(item.date).getTime(),
        //       y: item.totalRevenue,
        //     }))
        //   : [];
        // Hardcoded revenue data for the given timestamps
        const revenueSeries = [
          { x: new Date("2024-05-07T18:30").getTime(), y: 25000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-07T20:04").getTime(), y: 76500 },
          { x: new Date("2024-05-07T21:22").getTime(), y: 10200 }, // Sum of previous amount (76500) + current amount (25500)
          { x: new Date("2024-05-07T23:04").getTime(), y: 15300 }, // Sum of previous amount (102000) + current amount (51000)
          { x: new Date("2024-05-08T00:33").getTime(), y: 30000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T15:21").getTime(), y: 10000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T02:05").getTime(), y: 20000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T03:20").getTime(), y: 76500 },
          { x: new Date("2024-05-08T05:06").getTime(), y: 10200 }, // Sum of previous amount (76500) + current amount (25500)
          { x: new Date("2024-05-08T07:06").getTime(), y: 15300 }, // Sum of previous amount (102000) + current amount (51000)
          { x: new Date("2024-05-08T07:30").getTime(), y: 30000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T09:59").getTime(), y: 10000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T10:32").getTime(), y: 15300 }, // Sum of previous amount (102000) + current amount (51000)
          { x: new Date("2024-05-08T11:08").getTime(), y: 30000 }, // No revenue data available for this timestamp
          { x: new Date("2024-05-08T13:07").getTime(), y: 49027 }, // No revenue data available for this timestamp
        ];

        // console.log('Start Date:', startDate);
        // console.log('End Date:', endDate);
        // console.log('Sales Data:', salesData);
        // console.log("Expense Data:", revenueData);
        setData((prevState) => ({
          ...prevState,
          series: [
            { name: "Sales", data: salesSeries },
            { name: "Expense", data: expenseSeries },
            { name: "Revenue", data: revenueSeries },
          ],
          options: {
            ...prevState.options,
            xaxis: {
              ...prevState.options.xaxis,
              min: startDate.getTime(),
              max: endDate.getTime(),
            },
          },
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
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
