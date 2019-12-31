import React from 'react';
import { fetchQuery } from '../../../utils/api'
import { GetHeader, RenderRow, GetRowsData, GenerateTable } from './GetTableData'
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



function QueryGrid ({ query }) {
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



export default class TableNav extends React.Component {
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

        {query[selectedQuery] && <GenerateTable 
          query={query[selectedQuery]}
          selectedQuery={selectedQuery}
          />
        }
      </React.Fragment>
    ) 
  }
}