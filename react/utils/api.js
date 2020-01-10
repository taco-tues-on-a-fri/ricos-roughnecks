//| 01-10-20: TODO: make insertQuery a general function
//|------------------------------------------------------------------------
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


export function insertQuery (values) {
  const endpoint = window.encodeURI(`http://localhost:9000/api/ticket`)
  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
    })
    .then(res=>res.json())
    .then(res => console.log(res));
}