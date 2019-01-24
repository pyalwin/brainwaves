import React, { Component } from 'react';
import Chart from './chart';
import _ from 'lodash';
import {SyncLoader} from 'react-spinners';
import { Box, Text } from 'grommet';


export default class StockChart extends Component{
  render(){
      if(_.isEmpty(this.props.selectedData)){
        return(
          <Box className="ag-theme-material"
               align="center"
               height="medium"
               width="large"
               overflow="scroll"
               justify="center"
               pad="small" >
          <Text>Chooose a ticker</Text>
          <SyncLoader sizeUnix={"px"}
                      size={15}
                      color={'#36D7B7'}
                      loading={this.props.loading}
          />
        </Box>
        )
      }else{
        return(
          <Chart data={this.props.selectedData}/>
        )
      }
  }
}
