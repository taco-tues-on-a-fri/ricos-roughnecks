//| 12-29-19: Refactoring
//| 12-29-19: Implemented: 
//| 12-29-19: Result: 
//|------------------------------------------------------------------------
import namor from 'namor'
import { fetchQuery } from './api'
import util from 'util'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = () => {
  const statusChance = Math.random()
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}



const newRow = () => {
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
  }
}

// export default function makeData() {
//   fetchQuery('ticket')
//   .then((query) => {
//     query.map((lens) => {
//       console.log('inside makeData: lens')
//       console.log(util.inspect(lens))
//       return {
//         ...lens
//       }
//     })
//   })
//   const makeDataLevel = (depth = 0) => {
//     const len = lens[depth]
//     return range(len).map(d => {
//       return {
//         ...newPerson(),
//         subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
//       }
//     })
//   }

//   return makeDataLevel()
// }

//| removing ...column from params
//|------------------------------------------------------------------------
export default function makeData() {
  fetchQuery('ticket')
  .then((query) => {
    query.map((column) => {
      console.log('inside makeData: column')
      console.log(util.inspect(column))
      return {
        ...column
      }
    })
  })
}

//| Working, but outputting [{},99,[{},{}]]
//|------------------------------------------------------------------------
// export default function makeData() {
//   fetchQuery('ticket')
//   .then((query) => {
//     console.log('inside makeData: query')
//     console.log(util.inspect(query))
//     query.map((...column) => {
//       console.log('inside makeData: column')
//       console.log(util.inspect(column))
//       return {
//         ...column
//       }
//     })
//   })
// }

//| removing ...column from params
//|------------------------------------------------------------------------
// export default function makeData() {
//   fetchQuery('ticket')
//   .then((query) => {
//     query.map((column) => {
//       console.log('inside makeData: column')
//       console.log(util.inspect(column))
//       return {
//         ...column
//       }
//     })
//   })
// }

//| removing ...column from return
//|------------------------------------------------------------------------
// export default function makeData() {
//   fetchQuery('ticket')
//   .then((query) => {
//     query.map((row) => {
//       // console.log('inside makeData: row')
//       console.log(util.inspect(row))
//       return {
//         row
//       }
//     })
//   })
// }


//| removing object wrapper
//|------------------------------------------------------------------------
// export default function makeData() {
//   fetchQuery('ticket')
//   .then((query) => {
//     query.map((row) => {
//       // console.log('inside makeData: row')
//       console.log(util.inspect(row))
//       return row
//     })
//   })
// }