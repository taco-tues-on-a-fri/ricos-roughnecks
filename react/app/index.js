import React from 'react'
import ReactDom from 'react-dom'
require('dotenv').config()
import 'bootstrap/dist/css/bootstrap.min.css'
import TableNav from './components/Table/TableNav'
import './index.css'
import BasicTable from './components/Table/BasicTable'

// import Container from '@material-ui/core/Container';
// import StickyHeadTable from './components/Table/Table'
// import ApiResponse from './components/Api/ApiResponse'
// import TestTable from './components/Table/TestTable'
// import QueryTable from './components/Table/QueryTable'
// import DynamicTable from './components/Table/DynamicTable'
// import '../db/index.js'


class App extends React.Component {
  render() {
    return (
      // <BasicTable />
      <TableNav />
      //<TestTable />
      // <QueryTable />
      // <DynamicTable />
      // <ApiResponse />
    )
  }
}

ReactDom.render(
  <App />,
  document.getElementById('app')
)


//|------------------------------------------------------------------------
// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state={
//       tableData:[
//         {'fruit': 'Apple', 'cost': 100},
//         {'fruit': 'Orange', 'cost': 50},
//         {'fruit': 'Banana', 'cost': 35},
//         {'fruit': 'Mango', 'cost': 70},
//         {'fruit': 'Pineapple', 'cost': 45},
//         {'fruit': 'Papaya', 'cost': 40},
//         {'fruit': 'Watermelon', 'cost': 35}
//       ],
//       tableData2:[
//         {'Name': 'Abc', 'Age': 15, 'Location': 'Bangalore'},
//         {'Name': 'Def', 'Age': 43, 'Location': 'Mumbai'},
//         {'Name': 'Uff', 'Age': 30, 'Location': 'Chennai'},
//         {'Name': 'Ammse', 'Age': 87, 'Location': 'Delhi'},
//         {'Name': 'Yysse', 'Age': 28, 'Location': 'Hyderabad'}
//     ]
//     }
//   }
//   render() {
//     return (
//       <div className="App">
//         Hello, React
//         <br/> Table 1 data
//         <QueryTable data={this.state.tableData}/>
        
//         <br/> Table 2 data
//         <QueryTable data={this.state.tableData2}/>
//       </div>
//       // <ApiResponse />
//       // <TestTable />
//       // <TableJson data={this.state.tableData}/>
//       // <QueryTable />
//       // <DynamicTable />
//     )
//   }
// }

// ReactDom.render(
//   <App />,
//   document.getElementById('app')
// )
//|------------------------------------------------------------------------




//| Original
//|------------------------------------------------------------------------
// class App extends React.Component {
//   render() {
//     return (
//       // <ApiResponse />
//       <TestTable />
//       // <QueryTable />
//       // <DynamicTable />
//     )
//   }
// }

// ReactDom.render(
//   <App />,
//   document.getElementById('app')
// )
//|------------------------------------------------------------------------
// <Container>
//         <StickyHeadTable />
//       </Container>

{/* <div>
        <p>{this.state.apiResponse}</p>
      </div> */}