import React from 'react'
import Table from 'react-bootstrap/Table'
import styled from 'styled-components'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import { fetchQuery } from '../../../utils/api'
import moment from 'moment'
import matchSorter from 'match-sorter'

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

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  selected,
}) {
  const count = preGlobalFilteredRows.length

  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} ${selected}(s)`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val


function CreateTable({ columns, data, selected }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    flatColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    filterTypes,
  },
  useGlobalFilter
  )

  return (
    <Table striped bordered hover responsive variant="dark" {...getTableProps()}>
      <thead>
        <tr>
          <th
            colSpan={flatColumns.length}
            style={{
              textAlign: 'right',
            }}
          >
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              selected={selected}
            />
          </th>
        </tr>
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
    </Table>
  )
}

function getKeys ({ data }){
  return Object.keys(data[0]);
}

function formatHeader (string){
  return string.split('_').map(word => word.substring(0,1).toUpperCase()+ word.substring(1)).join(' ')
}

function createUniqueKey (number, headerColumn){
  let wordArray = headerColumn.split('_')
  return `${wordArray[0]}_${number}`
}

function GetHeaders({ data }) {
  let headerKeys = getKeys({ data })
  return headerKeys.map((headerColumn, index) => {
    if (headerColumn.includes('_id')){
      return {
        Header: formatHeader(headerColumn),
        accessor: headerColumn,
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {createUniqueKey(value, headerColumn)}
            </>
          )
        }
      }
    }
    // if 'dates' appears in key => format using moment => if date===null return ''
    if (headerColumn.includes('date')) {
      return {
        Header: formatHeader(headerColumn),
        accessor: headerColumn,
        Cell: ({ cell: { value } }) => {
          return (
            <>
              {value === null ? '' : moment(value).format('DD/MM/YYYY HH:mm')}
            </>
          )
        }
      }
    } else {
      return {
        Header: formatHeader(headerColumn),
        accessor: headerColumn
      }
    }
  })
}

export default function DynamicBasicTable({ data, selected }) {
  const columns = React.useMemo(
    () => [
      {
        //Main group - Dynamic Table
        Header: "Dynamic Table",
        columns: GetHeaders({ data })
      }
    ],
    []
  )

  return (
      <CreateTable columns={columns} data={data} selected={selected}/>
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