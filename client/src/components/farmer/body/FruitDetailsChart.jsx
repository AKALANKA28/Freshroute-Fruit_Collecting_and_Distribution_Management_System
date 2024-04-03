import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const FruitDetailsChart = ({ predictionData }) => {
  useEffect(() => {
    if (predictionData && predictionData.length > 0) {
      const fruitTypes = predictionData.map(prediction => prediction.fruitType);
      const quantities = predictionData.map(prediction => prediction.quantity);

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
            data: fruitTypes.map((fruitType, index) => ({
              value: quantities[index],
              name: fruitType,
            })),
          },
        ],
      });
    }
  }, [predictionData]);

  return (
    <div id='trafficChart' style={{ minHeight: '480px' }} className='echart'></div>
  );
};

export default FruitDetailsChart;