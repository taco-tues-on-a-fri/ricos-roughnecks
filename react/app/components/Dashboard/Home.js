import React from 'react';
import NavigationBar from '../Navs/NavigationBar'
import BugTable from '../Table/BugTable'
import TableNav from '../Table/TableNav'
import Loading from '../Utils/Loading'
import util from 'util'
import Container from 'react-bootstrap/Container'
// import TableNav from '../Table/TableNav';

export default function Home () {
  return(
    <React.Fragment>
      <NavigationBar />
      <Container>
        <TableNav/>
      </Container>
    </React.Fragment>
  )
}