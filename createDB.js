const mysql = require("mysql2")
const fs = require('fs')
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1102',
  port: 3306,
  multipleStatements: true
})
const db_name = ""
// Script para crear base de datos
db.query(fs.readFileSync('./dbscript.sql', 'utf-8'), (err, results, field) => {
  console.log(err)
  console.log(results)
})

