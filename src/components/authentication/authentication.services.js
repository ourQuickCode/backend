/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - SERVICES INDEX

    1. getOneByFilter
    2. update

  - MODULE EXPORTS

*/

const userModel = require('./../../storage/models/user')

/**
 * ------------------------------------------
 * @titleDesc 1. getOneByFilter
 * @desc      user creation
 * @params    {object} user
 * ------------------------------------------
 */

const getOneByFilter = async filter => {
  const data = await userModel.findById(filter)
  return data
}

/**
 * ------------------------------------------
 * @titleDesc 2. update
 * @desc      user creation
 * @params    {object} user
 * ------------------------------------------
 */

const update = async (filter, update) => {
  return await userModel.findOneAndUpdate(filter, update, {
    returnOriginal: false
  })
}

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = {
  update,
  getOneByFilter
}
