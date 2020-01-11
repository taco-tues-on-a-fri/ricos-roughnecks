
import React from 'react'
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

//| 01-10-20: v.02 Incorporate Bootstrap
//|------------------------------------------------------------------------
// export function GlobalFilter({
//   preGlobalFilteredRows,
//   globalFilter,
//   setGlobalFilter,
//   selected,
// }) {
//   const count = preGlobalFilteredRows.length

//   return (
//     <span>
//       <Form inline>
//           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
//           <Button variant="outline-success">Search</Button>
//       </Form>
//       Search:{' '}
//       <input
//         value={globalFilter || ''}
//         onChange={e => {
//           setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
//         }}
//         placeholder={` ${count} ${selected}(s)`}
//         style={{
//           fontSize: '1.1rem',
//           border: '0',
//         }}
//       />
//     </span>
//   )
// }

//| 01-10-20: v.01 Original
//|------------------------------------------------------------------------
export function GlobalFilter({
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
        placeholder={` ${count} ${selected}(s)`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}