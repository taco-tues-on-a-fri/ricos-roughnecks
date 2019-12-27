//| implement later
//|------------------------------------------------------------------------
// function getErrorMsg (message, username) {
//   if (message === 'Not Found') {
//     return `${username} doesn't exist`
//   }

//   return message
// }


export function getTickets (search_params) {
  // return fetch(`https://api.github.com/users/${username}`) 
  return fetch("http://localhost:9000/api/ticket")
    .then((res) => res.json())
    .then((tickets) => {
      if(tickets.message) {
        throw new Error(getErrorMsg(tickets.message, search_params))
      }

      return tickets
    })
}

export function getQuery (query) {
  // return fetch(`https://api.github.com/users/${username}`) 
  return fetch(`http://localhost:9000/api/${query}`)
    .then((res) => res.json())
    .then((query_response) => {
      if(query_response.message) {
        throw new Error(getErrorMsg(query_response.message, query))
      }

      return query_response
    })
}

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


//| backup area
//|------------------------------------------------------------------------

// function getErrorMsg (message, username) {
//   if (message === 'Not Found') {
//     return `${username} doesn't exist`
//   }

//   return message
// }

// function getProfile (username) {
//   // return fetch(`https://api.github.com/users/${username}${params}`) 
//   return fetch(`https://api.github.com/users/${username}`) 
//     .then((res) => res.json())
//     .then((profile) => {
//       if(profile.message) {
//         throw new Error(getErrorMsg(profile.message, username))
//       }

//       return profile
//     })
// }

// function getRepos (username) {
//   // return fetch (`https://api.github.com/users/${username}/repos${params}&per_page=100`)
//   return fetch (`https://api.github.com/users/${username}/repos`)
//     .then((res) => res.json())
//     .then((repos) => {
//       if (repos.message) {
//         throw new Error(getErrorMsg(repos.message, username))
//       }

//       return repos
//     })
// }


// function getStarCount (repos) {
//   return repos.reduce((count, { stargazers_count }) => count + stargazers_count, 0)
// }

// function calculateScore (followers, repos) {
//   return (followers * 3) + getStarCount(repos)
// }


// function getUserData (player) {
//   return Promise.all([
//     getProfile(player),
//     getRepos(player)
//   ]).then(([ profile, repos ]) => ({
//     profile,
//     score: calculateScore(profile.followers, repos)
//   }))
// }


// function sortPlayers (players) {
//   return players.sort((a,b) => b.score - a.score)
// }

// export function battle (players) {
//   return Promise.all([
//     getUserData(players[0]),
//     getUserData(players[1])
//   ]).then((results) => sortPlayers(results))
// }


// export function fetchPopularRepos (language) {
//   const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

//   return fetch(endpoint)
//     .then((res) => res.json())
//     .then((data) => {
//       if (!data.items) {
//         throw new Error(data.message)
//       }

//       return data.items
//     })
// }