import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import './index.css'
import DynamicTable from './components/Table/DynamicTable'


class App extends React.Component {
  render() {
    return (
      <DynamicTable />
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)