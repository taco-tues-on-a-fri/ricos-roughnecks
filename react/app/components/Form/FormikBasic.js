import React from 'react';
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form'

export default function FormikBasic() {
  return (
    <div>
      <h1>Anywhere in your app!</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              as="input"
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}
            
            <Form.Control
              as="input"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

// export default FormikBasic;