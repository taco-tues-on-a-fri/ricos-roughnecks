import util from 'util'

export function fetchQuery (query) {
  const endpoint = window.encodeURI(`http://localhost:9000/api/${query}`)
  // const endpoint = window.encodeURI(`http://localhost:9000/api/ticket`)
  
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      }
        // console.log('inside fetch: data')
        // console.log(util.inspect(data))
      return data
    })
}