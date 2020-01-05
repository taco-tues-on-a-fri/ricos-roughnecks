// /routes/mount
import index from './index'
import api from './api'


//| define routes | added 01-04-2020 - taken control from server.js
//|------------------------------------------------------------------------
export default function (app) {
  app.use('/', index)
  app.use('/api', api)
}


//| original
//|------------------------------------------------------------------------
// module.exports = app => {
//   app.use('/', index)
//   app.use('/api', api)
//   // etc..
// }

