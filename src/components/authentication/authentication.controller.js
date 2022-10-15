/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CONTROLLER INDEX

    1. LOGIN USER
    2. SEND RECOVERY MAIL
    3. NEW USER PASSWORD

  - MODULE EXPORTS

*/

const service = require('./authentication.services')
const { createAccessToken } = require('./../../utils/jwt/createJsonWebToken')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { config } = require('./../../config')
const bcrypt = require('bcrypt')
const chalk = require('chalk')

/**
 * ------------------------------------------
 * @titleDesc 1. LOGIN USER
 * @desc      login user
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const generateToken = async user => {
  const { id, role, fullname, email } = user

  const filterUser = await service.getOneByFilter(id)
  const accessToken = createAccessToken(id, role, fullname, email)

  const newObjectUser = {
    id: filterUser.id,
    role: filterUser.role,
    fullname: filterUser.fullname,
    email: filterUser.email,
    date: filterUser.date,
    accessToken: accessToken
  }

  const finalResponse = {
    message: 'Auth success',
    user: newObjectUser
  }

  return finalResponse
}

/**
 * ------------------------------------------
 * @titleDesc 2. SEND RECOVERY MAIL
 * @desc      send recovery mail
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const recoverPassword = async email => {
  if (!email) {
    throw new Error('An email is required')
  }

  const emailExists = await service.getOneByFilter({ email })

  if (emailExists.length >= 1) {
    try {
      const user = emailExists
      const recoverPasswordToken = jwt.sign(
        {
          user: user[0].id,
          role: user[0].role,
          fullname: user[0].fullname,
          email: user[0].email
        },
        `${config.token_secret}`,
        {
          expiresIn: '15m'
        }
      )

      const verificationLink = `www.orlandoce.com/recovery?token=${recoverPasswordToken}`

      const filter = {
        _id: user[0].id
      }

      const userRefresh = {
        resetToken: recoverPasswordToken
      }

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'orlandos.casta@gmail.com', // generated ethereal user
          pass: 'jaudqkegahnoqpae' // generated ethereal password
        }
      })

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Orlando Castañeda" <orlandos.casta@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Recuperar contraseña', // Subject line
        //text: "Hello world?", // plain text body
        html: `
  
      <span> Hola:</span>
  
      <p>Recibimos una solicitud para restablecer tu contraseña de <strong>www.orlandoce.com</strong>.
      Ingresa al siguiente link para restablecer la contraseña:</p>
  
      <a href="${verificationLink}"> ${verificationLink}</a>
      `
      })

      const finalResponse = {
        Message: `Password recovery link sent correctly to the email ${user[0].email}`,
        Link: verificationLink
      }

      const userUpdate = await service.update(filter, userRefresh)
      if (userUpdate) {
        return finalResponse
      } else {
        throw new Error('Update not done, user not found')
      }
    } catch (error) {
      throw new Error('Something goes wrong')
    }
  } else {
    throw new Error('No search results')
  }
}

/**
 * ------------------------------------------
 * @titleDesc 3. NEW USER PASSWORD
 * @desc      new user password
 * @params    {object} req - request object
 * @params    {object} res - response object
 * ------------------------------------------
 */

const createNewPassword = async (password, recoverPasswordToken) => {
  try {
    if (!password || !recoverPasswordToken) {
      throw new Error('Missing data')
    }

    const recoverPasswordTokenData = jwt.verify(
      recoverPasswordToken,
      config.token_secret
    )

    const userId = recoverPasswordTokenData.user
    const userlData = await service.getOneByFilter({ _id: userId })
    const newPassword = await bcrypt.hash(password, 10)

    const filter = {
      _id: userlData[0].id
    }

    const userRefresh = {
      password: newPassword,
      resetToken: ''
    }

    const userUpdate = await service.update(filter, userRefresh)
    if (userUpdate) {
      return 'Password changed successfully'
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * ------------------------------------------
 * MODULE EXPORTS
 * ------------------------------------------
 */

module.exports = {
  generateToken,
  recoverPassword,
  createNewPassword
}
