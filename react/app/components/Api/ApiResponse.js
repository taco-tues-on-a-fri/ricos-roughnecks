import React from 'react'
import PropTypes from 'prop-types'
import { getQuery, fetchQuery } from '../../../utils/api'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from '../Card'

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

function ReposGrid ({ repos }) {
  return (
    <ul className='grid space-around'>
      {repos.map((repo, index) => {
        {/* const { name, owner, html_url, stargazers_count, forks, open_issues } = repo */}
        const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = repo
        {/* const { ticket_name } = owner */}

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

export default class ApiResponse extends React.Component {
  state = {
    selectQuery: 'Ticket',
    repos: {},
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

    if (!this.state.repos[selectedQuery]) {
      fetchQuery(selectedQuery)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedQuery]: data
            }
          }))
        })  
        .catch(() => {
          console.warn('Error fetching repos: ', error)

          this.setState({
            error: `There was an error fetching the repositories.`
          })
        })
    }
  }
  isLoading = () => {
    const { selectedQuery, repos, error } = this.state

    return !repos[selectedQuery] && error === null
  }
  render() {
    const { selectedQuery, repos, error } = this.state

    return (
      <React.Fragment>
        <QueryNav
          selected={selectedQuery}
          onUpdateQuery={this.updateQuery}
        />

        {/* {this.isLoading() && <Loading text='Fetching Repos' />} */}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedQuery] && <ReposGrid repos={repos[selectedQuery]} />}
      </React.Fragment>
    ) 
  }
}