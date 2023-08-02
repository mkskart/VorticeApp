import React, { useState } from 'react';
import TreeView from './components/TreeView';
import ParallelChart from './components/ParallelChart';
import ClusterScatterplot from './components/ClusterScatterplot';
import SurfaceChart from './components/SurfaceChart';
import './App.css';

const App = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [selectedNode, setSelectedNode] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const jsonData = JSON.parse(fileContent);
      setData1(jsonData);
      setData2(jsonData);
    };

    reader.readAsText(file);
  };

  return (
    <div className="app">
      <input type="file" onChange={handleFileUpload} accept="application/json" />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <SurfaceChart />
          <ParallelChart
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            data={data2}
          />
        </div>
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <ClusterScatterplot />
          <TreeView
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            data={data1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;