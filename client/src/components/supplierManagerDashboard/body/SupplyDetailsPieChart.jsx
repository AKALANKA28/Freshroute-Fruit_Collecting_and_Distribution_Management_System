import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from "axios";

const SupplyDetailsPieChart = () => {
  const [aggregatedData, setAggregatedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get("/pendingSupply/totalPendingSupplies");
        const approvedResponse = await axios.get("/acceptedSupply/totalApprovedSupplies");
        const declinedResponse = await axios.get("/declinedSupply/totalDeclinedSupplies");

        const pendingCount = pendingResponse.data.count;
        const approvedCount = approvedResponse.data.count;
        const declinedCount = declinedResponse.data.count;

        setAggregatedData({
          "Pending": pendingCount,
          "Approved": approvedCount,
          "Declined": declinedCount
        });
      } catch (err) {
        alert(err.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Initialize or update the pie chart whenever aggregatedData changes
    if (Object.keys(aggregatedData).length > 0) {
      echarts.init(document.querySelector('#supplyPieChart')).setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Supply Status',
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
            data: Object.entries(aggregatedData).map(([status, count]) => ({
              value: count,
              name: status,
            })),
          },
        ],
      });
    }
  }, [aggregatedData]);

  return (
    <div id='supplyPieChart' style={{ minHeight: '480px' }} className='echart'></div>
  );
};

export default SupplyDetailsPieChart;
