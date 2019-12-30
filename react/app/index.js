import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import './index.css'
import DynamicTable from './components/Table/DynamicTable'
import BasicTable from './components/Table/BasicTable'
import Rows from './components/Table/Rows'
import TableSelect from './components/Table/TableSelect'


class App extends React.Component {
  render() {
    return (
      // <DynamicTable />
      <BasicTable />
      // <Rows />
      // <TableSelect />
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)