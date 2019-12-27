import React from 'react'
import PropTypes from 'prop-types'
import { getQuery, fetchQuery } from '../../../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from '../Card'

//| Lists 3 query types, updates on click with styling to highlight selection
//| Returns function `onUpdateQuery that changes state to `selectedQuery`
//|------------------------------------------------------------------------
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

QueryNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateQuery: PropTypes.func.isRequired
}

//| *insert proper name here*(higher order function?) function that:
//| creates grid styling by accepting an object called { query }
//|     UNORDERED LIST makes grid with space around by:
//|       Calling MAP on { query }
//|------------------------------------------------------------------------
function QueryGrid ({ query }) {
  return (
    <ul className='grid space-around'>
      {query.map((response, index) => {
        const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = response

        return (
          <li key={ticket_id}>
            <Card
              header={ticket_id}
              name={ticket_name}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a>
                    {`lvl-chld-01: ${ticket_type}`}
                    {ticket_type}
                  </a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {`lvl-chld-02: ${ticket_status}`}
                  {ticket_status}
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {ticket_description}
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {ticket_priority} 
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}


export default class ApiResponse extends React.Component {
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

    //if statement caches state in 'query' state object and only fetches if null
    if (!this.state.query[selectedQuery]) {
      fetchQuery(selectedQuery)
        .then((data) => {
//call setState passing in function, and react will invoke function passing current state which is a destructured object
//will update the new query based on the current query.
//the return from this function will be merged with the current state - 'query'
          this.setState(({ query }) => ({
            query: {
              ...query, //all of properties and merge it
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

        {/* {this.isLoading() && <Loading text='Fetching query' />} */}
        {this.isLoading() && <p>LOADING</p>}

        {error && <p className='center-text error'>{error}</p>}

        {query[selectedQuery] && <QueryGrid query={query[selectedQuery]} />}
      </React.Fragment>
    ) 
  }
}

//| Idea area
//|------------------------------------------------------------------------
function ticketTable ({ columns }) {
  return (
    <ul className='grid space-around'>
      {columns.map((column, index) => {
        const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column


        return (
          <li key={ticket_id}>
            <Card
              header={`#${index + 1}`}
              name={ticket_name}
            >
              <ul className='card-list'>
                <li>
                  <FaUser color='rgb(255, 191, 116)' size={22} />
                  <a>
                    {ticket_name}
                  </a>
                </li>
                <li>
                  <FaStar color='rgb(255, 215, 0)' size={22} />
                  {ticket_status}
                </li>
                <li>
                  <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                  {ticket_description}
                </li>
                <li>
                  <FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
                  {ticket_priority} 
                </li>
              </ul>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}