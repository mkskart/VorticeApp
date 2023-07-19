import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts-gl';

const SurfaceChart = () => {
  const option = {
    tooltip: {},
    backgroundColor: '#fff',
    visualMap: {
      show: false,
      dimension: 2,
      min: -1,
      max: 1,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      }
    },
    xAxis3D: {
      type: 'value'
    },
    yAxis3D: {
      type: 'value'
    },
    zAxis3D: {
      type: 'value'
    },
    grid3D: {
      viewControl: {
        // projection: 'orthographic'
      }
    },
    series: [
      {
        type: 'surface',
        wireframe: {
          // show: false
        },
        equation: {
          x: {
            step: 0.1,
            min: -10,
            max: 10
          },
          y: {
            step: 0.1,
            min: -10,
            max: 10
          },
          z: function (x, y) {
            return Math.sin(x) * Math.sin(y);
          }
        }
      }
    ]
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>3D Surface Chart</h2>
      <div style={{ width: '70%', margin: '0 auto', height: '300px' }}>
        <ReactEcharts
          option={option}
          opts={{ renderer: 'canvas' }}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default SurfaceChart;