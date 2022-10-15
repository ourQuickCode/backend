const { Strategy } = require('passport-local')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const userService = require('./../../../components/user/user.service')

const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await userService.getOneByFilterUser({ email })
      if (user.length <= 0) {
        done(boom.unauthorized(), false)
      }
      const isMatch = bcrypt.compareSync(password, user[0].password)
      if (!isMatch) {
        done(boom.unauthorized(), false)
      }
      done(null, user[0])
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = localStrategy
