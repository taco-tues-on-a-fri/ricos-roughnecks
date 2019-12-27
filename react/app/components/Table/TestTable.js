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

function RenderRow({ data }) {


  return data.map((row, index)=>{
    const  [first]  = row
// console.log(util.inspect(row))
// console.log(util.inspect(first))
console.log(first)
    return <td key={first}>{row}</td>
  })
}

function GetHeader({ data }) {
  // console.log('Inside GetHeader')
  // console.log(util.inspect(data))
  let header = Object.keys(data[0])
  // { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date }
  return header.map((row, index) => {
    return <th key={index}>{row}</th>
    //return <th key={row[index]+''+index}>{row[index]}</th>
  })
}

// getRowsData = function(){
//   var items = this.props.data;
//   var keys = this.getKeys();
  
//   return items.map((row, index)=>{
//     return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
//   })
// }

function QueryGrid ({ query }) {
  return (
    <div>
      <h1> React Dynamic Table </h1>
      <table id='query-table'>
        <tr>
          <GetHeader data={query}/>
        </tr>
        <tr>
          <RenderRow data={query}/>
        </tr>
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

        {query[selectedQuery] && <QueryGrid 
          query={query[selectedQuery]}
          selectedQuery={selectedQuery}
          />
        }
      </React.Fragment>
    ) 
  }
}

// function QueryGrid ({ query }) {
//   console.log('Inside QueryGrid')
//   return (
//     <div>
//       <h1> React Dynamic Table </h1>
//       <table id={'students'}>
//         <tbody>
//         <tr>{renderTableHeader({ query })}</tr>
//           {renderTableData({ query })}
//         </tbody>
//       </table>
//     </div>
//   )
// }







//|------------------------------------------------------------------------
// function renderTableData({ query }) {
//   // console.log('Inside renderTableData')
//   // console.log(util.inspect(query))

//   return query.map((column, index) => {
//     const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column
//     return (
//       <tr key={index}>
//         {/* <td>{index}</td> */}
//         <td>{ticket_id}</td>
//         <td>{ticket_name}</td>
//         <td>{ticket_status}</td>
//         <td>{ticket_description}</td>
//         <td>{ticket_priority}</td>
//         <td>{ticket_type}</td>
//         <td>{created_date}</td>
//         <td>{updated_date}</td>
//         <td>{closed_date}</td>
//       </tr>
//     )
//   })
// }
//|------------------------------------------------------------------------


//|------------------------------------------------------------------------
// function renderTableData({ query }) {
//   console.log('Inside renderTableData')
//   console.log(util.inspect(querySpread)
//   )
//   return querySpread.keys.map((key, index)=>{
//     return <td key={query[key]}>{query[key]}</td>
//   })

//   // return query.map((column, index) => {
//   //   const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column
//   //   return (
//   //     <tr key={index}>
//   //       {/* <td>{index}</td> */}
//   //       <td>{ticket_id}</td>
//   //       <td>{ticket_name}</td>
//   //       <td>{ticket_status}</td>
//   //       <td>{ticket_description}</td>
//   //       <td>{ticket_priority}</td>
//   //       <td>{ticket_type}</td>
//   //       <td>{created_date}</td>
//   //       <td>{updated_date}</td>
//   //       <td>{closed_date}</td>
//   //     </tr>
//   //   )
//   // })
// }
//|------------------------------------------------------------------------

//|------------------------------------------------------------------------
// function renderTableData({ query }) {
//   console.log('Inside renderTableData')
//   console.log(util.inspect(query))

//   return query.map((key, index)=>{
//     // return <td key={Object.keys[key]}>{Object.keys[key]}</td>
//     return <td key={index}>{key}</td>
//   })
  // return header.map((key, index) => {
  //   return <th key={index}>{key}</th>
  // })

  // return query.map((column, index) => {
  //   const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = column
  //   return (
  //     <tr key={index}>
  //       {/* <td>{index}</td> */}
  //       <td>{ticket_id}</td>
  //       <td>{ticket_name}</td>
  //       <td>{ticket_status}</td>
  //       <td>{ticket_description}</td>
  //       <td>{ticket_priority}</td>
  //       <td>{ticket_type}</td>
  //       <td>{created_date}</td>
  //       <td>{updated_date}</td>
  //       <td>{closed_date}</td>
  //     </tr>
  //   )
  // })
// }
//|------------------------------------------------------------------------

//|------------------------------------------------------------------------
// function QueryGrid ({ query, selectedQuery }) {
//   return (
//     <div>
//       <h1> React Dynamic Table </h1>
//       <table id={'students'}>
//         <tbody>
//         <tr>{renderTableHeader({ query })}</tr>
//           {/* {renderTableData({ query })} */}
//           {renderTableData( {query} )}
//         </tbody>
//       </table>
//     </div>
//   )
// }
//|------------------------------------------------------------------------

// function RenderRow({ data }) {
//   console.log('firstKey')
//   // console.log(util.inspect(firstKey))
//   return data.map((row, index)=>{
//     // let firstKey = Object.keys(row)[0]
//     console.log(util.inspect(row))
//     // console.log('Inside data.map')
//     // console.log(util.inspect(row))
//     // return <td key={Object.keys[key]}>{Object.keys[key]}</td>
//     // return <td key={index}>{row}</td>
//     return <td key={row[0]}>{row}</td>
//   })
// }

//|------------------------------------------------------------------------