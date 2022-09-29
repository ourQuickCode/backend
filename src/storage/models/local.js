/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const localSchema = new Schema({
  published: Boolean,
  user: [{ type: Schema.Types.ObjectId, ref: 'businessmen' }],
  image: [{
    type: String,
    default: undefined,
  }],
  photoMenu: [{
    type: String,
    default: undefined,
  }],
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },
  localName: {
    type: String,
    minLength: 2,
    maxlength: 35,
    require: true
  },
  phoneNumber: {
    type: Number,
    min: 1000000000,
    max: 9999999999,
    require: true
  },
  categories: [{type: Object, require: true}],
  address: {
    type: String,
    minLength: 5,
    maxlength: 100,
    require: true
  },
  days: [{ type: Object}],
  logo: [{
    type: String,
    default: undefined
  }],
  promotions: [{ type: Schema.Types.ObjectId, ref: 'promotions' }],
  foods: [{ type: Schema.Types.ObjectId, ref: 'foods' }],
  date: String,
})

const localModel = mongoose.model('locals', localSchema)

module.exports = localModel