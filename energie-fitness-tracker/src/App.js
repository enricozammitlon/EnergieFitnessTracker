import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from './Chart'

function App() {
  
  return (
    <div className="App">
      <div className="ChartContainer" >
        <div style={{"paddingTop":'50px'}}/>
        <Chart />
      </div>
    </div>
  );
}

export default App;
