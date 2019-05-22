const session = require('express-session')
const sessionStore = require('./sessionStore')
module.exports = session({
  secret: 'TamalPisque',
  store: sessionStore,
  resave: false,
  cookie: { maxAge: 99999999999999999 },
  saveUninitialized: false
})