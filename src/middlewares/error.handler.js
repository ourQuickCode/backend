const response = require('./../network/response')
const chalkl = require('chalk')

function logErrors(err, req, res, next) {
  console.log(
    chalkl.red('~ file: error.handler.js ~ line 4 ~ logErrors ~ logErrors', err)
  )
  console.log(err)
  next(err)
}

function errorHandler(err, req, res, next) {
  response.error(req, res, err, 500, err)
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
