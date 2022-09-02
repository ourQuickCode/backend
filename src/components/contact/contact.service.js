/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [PUT] ( SEND ) EMAIL

  - MODULE EXPORTS

*/

const postModel = require('./../../storage/models/post')

//------------------------------------------------------------------------------------------------
//1.1.1 ( SEND ) EMAIL
//------------------------------------------------------------------------------------------------

const send = async post => {
  const newPost = new postModel(post)
  return newPost.save()
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  send
}
