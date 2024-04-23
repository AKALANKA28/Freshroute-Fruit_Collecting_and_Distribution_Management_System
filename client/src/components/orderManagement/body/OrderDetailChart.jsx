import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const OrderDetailChart = ({ orderDetails }) => {
  const [aggregatedData, setAggregatedData] = useState({});

  useEffect(() => {
    if (orderDetails && orderDetails.length > 0) {
      // Aggregate order status counts
      const aggregated = {};
      orderDetails.forEach(order => {
        const status = order.orderStatus;
        if (aggregated[status]) {
          aggregated[status]++;
        } else {
          aggregated[status] = 1;
        }
      });

      setAggregatedData(aggregated);
    }
  }, [orderDetails]);

  useEffect(() => {
    // Initialize or update the pie chart whenever aggregatedData changes
    if (Object.keys(aggregatedData).length > 0) {
      echarts.init(document.querySelector('#orderStatusChart')).setOption({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Order Status',
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
                formatter: '{b}: \n{c} ({d}%)', // Display order status and count
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
      <div id='orderStatusChart' style={{ minHeight: '480px' }} className='echart'></div>
  );
};

export default OrderDetailChart;
