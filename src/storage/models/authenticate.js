/*
  User model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const authenticateSchema = new Schema({
  user: String,
  authenticate: String,
})

const authenticateModel = mongoose.model('authenticate', authenticateSchema)

module.exports = authenticateModel