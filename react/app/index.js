import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import Container from '@material-ui/core/Container';
import StickyHeadTable from './components/Table/Table'
import './index.css'
// import '../db/index.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/api/ticket")
      .then(res => res.text())
      // .then(res => res.JSON())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }
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

// <Container>
//         <StickyHeadTable />
//       </Container>

{/* <div>
        <p>{this.state.apiResponse}</p>
      </div> */}