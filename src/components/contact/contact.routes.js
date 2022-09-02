/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [PUT] ( SEND ) EMAIL

  - MODULE EXPORTS

*/

const express = require('express')
const response = require('./../../network/response')
const controller = require('./contact.controller')
const router = express.Router()

//------------------------------------------------------------------------------------------------
//1 ( SEND ) EMAIL
//------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
  const { name, number, email, message } = req.body
  try {
    const result = await controller.sendEmail(name, number, email, message)
    response.success(req, res, result, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router
