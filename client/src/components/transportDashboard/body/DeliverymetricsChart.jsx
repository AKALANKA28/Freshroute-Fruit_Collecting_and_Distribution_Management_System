import React, {useEffect} from 'react'
import * as echarts from 'echarts'

const DeliverymetricsChart = () => {

    useEffect(()=> {
        echarts.init(document.querySelector('#metricsChart')).setOption({
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
                    data: [
                        {
                            value: 1783,   // only this from backend
                            name: 'On Time', //from backend
                        },
                        
                        {
                            value: 484,
                            name: 'Late Delivery',
                        },
                        
                        {
                            value: 1000,
                            name: 'On The Road ',
                        },
                    ],
               
                },
            ],
        });
    }, []);

  return (
    <div
        id='metricsChart'
        style={{minHeight: '480px'}}
        className='echart'> 
    </div>
  );
}

export default DeliverymetricsChart
