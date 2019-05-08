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
const QueryMaker = require("./QueryMaker")
const queryMaker = new QueryMaker()

router.get("/", (req, res) => res.send('Bienvenido al API , Documentacion en Construccion'))
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


//Cargo

router.get("/cargo", async (req, res) => {
  try {
    const leQuery = queryMaker.select("*")
      .from("Cargo")
      .make()
    console.log(leQuery)
    const [rows] = await db.query(leQuery)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }

})

module.exports = router