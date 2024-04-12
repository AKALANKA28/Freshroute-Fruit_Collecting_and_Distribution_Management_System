import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const FruitDetailsChart = ({ predictionData }) => {
  const [aggregatedData, setAggregatedData] = useState({});

  useEffect(() => {
    if (predictionData && predictionData.length > 0) {
      const fruits = predictionData.map(prediction => prediction.fruit);
      const quantities = predictionData.map(prediction => prediction.quantity);

      // Aggregate quantities for each fruit
      const aggregated = {};
      fruits.forEach((fruit, index) => {
        if (aggregated[fruit]) {
          aggregated[fruit] += quantities[index];
        } else {
          aggregated[fruit] = quantities[index];
        }
      });

      setAggregatedData(aggregated);
    }
  }, [predictionData]);

  useEffect(() => {
    // Initialize or update the pie chart whenever aggregatedData changes
    if (Object.keys(aggregatedData).length > 0) {
      echarts.init(document.querySelector('#trafficChart')).setOption({
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
            data: Object.entries(aggregatedData).map(([fruit, quantity]) => ({
              value: quantity,
              name: fruit,
            })),
          },
        ],
      });
    }
  }, [aggregatedData]);

  return (
    <div id='trafficChart' style={{ minHeight: '480px' }} className='echart'></div>
  );
};

export default FruitDetailsChart;