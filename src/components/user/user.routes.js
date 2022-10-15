/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - DELETE - Delete information from the server.

  - ROUTES INDEX

    1. CREATE USER
    2. UPDATE USER
    3. DELETE USER
    4. SHOW ALL USERS
    5. SHOW USER BY ID

  - MODULE EXPORTS

*/

const express = require('express')
const router = express.Router()
const passport = require('passport')
const response = require('../../network/response')
const controller = require('./user.controller')
const { checkRoles } = require('./../../middlewares/aut.handler')

/**
 * ------------------------------------------
 * @titleDesc 1. CREATE USER
 * @desc      user creation
 * @access    Private
 * @roles     administrator
 * @route     POST api/user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.post('/register', async (req, res) => {
  const { fullname, email, password, role } = req.body
  try {
    const user = await controller.createUser(fullname, email, password, role)
    response.success(req, res, user, 201)
  } catch (error) {
    response.error(req, res, error, 400, error)
  }
})

/**
 * ------------------------------------------
 * @titleDesc 2. UPDATE USER
 * @desc      update user by id
 * @access    Private
 * @roles     administrator
 * @route     PUT api/user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res) => {
    const { id } = req.params
    const { body: user } = req
    try {
      const data = await controller.updateUser(id, user)
      response.success(req, res, data, 200)
    } catch (error) {
      response.error(req, res, error, 400, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 3. DELETE USER
 * @desc      delete user by id
 * @access    Private
 * @roles     administrator
 * @route     DELETE api/user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res) => {
    const { id } = req.params
    try {
      const user = await controller.deleteUser(id)
      response.success(res, res, user, 200)
    } catch (error) {
      response.error(req, res, error, 400, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 4. SHOW ALL USERS
 * @desc      get all users
 * @access    Private
 * @roles     administrator
 * @route     GET api/user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res) => {
    try {
      const data = await controller.getAllUsers()
      response.success(req, res, data, 200)
    } catch (error) {
      response.error(req, res, 'Something wrong happend', 500, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 5. SHOW USER BY ID
 * @desc      get user by id
 * @access    Private
 * @roles     administrator
 * @route     GET api/user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getOneUserById(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = router
