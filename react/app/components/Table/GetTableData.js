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