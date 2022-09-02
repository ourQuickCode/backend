/*
  Local model
*/

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const promotionSchema = new Schema({
    locals: [{ type: Schema.Types.ObjectId, ref: 'locals' }],
    name: {
      type: String,
      minLength: 2,
      maxlength: 35,
      require: true
    },
    price: {
      type: Number,
      min: 1,
      max: 999999,
      require: true
    },
    description: {
      type: String,
      minLength: 3,
      maxlength: 45,
      require: true
    },
    image: {
      type: [String],
      default: undefined
    },
})

const promotionModel = mongoose.model('promotions', promotionSchema)

module.exports = promotionModel