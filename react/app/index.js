import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import Container from '@material-ui/core/Container';
import StickyHeadTable from './components/Table/Table'
import './index.css'
import ApiResponse from './components/Api/ApiResponse'
// import '../db/index.js'

class App extends React.Component {
  render() {
    return (
      <ApiResponse />
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)

// <Container>
//         <StickyHeadTable />
//       </Container>

{/* <div>
        <p>{this.state.apiResponse}</p>
      </div> */}