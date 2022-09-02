/*
  Businessman model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const businessmanSchema = new Schema({
  image: {
    type: [String],
    default: undefined
  },
    fullname: {
      type: String,
      minLength: 3,
      maxlength: 35,
      require: true
    },
    email: {
        type: String,
        require: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    phoneNumber: {
      type: Number,
      min: 1000000000,
      max: 9999999999,
    },
    password: {
      type: String,
      minLength: 5,
      maxlength: 100,
      require: true
    },
    locals: [{ type: Schema.Types.ObjectId, ref: 'locals' }],
    date: String,
    resetToken: String,
})

const businessmanModel = mongoose.model('businessmen', businessmanSchema)

module.exports = businessmanModel