import React, { Component } from 'react';
import { Distribution, Box } from 'grommet';
import StockChart from '../components/stockChart';
import StockTable from '../components/stockTable';


export default class StockChartContainer extends Component {
  state = {
    layout: [
      {'value': 40, 'child': StockTable, 'color': 'light-3'},
      {'value': 60, 'child': StockChart, 'color': 'neutral-1'},
    ],
    selectedSymbol: '',
    selectedData: [],
    selectedIndex: '',
    loading: false,
  }

  updateSelection = (symbol, data, index, loading) => {
    this.setState({selectedSymbol: symbol, selectedData: data, selectedIndex: index, loading: loading})
  }


  render(){
    return(
      <Distribution
        basis="medium"
        alignSelf="center"
        values={this.state.layout}
      >
        {(value) => {
          let Child = value.child
          return(
            <Box style={{'height': '92vmin'}}>
              <Child updateSelection={this.updateSelection}
                     selectedSymbol={this.state.selectedSymbol}
                     selectedData={this.state.selectedData}
                     selectedIndex={this.state.selectedIndex}
                     loading={this.state.loading}
                   />
            </Box>
          )
        }}
      </Distribution>
    )
  }
}
