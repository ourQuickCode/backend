/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) POST
    2 [PUT] ( UPDATE ) POST
    3 [DELETE] ( DELETE ) POST
    4 [GET] ( SHOW ) ALL POSTS
    5 [GET] ( SHOW ) POST BY ID
    6 [GET] ( SEARCH ) POST

  - MODULE EXPORTS

*/

const express = require('express')
const response = require('./../../network/response')
const controller = require('./post.controller')
const router = express.Router()

//------------------------------------------------------------------------------------------------
//1 ( CREATE ) POST
//------------------------------------------------------------------------------------------------

router.post('/', async (req, res) => {
  const { title, text } = req.body
  try {
    const post = await controller.createPost(title, text)
    response.success(req, res, post, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) POST
//------------------------------------------------------------------------------------------------

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body: post } = req

  try {
    const local = await controller.updateLocal(id, post)
    response.success(req, res, local, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//3 ( DELETE ) POST
//------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const post = await controller.deletePost(id)
    response.success(res, res, post, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( SHOW ) ALL POSTS
//------------------------------------------------------------------------------------------------

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
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 ( SHOW ) POST BY ID
//------------------------------------------------------------------------------------------------

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
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//6 ( SEARCH ) POST
//------------------------------------------------------------------------------------------------

router.get('/search/posts', async (req, res) => {
  const { search } = req.query
  try {
    const result = await controller.search(search)
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router
