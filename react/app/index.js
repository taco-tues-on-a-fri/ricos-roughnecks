import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import Container from '@material-ui/core/Container';
import StickyHeadTable from './components/Table/Table'
import './index.css'
import '../db/index.js'

class App extends React.Component {
  render() {
    return (
      <Container>
        <StickyHeadTable />
      </Container>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
