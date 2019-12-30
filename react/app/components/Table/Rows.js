import React from 'react';
import { fetchQuery } from '../../../utils/api'
import util from 'util'
import styled from 'styled-components'
import { useTable } from 'react-table'
import makeData from '../../../utils/makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`
// const data = fetchQuery('Ticket')
// console.log(util.inspect(data))

// function GetHeader({ data }) {
//   // console.log('Inside GetHeader')
//   // console.log(util.inspect(data))
//   let header = Object.keys(data[0])
//   // { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date }
//   return header.map((row, index) => {
//     return <th key={index}>{row}</th>
//   })
// }

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}


export default function Rows() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  // const data = React.useMemo(() => fetchQuery('Ticket'), [])
    const data = React.useMemo(() => makeData(20), [])
  // console.log(util.inspect(data))

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}


// const data = fetchQuery('Ticket')
// console.log('After const data')
// console.log(util.inspect(data))

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

// function GetHeader({ data }) {
//   // console.log('Inside GetHeader')
//   // console.log(util.inspect(data))
//   let header = Object.keys(data[0])
//   // { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date }
//   return header.map((row, index) => {
//     return <th key={index}>{row}</th>
//   })
// }

// export default function Rows ({ query }) {
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
// export default function Rows() {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         columns: [
//           {
//             Header: 'First Name',
//             accessor: 'firstName',
//           },
//           {
//             Header: 'Last Name',
//             accessor: 'lastName',
//           },
//         ],
//       },
//       {
//         Header: 'Info',
//         columns: [
//           {
//             Header: 'Age',
//             accessor: 'age',
//           },
//           {
//             Header: 'Visits',
//             accessor: 'visits',
//           },
//           {
//             Header: 'Status',
//             accessor: 'status',
//           },
//           {
//             Header: 'Profile Progress',
//             accessor: 'progress',
//           },
//         ],
//       },
//     ],
//     []
//   )

//   const data = React.useMemo(() => makeData(20), [])

//   return (
//     <Styles>
//       <Table columns={columns} data={data} />
//     </Styles>
//   )
// }
//|------------------------------------------------------------------------