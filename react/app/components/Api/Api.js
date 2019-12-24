import React from 'react'

function TablesNav ({ selected, onUpdateTable }) {
  const tables = ['Person', 'Project', 'Ticket']
  
  return(
    <ul className='flex-center'>
      {tables.map((table) => (
        <li key={table}>
          <button 
            className='btn-clear nav-link'
            style={table === selected ? { color: 'rgb(187, 46, 31)' } : null}
            onClick={() => onUpdateTable(table)}>
            {table}
          </button>
        </li>
      ))}
    </ul>
  )
}

TablesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateTable: PropTypes.func.isRequired
}


export default class Api extends React.Component {
  state = {
    selectLanguage: 'All',
    repos: {},
    error: null
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
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
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text='Fetching Repos' />}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    ) 
  }
}








//| Backup Area
//|------------------------------------------------------------------------
//| 

// function LanguagesNav ({ selected, onUpdateLanguage }) {
//   const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  
//   return(
//     <ul className='flex-center'>
//       {languages.map((language) => (
//         <li key={language}>
//           <button 
//             className='btn-clear nav-link'
//             style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
//             onClick={() => onUpdateLanguage(language)}>
//             {language}
//           </button>
//         </li>
//       ))}
//     </ul>
//   )
// }

//| 
//|------------------------------------------------------------------------
//| 

// LanguagesNav.propTypes = {
//   selected: PropTypes.string.isRequired,
//   onUpdateLanguage: PropTypes.func.isRequired
// }

//| 
//|------------------------------------------------------------------------
//| 

export default class Popular extends React.Component {
  state = {
    selectLanguage: 'All',
    repos: {},
    error: null
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null
    })

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
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
    const { selectedLanguage, repos, error } = this.state

    return !repos[selectedLanguage] && error === null
  }
  render() {
    const { selectedLanguage, repos, error } = this.state

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading text='Fetching Repos' />}

        {error && <p className='center-text error'>{error}</p>}

        {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
      </React.Fragment>
    ) 
  }
}

//|
//|------------------------------------------------------------------------