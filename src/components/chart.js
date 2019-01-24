import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import _ from 'lodash';

export default class Chart extends Component {
  render(){
    let data = this.props.data
    let dateTrace = _.map(data,'date')
    let highTrace = _.map(data,'high')
    let lowTrace = _.map(data, 'low')
    let openTrace = _.map(data, 'open')
    let closeTrace = _.map(data, 'close')
    let dataObj = [
      {
        x: dateTrace,
        close: closeTrace,
        decreasing: {line: {color: '#7F7F7F'}},
        high: highTrace,
        increasing: {line: {color: '#17BECF'}},
        line: {color: 'rgba(31,119,180,1)'},
        low: lowTrace,
        open: openTrace,
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }
    ]
    let layout = {
      dragmode: 'zoom',
      showlegend: true,
      xaxis: {
        autorange: true,
        domain: [0,1],
        range: [dateTrace[0], dateTrace[dateTrace.length - 1]],
        rangeSlider: {range: [dateTrace[0], dateTrace[dateTrace.length - 1]]},
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        autorange: true,
        domain: [0,1],
        type: 'linear'
      }
    }
    return(
      <Plot data={dataObj} layout={layout} />
    )
  }
}
