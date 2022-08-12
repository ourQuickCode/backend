//------------------------------------------------------------------------------------------------
// [Database configuration]
//------------------------------------------------------------------------------------------------

const { config } = require('../config/index')
const mongoose = require('mongoose')
const chalkl = require('chalk')

const connect = async () => {
  mongoose.connect(
    'mongodb+srv://root:root@cluster0.m1wsgrl.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log(chalkl.magentaBright('[ Database conecction success ]'))
  })
}

module.exports = connect
