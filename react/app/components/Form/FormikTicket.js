import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

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

  if (!values.project) {
    errors.project = 'Required'
  } else if (values.project === 'Choose...') {
    errors.project = 'A selection must be made.'
  }

  if (!values.developer) {
    errors.developer = 'Required'
  } else if (values.developer === 'Choose...') {
    errors.developer = 'A selection must be made.'
  }
  
  if (!values.ticketPriority) {
    errors.ticketPriority = 'Required'
  } else if (values.ticketPriority === 'Choose...') {
    errors.ticketPriority = 'A selection must be made.'
  }
  
  if (!values.ticketStatus) {
    errors.ticketStatus = 'Required'
  } else if (values.ticketStatus === 'Choose...') {
    errors.ticketStatus = 'A selection must be made.'
  }

  return errors
}

const TicketForm = () => {
  return (
    <Formik
      initialValues={{
        ticketName: "",
        ticketType: "",
        ticketDescription: "",
        project: "",
        developer: "",
        ticketPriority: "",
        ticketStatus: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400)
      }}
    >
      {formik => (
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
                  isInvalid={formik.touched.ticketType && formik.errors.ticketType}
                >
                  <option>Choose...</option>
                  <option>bug</option>
                  <option>improvement</option>
                  <option>new feature</option>
                  <option>task</option>
                  <option>custom issue</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticketType}
                </Form.Control.Feedback>
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
                isInvalid={formik.touched.ticketDescription && formik.errors.ticketDescription}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.ticketDescription}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="project">
                <Form.Label>Project</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.project}
                  isInvalid={formik.touched.project && formik.errors.project}
                >
                  <option>Choose...</option>
                  <option>Bug Tracker</option>
                  <option>Random Name Generator</option>
                  <option>Scraping Reddit</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.project}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="developer">
                <Form.Label>Assigned Developer</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.developer}
                  isInvalid={formik.touched.developer && formik.errors.developer}
                >
                  <option>Choose...</option>
                  <option>taco-tues-on-a-fri</option>
                  <option>willstall</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.developer}
                </Form.Control.Feedback>
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
                  isInvalid={formik.touched.ticketPriority && formik.errors.ticketPriority}
                >
                  <option>Choose...</option>
                  <option>blocker</option>
                  <option>critical</option>
                  <option>major</option>
                  <option>minor</option>
                  <option>trivial</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticketPriority}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="ticketStatus">
                <Form.Label>Ticket Status</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticketStatus}
                  isInvalid={formik.touched.ticketStatus && formik.errors.ticketStatus}
                >
                  <option>Choose...</option>
                  <option>open</option>
                  <option>in progress</option>
                  <option>reopened</option>
                  <option>resolved</option>
                  <option>closed</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticketStatus}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      )}
    </Formik>
  )
}


export default TicketForm
