export function getKeys ({ data }){
  return Object.keys(data[0]);
}

export function formatHeader (string){
  return string.split('_').map(word => word.substring(0,1).toUpperCase()+ word.substring(1)).join(' ')
}

export function createUniqueKey (number, headerColumn){
  let wordArray = headerColumn.split('_')
  return `${wordArray[0]}_${number}`
}