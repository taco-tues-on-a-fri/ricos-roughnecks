import React from 'react';
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


function getKeys ({ data }){
  return Object.keys(data[0]);
}

function GetHeader({ data }) {
  let headerKeys = getKeys({data})
  return headerKeys.map((column, index) => {
    return <th key={index}>{column}</th>
  })
}

function RenderRow ({ data, keys }) {
  console.log('insideRenderRow:')
  console.log(util.inspect(keys))
  return keys.map((key, index) => {
    return (
      <td key={data[key]}>{data[key]}</td>
    )
  }) 
}

function GetRowsData ({ data }) {
  let rowKeys = getKeys({data})

  return data.map((row, index) => {
    return (
      <tr key={index}>
        <RenderRow key={index} data={row} keys={rowKeys} />
      </tr>
    )
  })
}

function RenderRowz ({ data }) {
  return (
    <tbody>
      {data.map((column, index) => {
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
    </tbody>
  )
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



export default class CreateTable extends React.Component {
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
//   console.log('Inside RenderRow')
//   console.log(util.inspect(data))

//   return data.map((row, index)=>{
//     console.log('Inside data.map')
//     console.log(util.inspect(row))
//     // return <td key={Object.keys[key]}>{Object.keys[key]}</td>
//     // return <td key={index}>{row}</td>
//     return <td key={row[index]}>{row[index]}</td>
//   })
// }

//|------------------------------------------------------------------------

// function QueryGrid ({ query }) {
//   return (
//     <div>
//       <h1> React Dynamic Table </h1>
//       <table id='query-table'>
//         <tr>
//           <GetHeader data={query}/>
//         </tr>
//         <tr>
//           <RenderRow data={query}/>
//         </tr>
//       </table>
//     </div>
//   )
// }

//|------------------------------------------------------------------------