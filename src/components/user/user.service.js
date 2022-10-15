/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - SERVICES INDEX

    1. add
    2. update
    3. remove
    4. getAllUsersDb
    5. getOneUserByIdDb
    6. getOneByFilter
    7. getOneByFilterUser

  - MODULE EXPORTS

*/

const userModel = require('../../storage/models/user')

/**
 * ------------------------------------------
 * @titleDesc 1. add
 * @desc      user creation
 * @params    {object} user
 * ------------------------------------------
 */

const add = async user => {
  const myUser = new userModel(user)
  try {
    return await myUser.save()
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * ------------------------------------------
 * @titleDesc 2. update
 * @desc      update user by id
 * @params    {object} filter, {object} user,
 * ------------------------------------------
 */

const update = async (filter, update) => {
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

/**
 * ------------------------------------------
 * @titleDesc 3. remove
 * @desc      delete user by id
 * @params    {object} filter
 * ------------------------------------------
 */

const remove = async filter => {
  const data = await userModel.findByIdAndRemove(filter)
  if (!data) {
    throw new Error('User not found')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 4. getAllUsersDb
 * @desc      get all users
 * @params    null
 * ------------------------------------------
 */

const getAllUsersDb = () => {
  return userModel.find({})
}

/**
 * ------------------------------------------
 * @titleDesc 5. getOneUserByIdDb
 * @desc      get user by id
 * @params    id
 * ------------------------------------------
 */

const getOneUserByIdDb = async id => {
  const data = await userModel.findById(id)
  if (data) {
    return data
  } else {
    throw new Error('User not found')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 6. getOneByFilter
 * @desc      get user by id
 * @params    {object} filter
 * ------------------------------------------
 */

const getOneByFilter = async filter => {
  const data = await userModel.find(filter)
  return data
}

/**
 * ------------------------------------------
 * @titleDesc 7. getOneByFilterUser
 * @desc      get user by id
 * @params    {object} filter
 * ------------------------------------------
 */

const getOneByFilterUser = async filter => {
  const data = await userModel.find(filter)
  return data
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
  getAllUsersDb,
  getOneUserByIdDb,
  getOneByFilter,
  getOneByFilterUser
}
