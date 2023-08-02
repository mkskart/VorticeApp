import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';

const TreeView = ({ data, selectedNode, setSelectedNode }) => {
  const [loading, setLoading] = useState(true);
  const [option, setOption] = useState(null);
  const [ctrlKey, setCtrlKey] = useState(false);

  useEffect(() => {
    if (data) {
      const processNode = (node, index) => {
        node.number = index + 1;
        node.itemStyle = {
          color: selectedNode.includes(node.name) ? 'red' : 'lightblue',
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
            animationDuration: 0,
            animationDurationUpdate: 0
          },
        ],
      };

      setOption(newOption);
      setLoading(false);
    }
  }, [data, selectedNode]);

  const handleClick = (params, ctrlKey) => {
    const { data } = params;
    if (data.name) {
      const clickedNodeName = data.name;
      let updatedSelectedNode;

      if (ctrlKey) {
        updatedSelectedNode = selectedNode.includes(clickedNodeName)
          ? selectedNode.filter((name) => name !== clickedNodeName)
          : [...selectedNode, clickedNodeName];
      } else {
        updatedSelectedNode = [clickedNodeName]; // Replace the current name with the new node clicked
      }

      setSelectedNode(updatedSelectedNode);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        setCtrlKey(true);
      }
    };

    const handleKeyUp = (event) => {
      if (!event.ctrlKey && !event.metaKey) {
        setCtrlKey(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
          onEvents={{ 
            click: (params) => {
              handleClick(params, ctrlKey);
            } 
          }}
        />
      )}
    </div>
  );

};

export default TreeView;