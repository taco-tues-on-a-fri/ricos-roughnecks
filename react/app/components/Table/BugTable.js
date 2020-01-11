//| 01-10-20: Completed: inside table group, remove 'dynamic table'
//| 01-10-20: Completed: Search box inside of table needs padding to its placeholder text
//| 01-10-20: Completed: abstract Global filter 
//| 01-10-20: Completed: abstract fuzzyTextFilterFn 
//| 01-10-20: Completed: abstract getKeys, formatHeader, createUniqueKey
//|------------------------------------------------------------------------
//| 01-10-20: TODO: Can global filter be added into the navigation bar search box?
//|------------------------------------------------------------------------

import React from 'react'
import Table from 'react-bootstrap/Table'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import { fetchQuery } from '../../../utils/api'
import { fuzzyTextFilterFn } from '../../../utils/filters'
import { getKeys, formatHeader, createUniqueKey } from '../../../utils/formatters'
import {GlobalFilter} from './GlobalFilter'
import moment from 'moment'
import util from 'util'


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

function GetHeaders({ data }) {
  let headerKeys = getKeys({ data })
  return headerKeys.map((headerColumn, index) => {
    // if index = 0 => create unique key by combining table name + id#  
    if (index === 0){
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

export default function DynamicTable({ data, selected }) {
  const columns = React.useMemo(
    () => [
      {
        Header: `${selected} List`,
        columns: GetHeaders({ data })
      }
    ],
    []
  )

  return (
      <CreateTable columns={columns} data={data} selected={selected}/>
  )
}