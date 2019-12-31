
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
