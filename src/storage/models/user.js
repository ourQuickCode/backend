/*
  User model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  fullname: {
    type: String,
    minLength: 3,
    maxlength: 35,
    require: true
  },
  email: {
    type: String,
    minLength: 5,
    maxlength: 35,
    require: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    minLength: 5,
    maxlength: 100,
    require: true
  },
  date: String
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel
