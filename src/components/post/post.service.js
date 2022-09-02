/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) LOCPOSTAL
    2.2.2 [PUT] ( UPDATE ) POST
    3.3.3 [DELETE] ( DELETE ) POST
    4.4.4 [GET] ( SHOW ) ALL POSTS
    5.5.5 [GET] ( SHOW ) POST BY ID
    6.6.6 [SEARCH] ( SEARCH ) POST

  - MODULE EXPORTS

*/

const postModel = require('./../../storage/models/post')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) POST
//------------------------------------------------------------------------------------------------

const add = async post => {
  const newPost = new postModel(post)
  return newPost.save()
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( UPDATE ) POST
//------------------------------------------------------------------------------------------------

const update = async (filter, post) => {
  return await postModel.findOneAndUpdate(filter, post, {
    returnOriginal: false
  })
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( DELETE ) POST
//------------------------------------------------------------------------------------------------

const remove = async filter => {
  const data = await postModel.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('Post not found')
  }
}

//------------------------------------------------------------------------------------------------
//4.4.4 ( SHOW ) ALL POSTS
//------------------------------------------------------------------------------------------------

const getAllPostsDb = async () => {
  const locals = await postModel.find().exec()
  return locals
}

//------------------------------------------------------------------------------------------------
//5.5.5 ( SHOW ) POST BY ID
//------------------------------------------------------------------------------------------------

const getOnePostByIdDb = async id => {
  const posts = await postModel.findOne({ _id: id })
  return posts
}

//------------------------------------------------------------------------------------------------
//6.6.6  ( SEARCH ) POST
//------------------------------------------------------------------------------------------------

const searchDb = async searchValue => {
  const posts = await postModel.find({title: {$regex: `.*${searchValue}`, $options:"i"}})
  return posts
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  update,
  remove,
  getAllPostsDb,
  getOnePostByIdDb,
  searchDb
}
