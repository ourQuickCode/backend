const passport = require('passport')

const localStrategy = require('./strategies/passport.local.strategy')
const jwtStrategy = require('./strategies/passport.jwt.strategy')

passport.use(localStrategy)
passport.use(jwtStrategy)
