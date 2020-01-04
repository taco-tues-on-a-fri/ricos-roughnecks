import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const validate = values => {
  const errors = {};
  if (!values.ticketName) {
    errors.ticketName = 'Required'
  } else if (values.ticketName.length > 64) {
    errors.ticketName = 'Must be 64 characters or less'
  }

  if (!values.ticketType) {
    errors.ticketType = 'Required'
  } else if (values.ticketType === 'Choose...') {
    errors.ticketType = 'A selection must be made.'
  }

  if (!values.ticketDescription) {
    errors.ticketDescription = 'Required'
  } else if (values.ticketDescription.length > 64) {
    errors.ticketDescription = 'Must be 64 characters or less'
  }

  return errors
}


const TicketForm = () => {
  const formik = useFormik({
    initialValues: {
      ticketName: "",
      ticketType: "",
      ticketDescription: "",
      project: "",
      developer: "",
      ticketPriority: "",
      ticketStatus: "",
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })
  
  return(
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="ticketName">
            <Form.Label>Ticket Name </Form.Label>
            <Form.Control 
              as="input" 
              placeholder="Enter Ticket Name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticketName}
              isInvalid={formik.touched.ticketName && formik.errors.ticketName}
            />
            <Form.Text className="text-muted">
              Please only use serious names.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.ticketName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="ticketType">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Control 
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticketType}
            >
              <option>Choose...</option>
              <option>bug</option>
              <option>improvement</option>
              <option>new feature</option>
              <option>task</option>
              <option>custom issue</option>
            </Form.Control>
            {formik.touched.ticketType && formik.errors.ticketType ? (
              <div>{formik.errors.ticketType}</div>) : null}
          </Form.Group>
        </Form.Row>
        
        <Form.Group controlId="ticketDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
            as="textarea" 
            placeholder="Enter Ticket Description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ticketDescription}
          />
          {formik.touched.ticketDescription && formik.errors.ticketDescription ? (
            <div>{formik.errors.ticketDescription}</div>) : null}
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="project">
            <Form.Label>Project</Form.Label>
            <Form.Control 
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.project}
            >
              <option>Choose...</option>
              <option>Bug Tracker</option>
              <option>Random Name Generator</option>
              <option>Scraping Reddit</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="developer">
            <Form.Label>Assigned Developer</Form.Label>
            <Form.Control 
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.project}
            >
              <option>Choose...</option>
              <option>taco-tues-on-a-fri</option>
              <option>willstall</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
          <Form.Group as={Col} controlId="ticketPriority">
            <Form.Label>Ticket Priority</Form.Label>
            <Form.Control 
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticketPriority}
            >
              <option>Choose...</option>
              <option>blocker</option>
              <option>critical</option>
              <option>major</option>
              <option>minor</option>
              <option>trivial</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="ticketStatus">
            <Form.Label>Ticket Status</Form.Label>
            <Form.Control 
              as="select"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.ticketStatus}
            >
              <option>Choose...</option>
              <option>open</option>
              <option>in progress</option>
              <option>reopened</option>
              <option>resolved</option>
              <option>closed</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default TicketForm