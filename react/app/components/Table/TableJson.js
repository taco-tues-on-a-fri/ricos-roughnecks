import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { getQuery, fetchQuery } from '../../../utils/api'
import util from 'util'

export default class TableJson extends React.Component {
  constructor(props){
    super(props);
    
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
  }
  
  getKeys = function(){
    return Object.keys(this.props.data[0]);
  }
  
  getHeader = function(){
    var keys = this.getKeys();
    return keys.map((key, index)=>{
      return <th key={key}>{key.toUpperCase()}</th>
    })
  }
  
  getRowsData = function(){
    var items = this.props.data;
    var keys = this.getKeys();
    
    return items.map((row, index)=>{
      return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
    })
  }
  
  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRowsData()}
          </tbody>
          </table>
      </div>
    );
  }
}

const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
  })
}