//| 01-07-20: Post is now working, and all the table column names are correct
//| 01-07-20: There is a problem with the construction of the insert query function
//|------------------------------------------------------------------------
import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { Redirect } from 'react-router-dom'
import { insertQuery } from '../../../utils/api'

const validate = values => {
  const errors = {};
  if (!values.ticket_name) {
    errors.ticket_name = 'Required'
  } else if (values.ticket_name.length > 64) {
    errors.ticket_name = 'Must be 64 characters or less'
  }

  if (!values.ticket_type) {
    errors.ticket_type = 'Required'
  } else if (values.ticket_type === 'Choose...') {
    errors.ticket_type = 'A selection must be made.'
  }

  if (!values.ticket_description) {
    errors.ticket_description = 'Required'
  } else if (values.ticket_description.length > 64) {
    errors.ticket_description = 'Must be 64 characters or less'
  }

  if (!values.ticket_project) {
    errors.ticket_project = 'Required'
  } else if (values.ticket_project === 'Choose...') {
    errors.ticket_project = 'A selection must be made.'
  }

  if (!values.assigned_developer) {
    errors.assigned_developer = 'Required'
  } else if (values.assigned_developer === 'Choose...') {
    errors.assigned_developer = 'A selection must be made.'
  }
  
  if (!values.ticket_priority) {
    errors.ticket_priority = 'Required'
  } else if (values.ticket_priority === 'Choose...') {
    errors.ticket_priority = 'A selection must be made.'
  }
  
  if (!values.ticket_status) {
    errors.ticket_status = 'Required'
  } else if (values.ticket_status === 'Choose...') {
    errors.ticket_status = 'A selection must be made.'
  }

  return errors
}

const TicketForm = () => {
  const [toNext, setToNext] = useState(false)
  const [formValues, setFormValues] = useState(null)
  
  const handleSubmit = values => {
    setFormValues(values)
    insertQuery(values)
    alert(JSON.stringify(values, null, 2));
    setToNext(true)
  }

  return (
    <Formik
      initialValues={{
        ticket_name: "",
        ticket_type: "",
        ticket_description: "",
        ticket_project: "",
        assigned_developer: "",
        ticket_priority: "",
        ticket_status: "",
      }}
      onSubmit={(values) => handleSubmit(values)}
      validate={validate}
      // onSubmit={(values, { setSubmitting }) => {
      //   setTimeout(() => {
      //     alert(JSON.stringify(values, null, 2));
      //     setSubmitting(false);
      //   }, 400)
      // }}
    >
      {formik => (
        <Container>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="ticket_name">
                <Form.Label>Ticket Name </Form.Label>
                <Form.Control 
                  as="input" 
                  placeholder="Enter Ticket Name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticket_name}
                  isInvalid={formik.touched.ticket_name && formik.errors.ticket_name}
                />
                <Form.Text className="text-muted">
                  Please only use serious names.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticket_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="ticket_type">
                <Form.Label>Ticket Type</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticket_type}
                  isInvalid={formik.touched.ticket_type && formik.errors.ticket_type}
                >
                  <option>Choose...</option>
                  <option>bug</option>
                  <option>improvement</option>
                  <option>new feature</option>
                  <option>task</option>
                  <option>custom issue</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticket_type}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            
            <Form.Group controlId="ticket_description">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                placeholder="Enter Ticket Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ticket_description} 
                isInvalid={formik.touched.ticket_description && formik.errors.ticket_description}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.ticket_description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="ticket_project">
                <Form.Label>Project</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticket_project}
                  isInvalid={formik.touched.ticket_project && formik.errors.ticket_project}
                >
                  <option>Choose...</option>
                  <option>Bug Tracker</option>
                  <option>Random Name Generator</option>
                  <option>Scraping Reddit</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticket_project}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="assigned_developer">
                <Form.Label>Assigned Developer</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.assigned_developer}
                  isInvalid={formik.touched.assigned_developer && formik.errors.assigned_developer}
                >
                  <option>Choose...</option>
                  <option>taco-tues-on-a-fri</option>
                  <option>willstall</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.assigned_developer}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            
            <Form.Row>
              <Form.Group as={Col} controlId="ticket_priority">
                <Form.Label>Ticket Priority</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticket_priority}
                  isInvalid={formik.touched.ticket_priority && formik.errors.ticket_priority}
                >
                  <option>Choose...</option>
                  <option>blocker</option>
                  <option>critical</option>
                  <option>major</option>
                  <option>minor</option>
                  <option>trivial</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticket_priority}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="ticket_status">
                <Form.Label>Ticket Status</Form.Label>
                <Form.Control 
                  as="select"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticket_status}
                  isInvalid={formik.touched.ticket_status && formik.errors.ticket_status}
                >
                  <option>Choose...</option>
                  <option>open</option>
                  <option>in progress</option>
                  <option>reopened</option>
                  <option>resolved</option>
                  <option>closed</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.ticket_status}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit</Button>
            {toNext ? <Redirect to="/tablenav" /> : null}
          </Form>
        </Container>
      )}
    </Formik>
  )
}


export default TicketForm
