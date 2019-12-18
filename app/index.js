import React from 'react'
import ReactDom from 'react-dom'
import Container from '@material-ui/core/Container';
import StickyHeadTable from './components/Table/Table'
import './index.css'

class App extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
        <StickyHeadTable />
      </Container>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)
