import React, { Component } from 'react';
import { Text, Grid, Box } from 'grommet';
import Select from 'react-select';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import _ from 'lodash';
import {SyncLoader} from 'react-spinners';

export default class StockTable extends Component {
  state = {
    value:[],
    options: [],
    selected: [],
    allOptions: [],
    rowData:[],
    columnDefs:[
      {'headerName': 'Date', 'field': 'date'},
      {'headerName': 'Open', field: 'open' },
      {'headerName': 'Close','field':'close'},
      {'headerName': 'High', 'field': 'high'},
      {'headerName': 'Low', 'field': 'low'}
    ],
    overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; \">Please Choose a ticker to load</span>",
    overlayLoadingTemplate: "<SyncLoader sizeUnix={'px'} size={15} color={'#36D7B7'} loading={true} />",
    loading: false,
  }

  componentDidMount(){
      axios({
        url: 'http://localhost:5001/api/ticker-list',
        method: 'get'
      }).then((resp) => {
        let obj = []
        _.forEach(resp.data, (ele) => {
          obj.push({value: ele, label: ele})
        })
        // this.setState({options:resp.data, allOptions:resp.data})
        this.setState({options: obj})
      }).catch((err) => {
        console.log(err)
      })
  }

  handleSelection = (event) => {

    let symbol = event.value
    let index = event.selected


    this.setState({
      value: event.value,
      selected: event.selected,
      loading: true,
      rowData: []
    })

    this.props.updateSelection(symbol,[],index, true)

    let query = '{allStocks(symbol:"'+ symbol +'"){edges{node{date,open,close,high,low}}}}'

    axios({
      url: 'http://localhost:5001/api',
      method: 'post',
      data: {query: query}
    }).then((resp) => {
      let obj = [];
      resp.data.data.allStocks.edges.forEach((ele) => {
        obj.push(ele.node)
      })
      this.setState({rowData: obj})
      this.props.updateSelection(symbol,obj, index, false)
    }).catch((err) => {
      console.log(err)
    })
  }


  render(){
    const { options} = this.state
    console.log(this.props)
    return(
      <div>
        <Grid align="center" columns="small" justify="center">
          <Text> Choose a Symbol </Text>
          <Select options={options} isSearchable={true} onChange={this.handleSelection} className="selectDropdown"/>
        </Grid>
        <Box className="ag-theme-material"
             height="medium"
             width="large"
             overflow="scroll"
             justify="center"
             pad="small" >
            <AgGridReact columnDefs={this.state.columnDefs}
                         rowData={this.state.rowData}
                         overlayNoRowsTemplate={this.state.loading ? this.state.overlayLoadingTemplate : this.state.overlayNoRowsTemplate}
                       />
      </Box>
      </div>
    )
  }
}
