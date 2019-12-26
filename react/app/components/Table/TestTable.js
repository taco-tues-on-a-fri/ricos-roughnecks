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

function QueryNav ({ selected, onUpdateQuery }) {
  const tables = ['Person', 'Project', 'Ticket']
  
  return(
    <ul className='flex-center'>
      {tables.map((query) => (
        <li key={query}>
          <button 
            className='btn-clear nav-link'
            style={query === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateQuery(query)}>
            {query}
          </button>
        </li>
      ))}
    </ul>
  )
}

function renderTableData({ query }) {
  // console.log('Inside renderTableData')
  // console.log(util.inspect(query))

  return query.map((column, index) => {
    const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column
    return (
      <tr key={ticket_id}>
        <td>{ticket_id}</td>
        <td>{ticket_name}</td>
        <td>{ticket_status}</td>
        <td>{ticket_description}</td>
        <td>{ticket_priority}</td>
        <td>{ticket_type}</td>
        <td>{created_date}</td>
        <td>{updated_date}</td>
        <td>{closed_date}</td>
      </tr>
    )
  })
}
function renderTableHeader({ query }) {
  console.log('Inside renderTableHeader')
  console.log(util.inspect(query))
  let header = Object.keys(query[0])
  // { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date }
  return header.map((key, index) => {
    return <th key={index}>{key}</th>
  })
}

function QueryGrid ({ query }) {
  console.log('Inside QueryGrid')
  return (
    <div>
      <h1> React Dynamic Table </h1>
      <table id={'students'}>
        <tbody>
        <tr>{renderTableHeader({ query })}</tr>
          {renderTableData({ query })}
        </tbody>
      </table>
    </div>
  )
}


export default class DynamicTable extends React.Component {
  state = {
    selectedQuery: 'Ticket',
    query: {},
    error: null
  }
  componentDidMount () {
    this.updateQuery(this.state.selectedQuery)
  }
  updateQuery = (selectedQuery) => {
    this.setState({
      selectedQuery,
      error: null
    })
    if (!this.state.query[selectedQuery]) {
      fetchQuery(selectedQuery)
        .then((data) => {
          this.setState(({ query }) => ({
            query: {
              ...query, 
              [selectedQuery]: data
            }
          }))
        })  
        .catch(() => {
          console.warn('Error fetching query: ', error)

          this.setState({
            error: `There was an error fetching the query.`
          })
        })
    }
  }
  isLoading = () => {
    const { selectedQuery, query, error } = this.state

    return !query[selectedQuery] && error === null
  }
  render() {
    const { selectedQuery, query, error } = this.state

    return (
      <React.Fragment>
        <QueryNav
          selected={selectedQuery}
          onUpdateQuery={this.updateQuery}
        />
        {this.isLoading() && <p>LOADING</p>}

        {error && <p className='center-text error'>{error}</p>}

        {query[selectedQuery] && <QueryGrid query={query[selectedQuery]} />}
      </React.Fragment>
    ) 
  }
}

//   state = {
//     students: [
//       { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
//       { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
//       { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
//       { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
//     ]
//   }
  
  
// }