/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CONTROLLER INDEX

    1. CREATE USER
    2. UPDATE USER
    3. DELETE USER
    4. SHOW ALL USERS
    5. SHOW USER BY ID

  - MODULE EXPORTS

*/

const storage = require('./user.service')
const bcrypt = require('bcrypt')

/**
 * ------------------------------------------
 * @titleDesc 1. CREATE USER
 * @desc      user creation
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const createUser = async (fullname, email, password, role) => {
  if (!fullname || !email || !password || !role) {
    throw new Error('Missing data')
  }

  const emailExists = await storage.getOneByFilter({ email })

  if (emailExists.length >= 1) {
    throw new Error('Email used')
  } else {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, async (err, hashed) => {
        if (err) {
          reject(err)
        } else {
          resolve(hashed)
        }
      })
    })

    const now = new Date()

    day = now.getDate()
    month = now.getMonth() + 1
    year = now.getFullYear()

    const date = year + '/' + month + '/' + day

    const user = {
      role,
      fullname,
      email,
      password: hashedPassword,
      date
    }

    const newUser = await storage.add(user)

    finalResponse = {
      data: newUser,
      'System message': 'User successfully created'
    }

    return finalResponse
  }
}

/**
 * ------------------------------------------
 * @titleDesc 2. UPDATE USER
 * @desc      update user by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const updateUser = async (id, userUpdate) => {
  if (userUpdate) {
    if (userUpdate.password) {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(userUpdate.password, 10, async (err, hashed) => {
          if (err) {
            reject(err)
          } else {
            resolve(hashed)
          }
        })
      })

      userUpdate.password = hashedPassword
    }
    const filter = {
      _id: id
    }
    const userUpdated = await storage.update(filter, userUpdate)
    if (userUpdated) {
      finalResponse = {
        data: userUpdated,
        'System message': 'User was successfully modified'
      }

      return finalResponse
    } else {
      throw new Error('User not found')
    }
  } else {
    throw new Error('Error updating user')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 3. DELETE USER
 * @desc      delete user by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const deleteUser = async id => {
  if (id) {
    const filter = {
      _id: id
    }

    await storage.remove(filter)

    finalResponse = {
      'System message': 'User successfully deleted'
    }

    return finalResponse
  } else {
    throw new Error('Id needed')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 4. SHOW ALL USERS
 * @desc      get all users
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const getAllUsers = async () => {
  const users = await storage.getAllUsersDb()
  finalResponse = {
    data: users,
    'System message': 'Correct users search'
  }
  return finalResponse
}

/**
 * ------------------------------------------
 * @titleDesc 5. SHOW USER BY ID
 * @desc      get user by id
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const getOneUserById = async id => {
  if (!id) {
    throw new Error('id needed')
  } else {
    const user = await storage.getOneUserByIdDb(id)
    finalResponse = {
      data: user,
      'System message': 'Correct user search'
    }
    return finalResponse
  }
}

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUserById
}
