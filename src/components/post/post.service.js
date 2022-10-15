/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - SERVICES INDEX

    1. add
    2. update
    3. remove
    4. getAllPostsDb
    5. getOnePostByIdDb
    6. searchDb

  - MODULE EXPORTS

*/

const postModel = require('./../../storage/models/post')

/**
 * ------------------------------------------
 * @titleDesc 1. add
 * @desc      post creation
 * @params    {object} post
 * ------------------------------------------
 */

const add = async post => {
  const newPost = new postModel(post)
  return newPost.save()
}

/**
 * ------------------------------------------
 * @titleDesc 2. update
 * @desc      update post by id
 * @params    {object} filter, {object} post,
 * ------------------------------------------
 */

const update = async (filter, post) => {
  return await postModel.findOneAndUpdate(filter, post, {
    returnOriginal: false
  })
}

/**
 * ------------------------------------------
 * @titleDesc 3. remove
 * @desc      delete post by id
 * @params    {object} filter
 * ------------------------------------------
 */

const remove = async filter => {
  const data = await postModel.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('Post not found')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 4. getAllPostsDb
 * @desc      get all posts
 * @params    null
 * ------------------------------------------
 */

const getAllPostsDb = async () => {
  const locals = await postModel.find().exec()
  return locals
}

/**
 * ------------------------------------------
 * @titleDesc 5. getOnePostByIdDb
 * @desc      get post by id
 * @params    id
 * ------------------------------------------
 */

const getOnePostByIdDb = async id => {
  const posts = await postModel.findOne({ _id: id })
  return posts
}

/**
 * ------------------------------------------
 * @titleDesc 6. searchDb
 * @desc      post search
 * @params    searchValue
 * ------------------------------------------
 */

const searchDb = async searchValue => {
  const posts = await postModel.find({
    title: { $regex: `.*${searchValue}`, $options: 'i' }
  })
  return posts
}

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = {
  add,
  update,
  remove,
  getAllPostsDb,
  getOnePostByIdDb,
  searchDb
}
