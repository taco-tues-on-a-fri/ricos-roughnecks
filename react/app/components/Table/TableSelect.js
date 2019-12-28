//| 12-28-19: Same working version, just refactored.
//|------------------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import { fetchQuery } from '../../../utils/api'
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
    <ul className='grid space-around'>
      {query.map((column, index) => {
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
      })}
    </ul>
  )
}

QueryGrid.propTypes = {
  query: PropTypes.array.isRequired
}

function queryReducer (state, action) {
  if (action.type === 'success') {
    return {
      ...state,
      [action.selectedQuery]: action.query,
      error: null,
    }
  } else if (action.type === 'error') {
    return {
      ...state,
      error: action.error.message
    }
  } else {
    throw new Error(`That action type isn't supported.`)
  }
}

export default function TableSelect () {
  const [selectedQuery, setSelectedQuery] = React.useState('Ticket')
  const [state, dispatch] = React.useReducer(
    queryReducer,
    { error: null }
  )

  const fetchedQuery = React.useRef([])

  React.useEffect(() => {
    if (fetchedQuery.current.includes(selectedQuery) === false) {
      fetchedQuery.current.push(selectedQuery)

      fetchQuery(selectedQuery)
        .then((query) => dispatch({ type: 'success', selectedQuery, query }))
        .catch((error) => dispatch({ type: error, error }))
    }
  }, [fetchedQuery, selectedQuery])

  const isLoading = () => !state[selectedQuery] && state.error === null

  return (
    <React.Fragment>
      <QueryNav
        selected={selectedQuery}
        onUpdateLanguage={setSelectedQuery}
      />

      {isLoading() && <p>LOADING</p>}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {state[selectedQuery] && <QueryGrid query={state[selectedQuery]} />}
    </React.Fragment>
  ) 
}