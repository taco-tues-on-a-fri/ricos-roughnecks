//| 12-29-19: 
//|------------------------------------------------------------------------
import { fetchQuery } from './api'
import util from 'util'

export default function makeData() {
  fetchQuery('ticket')
  .then((query) => {
    console.log('inside makeData: query')
    console.log(util.inspect(query))
    query.map((...column) => {
      console.log('inside makeData: column')
      console.log(util.inspect(column))
      return {
        ...column
      }
    })
  })
}