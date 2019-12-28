import React from 'react'
import matchSorter from 'match-sorter'


//|------------------------------------------------------------------------
export default function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
