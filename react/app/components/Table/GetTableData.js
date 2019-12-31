import React from 'react';
// import { getQuery, fetchQuery } from '../../../utils/api'
import util from 'util'



function getKeys ({ data }){
  return Object.keys(data[0]);
}

export function GetHeader({ data }) {
  let headerKeys = getKeys({data})
  return headerKeys.map((column, index) => {
    return <th key={index}>{column}</th>
  })
}

export function RenderRow ({ data, keys }) {
  console.log('insideRenderRow:')
  console.log(util.inspect(keys))
  return keys.map((key, index) => {
    return (
      <td key={data[key]}>{data[key]}</td>
    )
  }) 
}

export function GetRowsData ({ data }) {
  let rowKeys = getKeys({data})

  return data.map((row, index) => {
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
      <h1> React Dynamic Table </h1>
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