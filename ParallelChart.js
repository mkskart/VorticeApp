import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const ParallelChart = ({ data, selectedNode, setSelectedNode }) => {
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

      // if(selectedNode.length > 0) {
      //   if(selectedNode.includes(name)) {
      //     color = "red"
      //     opacity = 1
      //     width = 2
      //   } else {
      //     color = "gray"
      //     opacity = 0.25
      //     width = 0.5
      //   }
      // }
      
      for (let i = 0; i < dataArray.length; i += arrayLength) {
        //splitArrays.push(dataArray.slice(i, i + arrayLength));
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
        data: formattedDataArray
      },
    };

    chart.setOption(option);
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