/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - ROUTES INDEX

    1. LOGIN USER
    2. SEND RECOVERY MAIL
    3. NEW USER PASSWORD

  - MODULE EXPORTS

*/

const express = require('express')
const router = express.Router()
const passport = require('passport')
const response = require('../../network/response')
const controller = require('./authentication.controller')

/**
 * ------------------------------------------
 * @titleDesc 1. LOGIN USER
 * @desc      login user
 * @access    Public
 * @route     POST api/authentication/login
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const token = await controller.generateToken(req.user)
      response.success(req, res, token, 201)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 2. SEND RECOVERY MAIL
 * @desc      send recovery mail
 * @access    Public
 * @route     PUT api/authentication/forgot-password-user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.put('/forgot-password-user', async (req, res, next) => {
  try {
    const { email } = req.body
    const data = await controller.recoverPassword(email)
    response.success(req, res, data, 200)
  } catch (error) {
    next(error)
  }
})

/**
 * ------------------------------------------
 * @titleDesc 3. NEW USER PASSWORD
 * @desc      new user password
 * @access    Public
 * @route     PUT api/authentication/new-password-user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.put('/new-password-user', async (req, res, next) => {
  try {
    const { password } = req.body
    const recoverPasswordToken = req.headers['passwordtoken']
    const data = await controller.createNewPassword(
      password,
      recoverPasswordToken
    )
    response.success(req, res, data, 201)
  } catch (error) {
    next(error)
  }
})

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = router
