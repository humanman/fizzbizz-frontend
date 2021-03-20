import React from 'react';
import './App.css';
import './Grid.css';
import Grid from './Grid';
import Login from './Login'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>FizzBizz Scheduler</p>
      </header>
      <Login/>
      <Grid/>
    </div>
  );
}

export default App;
