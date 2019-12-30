//| 12-28-19: Attempting to make QueryGrid function universal:
//| 12-28-19: First step: make destructured column object output { _id } = column instead of ticket_id 
//| 12-28-19: Next step: use ...spread for the rest of properties in { column }
//| 12-28-19: Implemented: const { _id, ...eachElement } = column
//| 12-28-19: Implemented: { _id } over 3 lines
//| 12-28-19: Result:  Broken 
//| 12-28-19: Result:  Spread / Rest operators might be the solution 
//| 12-28-19: Result:  researching dynamic rows code examples. 
//|------------------------------------------------------------------------
//| 12-28-19: Errors:
//| 12-28-19: Clicked on 'Project' button:
//| 12-28-19:     Warning: Each child in a list should have a unique "key" prop.
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

//| 12-28-19: Notes: Added this for use later
//|------------------------------------------------------------------------
// function Rows ({ children }) {
//   return (
//     <td>{ticket_id}</td>
//     <td>{ticket_name}</td>
//     <td>{ticket_status}</td>
//     <td>{ticket_description}</td>
//     <td>{ticket_priority}</td>
//     <td>{ticket_type}</td>
//     <td>{created_date}</td>
//     <td>{updated_date}</td>
//     <td>{closed_date}</td>
//     <div className={`card bg-light`}>
//     <h4 className='header-lg center-text'>
//       {header}
//     </h4>
//     <img
//       className='avatar'
//       src={avatar}
//       alt={`Avatar for ${name}`}
//     />
//     {children}
//   </div>
//   )
// }



//| 12-28-19: Notes:
//| 12-28-19: The component this was built from, RepoGrid, had used <Card /> - which uses {children}
//| 12-28-19: Idea: emulate the <Card /> construction, using children.
//|------------------------------------------------------------------------
function QueryGrid ({ query }) {
  return (
    <table className='grid space-around'>
      <tbody>
        {query.map((column, index) => {
          {/* const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column */}
          {/* const { ...column } = columns */}
          const { _id, ...eachElement } = column
          console.log(util.inspect(_id))
          console.log(util.inspect(...eachElement))

          return (
            <tr key={_id}>
              <td>{_id}</td>
              {/* <td>{ticket_name}</td>
              <td>{ticket_status}</td>
              <td>{ticket_description}</td>
              <td>{ticket_priority}</td>
              <td>{ticket_type}</td>
              <td>{created_date}</td>
              <td>{updated_date}</td>
              <td>{closed_date}</td> */}
            </tr>
          )
        })}
      </tbody>
    </table>
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
        onUpdateQuery={setSelectedQuery}
      />

      {isLoading() && <p>LOADING</p>}

      {state.error && <p className='center-text error'>{state.error}</p>}

      {state[selectedQuery] && <QueryGrid query={state[selectedQuery]} />}
    </React.Fragment>
  ) 
}