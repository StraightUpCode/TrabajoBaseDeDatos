const session = require('express-session')
const sessionStore = require('./sessionStore')
module.exports = session({
  key: 'cookie_key',
  secret: 'TamalPisque',
  store: sessionStore,
  resave: false,
  cookie: { maxAge: 100000 },
  saveUninitialized: false
})