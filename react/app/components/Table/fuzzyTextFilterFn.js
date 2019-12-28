import React from 'react'


//|------------------------------------------------------------------------
export default function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
