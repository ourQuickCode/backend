/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  publicationDate: String,
  title: {
    type: String,
    minLength: 2,
    maxlength: 35,
    require: true
  },
  text: {
    type: String,
    minLength: 2,
    maxlength: 1000,
    require: true
  }
})

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel
