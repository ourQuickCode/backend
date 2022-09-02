/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) USER
    2.2 [PUT] ( UPDATE ) USER
    3.3 [DELETE] ( DELETE ) USER
    4.4 [GET] ( SHOW ) ALL USERS
    5.5 [GET] ( SHOW ) USER BY ID

  - MODULE EXPORTS

*/

const storage = require('./user.service')
const bcrypt = require('bcrypt')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

const createUser = async (fullname, email, password) => {
  if (!fullname || !email || !password) {
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

//------------------------------------------------------------------------------------------------
//2.2 ( UPDATE ) USER
//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//3.3 ( DELETE ) USER
//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//4.4 ( SHOW ) ALL USERS
//------------------------------------------------------------------------------------------------

const getAllUsers = async () => {
  const users = await storage.getAllUsersDb()
  finalResponse = {
    data: users,
    'System message': 'Correct users search'
  }
  return finalResponse
}

//------------------------------------------------------------------------------------------------
//5.5 ( SHOW ) USER BY ID
//------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUserById
}
