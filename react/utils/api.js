import util from 'util'
import queryString from 'query-string'

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



//| v.08 01-08-20 | Building off of v.06 - First version known to work
//| v.08 01-08-20 | Works!
//|------------------------------------------------------------------------
export function insertQuery (values) {
  // let stringified = queryString.stringify(values)
  const endpoint = window.encodeURI(`http://localhost:9000/api/ticket`)
  fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Type':'application/x-www-form-urlencoded' 
  },
  body: JSON.stringify(values)
  })
    .then(res=>res.json())
    .then(res => console.log(res));
}



//| v.07 01-08-20 | only shows up as GET
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//     let stringified = queryString.stringify(values)
//     console.log(util.inspect(stringified))
//     const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/?${stringified}`)
//     return fetch(endpoint, {
//       method: 'POST',
//       headers: { 'Content-Type':'application/x-www-form-urlencoded' },
//   //     // body: `?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data[0]) {
//           throw new Error(data.message)
//         }
  
//         return data
//       })
//   }


//| v.06 01-08-20 | First version known to work
//|------------------------------------------------------------------------
// export function insertQuery (values) {
// console.log('line23')
// console.log(util.inspect(JSON.stringify(values)))
//   fetch('http://localhost:9000/api/ticket/', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(values)
//   })
//     .then(res=>res.json())
//     .then(res => console.log(res));
// }






//|------------------------------------------------------------------------
//|------------------------------------------------------------------------
//| Historical Attempts
//|------------------------------------------------------------------------
//| v.01 01-06-20
//| v.01 01-08-20 works | url shows up as expected
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
//|------------------------------------------------------------------------
//| v.03 01-06-20 | version at point of finding out req.params was empty 
//| v.03 01-06-20 |   and finding stack overflow answer. next version implements findings.
//| v.03 01-06-20 |     use this to generate a post for stackoverflow
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//   // const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/${query}`)
//   console.log('values:')
//   console.log(util.inspect(values))
//   const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/`)
//   console.log(endpoint)
//   return fetch(endpoint, {
//     method: 'POST',
//     body: `?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`,
//     headers: { 'Content-type': 'application/x-www-form-urlencoded' }
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data[0]) {
//         throw new Error(data.message)
//       }

//       return data
//     })
// }
//|------------------------------------------------------------------------
//| v.04 01-06-20 |  stackoverflow | failed
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//   console.log('values:')
//   console.log(util.inspect(values))
//   let stringified = queryString.stringify(values)
//   location.search = stringified
//   console.log(util.inspect(stringified))
//   const endpoint = window.encodeURI(`http://localhost:9000/api/ticket/`)
//   return fetch(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type':'application/x-www-form-urlencoded' },
//     body: location.search
//     // body: `?ticket_name=${values.ticket_name}&ticket_type=${values.ticket_type}&ticket_description=${values.ticket_description}&ticket_project=${values.ticket_project}&assigned_developer=${values.assigned_developer}&ticket_priority=${values.ticket_priority}&ticket_status=${values.ticket_status}`,
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data[0]) {
//         throw new Error(data.message)
//       }

//       return data
//     })
// }
//|------------------------------------------------------------------------
//| v.05 01-06-20 | 
//| v.05 01-06-20 | https://stackoverflow.com/questions/29775797/fetch-post-json-data/42493030#42493030
//| v.05 01-08-20 | works - but gives a strange error in browser console. request body has expected data.
//|------------------------------------------------------------------------
// export function insertQuery (values) {
//   fetch('http://localhost:9000/api/ticket/', {
//   method: 'POST',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(values)
//   }).then(res=>res.json())
//   .then(res => console.log(res));
// }

//| v.05 01-06-20 | Example
//|------------------------------------------------------------------------
// fetch('https://httpbin.org/post', {
//   method: 'post',
//   headers: {
//     'Accept': 'application/json, text/plain, */*',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({a: 7, str: 'Some string: &=&'})
// }).then(res=>res.json())
//   .then(res => console.log(res));
//|------------------------------------------------------------------------
//|------------------------------------------------------------------------