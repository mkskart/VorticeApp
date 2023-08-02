import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ParallelChart = ({ data, selectedNode, setSelectedNode, selectedLine, setSelectedLine }) => {
  const chartRef = useRef(null);
  const formattedDataArray = [];

  const getNodeStyling = (name) => {
    const selected = selectedNode.includes(name);
    return {
      color: selected ? "red" : "gray",
      opacity: selected ? 1 : 0.25,
      width: selected ? 2 : 0.5,
    };
  };

  useEffect(() => {
    const parseNode = (node) => {
      const { name, children } = node;
      const dataArray = [];

      if (name) {
        const regex = /([^_]+)=([^_]+)/g;
        let match;

        while ((match = regex.exec(name)) !== null) {
          const value = match[2];
          dataArray.push(value);
        }
      }

      if (children && children.length > 0) {
        children.forEach(parseNode);
      }

      const splitArrays = [];
      const arrayLength = 19;
      let {color, opacity, width } = getNodeStyling(name);
      
      for (let i = 0; i < dataArray.length; i += arrayLength) {
        const seriesData = {
          value: dataArray.slice(i, i + arrayLength),
          "lineStyle": {
            show: true,
            width,
            opacity,
            curveness: 0,
            type: "solid",
            color
        }
        };
        splitArrays.push(seriesData);
      }
      
      formattedDataArray.push(...splitArrays);
    };

    if (data && data.children && data.children.length > 0) {
      data.children.forEach(parseNode);
    }
    const chart = echarts.init(chartRef.current);
    const option = {
      parallelAxis: [
        { dim: 0, name: "Isovalue" },
        { dim: 1, name: "Lambda2" },
        { dim: 2, name: "Lambdaci" },
        { dim: 3, name: "Q" },
        { dim: 4, name: "Delta" },
        { dim: 5, name: "Divergence" },
        { dim: 6, name: "Size" },
        { dim: 7, name: "Vorticity" },
        { dim: 8, name: "Enstrophy" },
        { dim: 9, name: "Velocity" },
        { dim: 10, name: "Acceleration" },
        { dim: 11, name: "Jacobian" },
        { dim: 12, name: "Curvature" },
        { dim: 13, name: "FullCurvature" },
        { dim: 14, name: "St" },
        { dim: 15, name: "Sp" },
        { dim: 16, name: "Sv" },
        { dim: 17, name: "Length" },
        { dim: 18, name: "Rho" }
      ],
      series: {
        type: "parallel",
        lineStyle: {
          width: 1,
        },
        data: formattedDataArray,
        animation :false
      },
    };

    chart.setOption(option);

    chart.on('click', function (params) {
      // params.dataIndex contains the index of the clicked line in the data array
      const clickedLineIndex = params.dataIndex;

      // Change the color of the clicked line to red
      formattedDataArray[clickedLineIndex].lineStyle = {
        ...formattedDataArray[clickedLineIndex].lineStyle,
        color: 'red',
        opacity: 1,
        width: 2
      };

      for (let i = 0; i < formattedDataArray.length; i++) {
        if (i !== clickedLineIndex) {
          formattedDataArray[i].lineStyle = {
            ...formattedDataArray[i].lineStyle,
            color: 'gray',
            opacity: 0.25,
            width: 0.5
          };
        }
      }

      // Refresh the chart
      chart.setOption({
        series: {
          data: formattedDataArray
        }
      });
    });


    return () => {
      chart.dispose();
    };
  }, [data, selectedNode]);

  return (
    <div>
      <h2>Parallel Chart</h2>
      <div ref={chartRef} style={{ width: "125%", height: "325px" }}></div>
    </div>
  );
};

export default ParallelChart;