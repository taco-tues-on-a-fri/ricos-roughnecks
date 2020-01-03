import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function CreateTicket() {
  const ticketName_ref = useRef()
  const ticketType_ref = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    const ticketName = ticketName_ref.current.value
    const ticketType = ticketType_ref.current.value

    console.log(ticketName, ticketType)
  }

  const handleReset = () => {
    ticketName_ref.current.value = ''
    ticketType_ref.current.value = ''
  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="ticketName">
          <Form.Label>Ticket Name</Form.Label>
          <Form.Control 
            as="input"
            placeholder="Enter Ticket Name"
            autoComplete="off"
            ref={ticketName_ref}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="ticketType">
          <Form.Label>Ticket Type</Form.Label>
          <Form.Control 
            as="select"
            ref={ticketType_ref}
          >
            <option>Choose...</option>
            <option>bug</option>
            <option>improvement</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Button 
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Button 
        type="submit"
        onClick={handleReset}
      >
        Reset
      </Button>
    </Form>
  )
}






function TicketInput({ onSubmit, label }) {
  const [ticketState, setTicketState] = useState([
    {
      ticketName: "",
      ticketType: "",
    },
  ])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(ticketState)
    console.log(ticketState)
  }

  const handleChange = (event) => {
    setTicketState(event.target.value)
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId={ticketState.ticketName}>
          <Form.Label>Ticket Name??</Form.Label>
          <Form.Control 
            as="input"
            value={ticketState.ticketName}
            placeholder="Enter Ticket Name"
            autoComplete="off"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId={ticketState.ticketType}>
          <Form.Label>Ticket Type</Form.Label>
          <Form.Control 
            as="select"
            value={ticketState.ticketType}
            onChange={handleChange()}
          >
            <option>Choose...</option>
            <option>bug</option>
            <option>improvement</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Button 
        type="submit"
        disabled={!ticketState.ticketName}
      >
        Submit
      </Button>
    </Form>
  )
}

function OldCreateTicket() {
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