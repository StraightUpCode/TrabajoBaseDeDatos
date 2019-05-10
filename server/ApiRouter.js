// Inicialiacion del router
const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
router.use(bodyparser.json())
// Connection MySQL
const db = require('./dbConnection')
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

router.post("/trabajador/form", async (req, res) => {
  const body = req.body
  console.log(body)
  body.idCargo = Number.parseInt(body.idCargo)
  body.salario = Number.parseFloat(body.salario) || 0
  body.salarioPorHora = body.salarioPorHora == "true"
  body.idDiaPago = Number.parseInt(body.idDiaPago)
  delete body.submit
  const [rows] = await db.query(
    queryMaker.insert("Trabajador", body)
      .make())
  console.log(rows)
  res.redirect("/agregarTrabajador")
})

// TODO: UPDATE TRABAJADOR
// "ELIMINAR TRABAJADO"
//
// Venta

router.get("/vendedor", async (req, res) => {
  let leQuery = queryMaker.select("*")
    .from("Vendedor")
    .innerJoin("Trabajador", "Vendedor.idTrabajador", "=", "Trabajador.idTrabajador")
    .make()
  try {
    const [rows] = await db.query(leQuery)
    console.log(rows)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }

})

//Cargo

router.get("/cargo", async (req, res) => {
  try {
    const leQuery = queryMaker.select("*")
      .from("Cargo")
      .make()
    const [rows] = await db.query(leQuery)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }

})

// Dia de Pago
router.get("/diasDePago", async (req, res) => {
  try {
    const leQuery = queryMaker.select("*")
      .from("DiaDePago")
      .make()
    const [rows] = await db.query(leQuery)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }
})
module.exports = router