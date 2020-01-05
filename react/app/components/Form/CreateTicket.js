import React, { useState } from 'react'
// import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle, FaUber } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { ThemeContext } from 'styled-components'

function TicketForm({ onSubmit, label }) {
  const [ticketInput, setTicketInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(ticketInput)
  }

  const handleChange = (event) => setTicketInput(event.target.value)

  return(
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridTicketName">
          <Form.Label>Ticket Name</Form.Label>
          <Form.Control as="input" placeholder="Enter Ticket Name"/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridType">
          <Form.Label>Ticket Type</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>bug</option>
            <option>improvement</option>
            <option>new feature</option>
            <option>task</option>
            <option>custom issue</option>
          </Form.Control>
        </Form.Group>

      </Form.Row>
      
      <Form.Group controlId="formGridDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" placeholder="Enter Ticket Description"/>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="formGridProject">
          <Form.Label>Project</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>Bug Tracker</option>
            <option>Random Name Generator</option>
            <option>Scraping Reddit</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDeveloper">
          <Form.Label>Assigned Developer</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>taco-tues-on-a-fri</option>
            <option>willstall</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      
      <Form.Row>
        <Form.Group as={Col} controlId="formGridPriority">
          <Form.Label>Ticket Priority</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>blocker</option>
            <option>critical</option>
            <option>major</option>
            <option>minor</option>
            <option>trivial</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStatus">
          <Form.Label>Ticket Status</Form.Label>
          <Form.Control as="select">
            <option>Choose...</option>
            <option>open</option>
            <option>in progress</option>
            <option>reopened</option>
            <option>resolved</option>
            <option>closed</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

    </Form>
  )
}

export default function CreateTicket() {
  const [ticket, setTicket] = useState(null)

  const handleSubmit = (submittedTicket) => setTicket(submittedTicket)
  
  const handleReset = () => setTicket(null)

  return (
    <React.Fragment>
      <Container>
        <h1 className='center-text header-lg'>Create Ticket</h1>
        <Row>
          <Col>
            {<TicketForm
                label="Ticket Form"
                onSubmit={(submittedTicket) => handleSubmit(submittedTicket)}
              /> 
            }
          </Col>

          {ticket && (
            <Link
              className="btn dark-btn btn-space"
              to={{
                pathname: "/ticket/create",
                search: `?ticket=${ticket}`
              }}
            >
              Submit
            </Link>
          )}
        </Row>
      </Container>
    </React.Fragment>

  )
}