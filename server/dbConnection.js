const mysql = require("mysql2/promise")
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '37292636',
  database: 'SISTEMA_NOMINA'
})

module.exports = db