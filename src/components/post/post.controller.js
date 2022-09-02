/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) POST
    2.2 [PUT] ( UPDATE ) POST
    3.3 [DELETE] ( DELETE ) POST
    4.4 [GET] ( SHOW ) ALL POSTS
    5.5 [GET] ( SHOW ) POST BY ID
    6.6 [SEARCH] ( SEARCH ) POST

  - MODULE EXPORTS

*/

const storage = require('./post.service')

//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) POST
//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) POST
//------------------------------------------------------------------------------------------------

const updateLocal = async (id, post) => {
  console.log(id, post)
  try {
    if (!id || !post) {
      throw new Error('Missing data')
    }

    const filter = {
      _id: id
    }

    const result = await storage.update(filter, post)

    const finalResponse = {
      data,
      'System Message': 'Post succesfully updated'
    }
    return finalResponse
  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//3.3 ( DELETE ) POST
//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//4.4 ( SHOW ) ALL POSTS
//------------------------------------------------------------------------------------------------

const getAllPost = async () => {
  const result = await storage.getAllPostsDb()
  finalResponse = {
    data: result,
    'System message': 'Correct posts search'
  }
  return finalResponse
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) POST BY ID
//------------------------------------------------------------------------------------------------

const getPostById = async id => {
  const result = await storage.getOnePostByIdDb(id)
  finalResponse = {
    data: result,
    'System message': 'Correct post search'
  }
  return finalResponse
}

//------------------------------------------------------------------------------------------------
//6.6 ( SEARCH ) POST
//------------------------------------------------------------------------------------------------

const search = async searchValue => {
  const result = await storage.searchDb(searchValue)
  finalResponse = {
    data: result,
    'System message': 'Search successful'
  }
  return finalResponse
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createPost,
  updateLocal,
  deletePost,
  getAllPost,
  getPostById,
  search
}
