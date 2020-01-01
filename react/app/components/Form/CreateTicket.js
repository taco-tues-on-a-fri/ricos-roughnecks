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
  // const theme = React.useContext(ThemeContext)

  return(
    <Form>
      <Form.Group controlId="createTicket.ControlInput1">
        <Form.Label>Ticket Name</Form.Label>
        <Form.Control as="input" />
      </Form.Group>
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
        </Row>
      </Container>
    </React.Fragment>

  )
}