/*

Index.js, is in charge of receiving the requests, it is the server,
it will verify that the requests are correct to enter the server or cancel them,
it has important configuration, database, headers, etc. the server.js
sends the information to response.js and route.js

*/

const express = require('express')
const { config } = require('./config')
const cors = require('cors')
const app = express()
const db = require('./storage/index')
const morgan = require('morgan')
const chalkl = require('chalk')
const user = require('./components/user/user.routes')
const post = require('./components/post/post.routes')

//middlewares
app.use(morgan('dev'))

// [initializing database]
db('')

// [server configuration]
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//validación que sí estemos en desarrollo
/* if (config.env === 'development') {
  console.log('[ Development config ]')
} */

// [routes]
app.use('/api/user', user)
app.use('/api/post', post)

// [static files]
app.use('/app', express.static('public'))

// [starting server]

app.listen(config.port, err => {
  if (err) console.error()
  else
    console.log(
      chalkl.magentaBright(`[ Server running on port ${config.port} ]`)
    )
})
