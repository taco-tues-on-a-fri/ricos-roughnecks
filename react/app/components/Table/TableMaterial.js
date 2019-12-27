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


// a universal function that will accept an object with key:values and then map/spread/reduce out all of the keys
// then create an array of objects with keys of 'id', 'label', and a default key of 'minWidth'
// the id key will use the value of incomingObject.keys
// the label key will be a regex function that Proper capitalizes and replaces underscore with a space
// minWidth key should be a default value handed to each iteration of this.


const columns = [
  { id: 'ticket_id', label: 'Ticket ID', minWidth: 100 },
  { id: 'ticket_name', label: 'Ticket Name', minWidth: 100 },
  { id: 'ticket_status', label: 'Ticket Status', minWidth: 100 },
  { id: 'ticket_description', label: 'Ticket Description', minWidth: 100 },
  { id: 'ticket_priority', label: 'Ticket Priority', minWidth: 100 },
  { id: 'ticket_type', label: 'Ticket Type', minWidth: 100 },
  { id: 'created_date', label: 'Created Date', minWidth: 100 },
  { id: 'updated_date', label: 'Updated Date', minWidth: 100 },
  { id: 'closed_date', label: 'Closed Date', minWidth: 100 },
];



// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

function createData(ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date) {
  return { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date };
}

const query = {
  "ticket_id": 101,
  "ticket_name": "Tresom",
  "ticket_status": "open",
  "ticket_description": "Isolation",
  "ticket_priority": "trivial",
  "ticket_type": "custom issue",
  "created_date": "2019-12-20T22:27:27.926Z",
  "updated_date": "2019-11-24T07:00:00.000Z",
  "closed_date": "2019-06-18T06:00:00.000Z"
  }








function create_rows ({ query }) {
  
  const { ticket_id, ticket_name, ticket_status, ticket_description, ticket_priority, ticket_type, created_date, updated_date, closed_date } = query
  return 
}


const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


//| backup area of modified code snippets
//|------------------------------------------------------------------------
//| 

// const columns = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString(),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toLocaleString(),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: value => value.toFixed(2),
//   },
// ];


//| 
//|------------------------------------------------------------------------
