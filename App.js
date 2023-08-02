import React, { useState } from 'react';
import TreeView from './components/TreeView';
import ParallelChart from './components/ParallelChart';
import ClusterScatterplot from './components/ClusterScatterplot';
import ThreeJS from './components/ThreeJS';
import './App.css';

const App = () => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [selectedNode, setSelectedNode] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);

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
          <center><ThreeJS width={1000} height={500}/></center>
          <ParallelChart
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            selectedLine={selectedLine}
            setSelectedLine={setSelectedLine}
            data={data2}
          />
        </div>
        <div style={{ flex: 1, backgroundColor: 'white' }}>
          <ClusterScatterplot />
          <TreeView
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            setSelectedLine={setSelectedLine}
            data={data1}
          />
        </div>
      </div>
    </div>
  );
}

export default App;