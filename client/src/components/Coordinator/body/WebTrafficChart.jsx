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
                            value: 1048,   // only this from backend
                            name: 'Search Engine', //from backend
                        },
                        {
                            value: 735,
                            name: 'Direct',
                        },
                        {
                            value: 484,
                            name: 'Email',
                        },
                        {
                            value: 300,
                            name: 'Union Ads',
                        },
                        {
                            value: 700,
                            name: 'Video Ads',
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
