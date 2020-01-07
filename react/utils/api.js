
export function fetchQuery (query) {
  const endpoint = window.encodeURI(`http://localhost:9000/api/${query}`)
  
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data[0]) {
        throw new Error(data.message)
      }

      return data
    })
}

//| v.01 01-06-20
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//   // const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/${query}`)
//   const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`)
//   console.log(endpoint)
//   return fetch(endpoint)
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data[0]) {
//         throw new Error(data.message)
//       }

//       return data
//     })
// }
//|------------------------------------------------------------------------


//| v.02 01-06-20
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//   // const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/${query}`)
//   const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`)
//   console.log(endpoint)
//   return fetch(endpoint, {method: 'POST'})
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data[0]) {
//         throw new Error(data.message)
//       }

//       return data
//     })
// }


//| v.03 01-06-20
//|------------------------------------------------------------------------
export function insertQuery (values) {
  // const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/${query}`)
  const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/`)
  console.log(endpoint)
  return fetch(endpoint, {
    method: 'POST',
    body: `?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`,
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data[0]) {
        throw new Error(data.message)
      }

      return data
    })
}