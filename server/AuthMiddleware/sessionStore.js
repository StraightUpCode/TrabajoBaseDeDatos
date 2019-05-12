const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session)
const db = require('../dbConnection')

module.exports = new MySQLStore({
  clearExpired: true,
  createDatabaseTable: true,
  checkExpirationInterval: 10000,
}, db)