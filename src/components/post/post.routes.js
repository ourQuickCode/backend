/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - ROUTES INDEX

    1. CREATE POST
    2. UPDATE POST
    3. DELETE POST
    4. SHOW ALL POSTS
    5. SHOW POST BY ID
    6. SEARCH POST

  - MODULE EXPORTS

*/

const express = require('express')
const router = express.Router()
const passport = require('passport')
const response = require('./../../network/response')
const controller = require('./post.controller')
const { checkRoles } = require('./../../middlewares/aut.handler')

/**
 * ------------------------------------------
 * @titleDesc 1. CREATE POST
 * @desc      post creation
 * @access    Private
 * @roles     administrator
 * @route     POST api/post
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const { title, text } = req.body
    try {
      const post = await controller.createPost(title, text)
      response.success(req, res, post, 201)
    } catch (error) {
      response.error(req, res, error, 400, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 2. UPDATE POST
 * @desc      update post by id
 * @access    Private
 * @roles     administrator
 * @route     PUT api/post/:id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('administrator'),
  async (req, res, next) => {
    const { id } = req.params
    const { body: post } = req
    try {
      const local = await controller.updateLocal(id, post)
      response.success(req, res, local, 201)
    } catch (error) {
      response.error(req, res, error, 400, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 3. DELETE POST
 * @desc      delete post by id
 * @access    Private
 * @roles     administrator
 * @route     DELETE api/post/:id
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
      const post = await controller.deletePost(id)
      response.success(res, res, post, 200)
    } catch (error) {
      response.error(req, res, error, 400, error)
    }
  }
)

/**
 * ------------------------------------------
 * @titleDesc 4. SHOW ALL POSTS
 * @desc      get all posts
 * @access    Public
 * @route     GET api/post
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.get('/', async (req, res) => {
  try {
    const result = await controller.getAllPost()
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error, 400, error)
  }
})

/**
 * ------------------------------------------
 * @titleDesc 5. SHOW POST BY ID
 * @desc      get post by id
 * @access    Public
 * @route     GET api/post/:id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await controller.getPostById(id)
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error, 400, error)
  }
})

/**
 * ------------------------------------------
 * @titleDesc 6. SEARCH POST
 * @desc      post search
 * @access    Public
 * @route     GET api/post/search/post
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

router.get('/search/posts', async (req, res) => {
  const { search } = req.query
  try {
    const result = await controller.search(search)
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error, 400, error)
  }
})

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = router
