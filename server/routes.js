// Inicialiacion del router
const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
router.use(bodyparser.json())
// Mysql
const mysql = require("mysql2/promise")
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '37292636',
  database: 'SISTEMA_NOMINA'
})
// QueryMaker
const QueryMaker = require("./helper")
const queryMaker = new QueryMaker()

router.get("/", (req, res) => res.send('Hellou Warudo'))
// Trabajadores
router.get("/trabajador", async (req, res) => {
  const [rows] = await db.query("Select * from Trabajador")
  res.send(rows)
})
router.get("/trabajador/:id", async (req, res) => {

  try {
    const id = req.params.id

    const [rows] = await db.query(queryMaker.select("*")
      .from("Trabajador")
      .equals("idTrabajador", id).make())

    // Es igual a 
    /*const [rows] = await db.query(`Select * from Trabajador where idTrabajador = ${id}`)*/
    res.send(rows)

  } catch (e) {
    console.log(e)
  }
})

router.post("/trabajador", async (req, res) => {
  const content = req.body
  try {
    const [rows] = await db.query(
      queryMaker.insert("Trabajador", content)
        .make())
    res.send("Todo OK, todo Correcto")
  }
  catch (e) {
    res.send(e)
  }

})

// TODO: UPDATE TRABAJADOR
// "ELIMINAR TRABAJADO"
//
module.exports = router