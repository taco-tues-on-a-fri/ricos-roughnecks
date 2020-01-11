import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config() 
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TableNav from './components/Table/TableNav'
import BugTable from './components/Table/BugTable'
import FormikTicket from './components/Form/FormikTicket'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={TableNav} />
          <Route path='/create-ticket' component={FormikTicket} />
        </Switch>
      </Router>
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)