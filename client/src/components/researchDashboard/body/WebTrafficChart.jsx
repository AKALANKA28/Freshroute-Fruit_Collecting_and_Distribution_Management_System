import React, {useEffect} from 'react'
import * as echarts from 'echarts'

const WebTrafficChart = () => {

    useEffect(()=> {
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
                    name: 'Campaign Performance',
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
                            value: 70,   // only this from backend
                            name: 'Market Expansion', //from backend
                        },
                        {
                            value: 65,
                            name: 'Grow Together',
                        },
                        {
                            value: 60,
                            name: 'Fruit Fest',
                        },
                        {
                            value: 60,
                            name: 'Fruit Harvest Haven',
                        },
                        {
                            value: 55,
                            name: 'FreshConnect',
                        },
                    ],
               
                },
            ],
        });
    }, []);

  return (
    <div
        id='trafficChart'
        style={{minHeight: '480px'}}
        className='echart'> 
    </div>
  );
}

export default WebTrafficChart
