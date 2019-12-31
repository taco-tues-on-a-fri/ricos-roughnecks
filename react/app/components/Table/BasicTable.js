import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import { fetchQuery } from '../../../utils/api'
import moment from 'moment'

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


//| Example for custom styling to solve a comma separated return of a list
//| in this example - Genres
//|------------------------------------------------------------------------

function Genres({ values }) {
  //Loop through the array and create a badge-like component instead of
  //comma separated string
  return (
    <>
      {values.map((genre, index) => {
        return (
          <span key={index} className="badge">
            {genre}
          </span>
        )
      })}
    </>
  )
}


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )

}

export default function BasicTable({ data }) {

  const columns = React.useMemo(
    () => [
      {
        //first group - ticket info
        Header: "Ticket Info",
        columns: [
          {
            Header: "Ticket Id",
            accessor: "ticket_id"
          },
          {
            Header: "Ticket Name",
            accessor: "ticket_name"
          },
          {
            Header: "Ticket Status",
            accessor: "ticket_status"
          }
          //| EXAMPLES!
          // {
          //   Header: "Genres",
          //   accessor: "genres",
          //   Cell: ({ cell: {value } }) => <Genres values={value} />
          // }
          // {
          //   Header: "Runtime",
          //   accessor: "runtime",
          //   Cell: ({ cell: {value } }) => {
          //   const hour = Math.floor(value / 60)
          //   const min = Math.floor(value % 60)
          //   return (
          //     <>
          //       {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
          //       {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
          //     </>
          //   )
          // }
        ]
      },
      {
        //second group - Details
        Header: "Details",
        columns: [
          {
            Header: "Ticket Description",
            accessor: "ticket_description"
          },
          {
            Header: "Ticket Priority",
            accessor: "ticket_priority"
          },
          {
            Header: "Ticket Type",
            accessor: "ticket_type"
          }
        ]
      },
      {
        //third group - Dates
        Header: "Dates",
        columns: [
          {
            Header: "Created Date",
            accessor: "created_date",
            Cell: ({ cell: { value } }) => {
              return (
                <>
                  {/* {moment(value).format('YYYY/MM/DD - HH:mm')} */}
                  {moment(value).format('DD/MM/YYYY HH:mm')}
                </>
              )
            }
          }
        ]
      }
    ],
    []
  )

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}












//|------------------------------------------------------------------------
//| Initial code from react-table example
//|------------------------------------------------------------------------
// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `


// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   })

//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map(
//           (row, i) => {
//             prepareRow(row);
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )}
//         )}
//       </tbody>
//     </table>
//   )
// }


// export default function BasicTable() {
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

//   // const data = React.useMemo(() => makeData(20), [])
//   const data = React.useMemo(() => fetchQuery('Ticket'), [])

//   return (
//     <Styles>
//       <Table columns={columns} data={data} />
//     </Styles>
//   )
// }

//| 
//|------------------------------------------------------------------------
//| End Initial code from react-table example
//|------------------------------------------------------------------------