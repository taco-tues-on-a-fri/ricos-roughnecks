import React from 'react';
import { fetchQuery } from '../../../utils/api'
import Loading from '../Utils/Loading'
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

function tableNavReducer (state, action) {
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
    throw new Error(`That action type is not supported.`)
  }
}

export default function TableNav () {
  const [selectedQuery, setSelectedQuery] = React.useState('Ticket')
  const [state, dispatch] = React.useReducer(
    tableNavReducer,
    { error: null }
  )

  const fetchedQueries = React.useRef([])

  React.useEffect(() => {
    if (fetchedQueries.current.includes(selectedQuery) === false) {
      fetchedQueries.current.push(selectedQuery)

      fetchQuery(selectedQuery)
        .then((query) => dispatch({ type: 'success', selectedQuery, query }))
        .catch((error) => dispatch({ type: error, error }))
    }
  }, [fetchedQueries, selectedQuery])

  const isLoading = () => !state[selectedQuery] && state.error === null

  return (
    <React.Fragment>
      <QueryNav
        selected={selectedQuery}
        onUpdateQuery={setSelectedQuery}
      />

      {/* {isLoading() && <p>LOADING</p>} */}
      {isLoading() && <Loading text='Fetching Query' />}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {state[selectedQuery] && <GenerateTable query={state[selectedQuery]} />}
    </React.Fragment>
  )
}