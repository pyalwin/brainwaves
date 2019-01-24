import React, { Component } from 'react';
import { Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import Header from './components/Header';
import StockChartContainer from './containers/stockChartContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grommet theme={hpe}>
        <Header />
        <StockChartContainer />
      </Grommet>
    );
  }
}

export default App;
