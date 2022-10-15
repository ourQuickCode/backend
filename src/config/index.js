require('dotenv').config()

const config = {
  port: process.env.PORT,
  mongo_db: process.env.MONGO_DB,
  api_key: process.env.API_KEY,
  token_secret: process.env.TOKEN_SECRET
}

module.exports = { config }
