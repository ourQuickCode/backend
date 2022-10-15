const jwt = require('jsonwebtoken')
const { config } = require('../../config')

const createAccessToken = (id, role, fullname, email) => {
  const accessToken = jwt.sign(
    { id, role, fullname, email },
    `${config.token_secret}`,
    {
      expiresIn: '24h'
    }
  )

  return accessToken
}

module.exports = {
  createAccessToken
}
