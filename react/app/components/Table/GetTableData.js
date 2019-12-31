import React from 'react';
import util from 'util'
import moment from 'moment'

function getKeys ({ data }){
  return Object.keys(data[0]);
}

function formatHeader (string){
  return string.split('_').map(word => word.substring(0,1).toUpperCase()+ word.substring(1)).join(' ')
}

function formatDate (date) {
  return moment(date).format('YYYY/MM/DD - HH:mm')
}

export function GetHeader({ data }) {
  let headerKeys = getKeys({data})
  return headerKeys.map((column, index) => {
    return <th key={index}>{formatHeader(column)}</th>
  })
}

export function RenderRow ({ data, keys }) {
  // console.log('insideRenderRow:')
  // console.log(util.inspect(keys))
  return keys.map((key, index) => {
    // console.log('inside RenderRow: data[key]')
    // console.log(util.inspect(data[key]))
    return (
      <td key={data[key]}>{data[key]}</td>
    )
  }) 
}

export function GetRowsData ({ data }) {
  let rowKeys = getKeys({data})
    console.log('inside rowKeys: rowKeys')
    console.log(util.inspect(rowKeys))
    
  return data.map((row, index) => {
    // console.log('inside GetRowsData: row')
    // console.log(util.inspect(row))
    return (
      <tr key={index}>
        <RenderRow key={index} data={row} keys={rowKeys} />
      </tr>
    )
  })
}

export function GenerateTable ({ query }) {
  return (
    <div>
      {/* <h1> React Dynamic Table </h1> */}
      <table id='query-table'>
        <thead>
            <tr><GetHeader data={query}/></tr>
        </thead>
        <tbody>
          <GetRowsData data={query}/>
        </tbody>
      </table>
    </div>
  )
}