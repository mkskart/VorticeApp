import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const TreeView = ({ data, selectedNode, setSelectedNode }) => {
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [clickedNode, setClickedNode] = useState(null);

  useEffect(() => {
    if (data) {
      const processNode = (node, index) => {
        node.number = index + 1;
        node.itemStyle = {
          color: node.name === selectedNode ? 'red' : 'lightblue',
        };

        if (node.children && node.children.length > 0) {
          node.children.forEach(processNode);
        }
      };

      processNode(data, 0);

      const newOption = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: [data],
            top: '-1%',
            left: '10%',
            bottom: '1%',
            right: '10%',
            symbolSize: 5,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 10,
              formatter: (params) => {
                const { data } = params;
                if (data.name) {
                  const cutName = data.name.split('_')[0];
                  return cutName;
                }
                return '';
              }
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              },
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: false,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
        ],
      };

      setOption(newOption);
      setLoading(false);
    }
  }, [data, selectedNode]);

  const handleClick = (params) => {
    const { data } = params;
    if (data.name) {
      setClickedNode(data.name);
      setSelectedNode(data.name);
      console.log(data.name);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Tree View</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ReactEcharts
          option={option || {}}
          opts={{ renderer: 'svg' }}
          style={{ width: '100%', height: '500%', margin: '0 auto' }}
          onEvents={{ click: handleClick }}
        />
      )}
    </div>
  );
};

export default TreeView;