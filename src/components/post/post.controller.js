/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CONTROLLER INDEX

    1. CREATE POST
    2. UPDATE POST
    3. DELETE POST
    4. SHOW ALL POSTS
    5. SHOW POST BY ID
    6. SEARCH POST

  - MODULE EXPORTS

*/

const storage = require('./post.service')

/**
 * ------------------------------------------
 * @titleDesc 1. CREATE POST
 * @desc      post creation
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const createPost = async (title, text) => {
  try {
    if (!title || !text) {
      throw new Error('Missing data')
    }

    const now = new Date()

    day = now.getDate()
    month = now.getMonth() + 1
    year = now.getFullYear()

    const date = year + '/' + month + '/' + day

    const post = {
      publicationDate: date,
      title,
      text
    }

    const newPost = await storage.add(post)

    finalResponse = {
      data: newPost,
      'System message': 'Post successfully created'
    }

    return finalResponse
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * ------------------------------------------
 * @titleDesc 2. UPDATE POST
 * @desc      update post by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const updateLocal = async (id, post) => {
  try {
    if (!id || !post) {
      throw new Error('Missing data')
    }

    const filter = {
      _id: id
    }

    const result = await storage.update(filter, post)

    const finalResponse = {
      data: result,
      'System Message': 'Post succesfully updated'
    }
    return finalResponse
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * ------------------------------------------
 * @titleDesc 3. DELETE POST
 * @desc      delete post by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const deletePost = async id => {
  if (!id) {
    throw new Error('Missing data')
  } else {
    const filter = {
      _id: id
    }

    await storage.remove(filter)

    finalResponse = {
      'System message': 'Post successfully deleted'
    }

    return finalResponse
  }
}

/**
 * ------------------------------------------
 * @titleDesc 4. SHOW ALL POSTS
 * @desc      get all posts
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const getAllPost = async () => {
  const result = await storage.getAllPostsDb()
  finalResponse = {
    data: result,
    'System message': 'Correct posts search'
  }
  return finalResponse
}

/**
 * ------------------------------------------
 * @titleDesc 5. SHOW POST BY ID
 * @desc      get post by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const getPostById = async id => {
  const result = await storage.getOnePostByIdDb(id)
  finalResponse = {
    data: result,
    'System message': 'Correct post search'
  }
  return finalResponse
}

/**
 * ------------------------------------------
 * @titleDesc 6. SEARCH POST
 * @desc      post search
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const search = async searchValue => {
  const result = await storage.searchDb(searchValue)
  finalResponse = {
    data: result,
    'System message': 'Search successful'
  }
  return finalResponse
}

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = {
  createPost,
  updateLocal,
  deletePost,
  getAllPost,
  getPostById,
  search
}
