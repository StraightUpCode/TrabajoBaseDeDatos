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

const commonQuerys = require('./DatabaseCommonQuerys/DatabaseCommonQuerys')

//Router
router.get("/", (req, res) => res.send('Bienvenido al API , Documentacion en Construccion'))


// Trabajadores
router.get("/trabajador", async (req, res) => {
  if (req.query.name) {
    res.send(await commonQuerys.getTrabajadorByName(req.query.name))
  }
  if (req.query.horario == 'true') {
    console.log("Query con Horario")
    const [rows] = await db.query(
      queryMaker.select('Trabajador.idTrabajador', 'Trabajador.nombre', 'Trabajador.apellido', 'Horario.horaEntrada', 'Horario.horaSalida')
        .from('Trabajador')
        .leftJoin('Trabajador_Horario')
        .onEquals('Trabajador.idTrabajador', 'Trabajador_Horario.idTrabajador')
        .leftJoin('Horario')
        .onEquals('Horario.idHorario', 'Trabajador_Horario.idHorario')
        .not('Trabajador.BorradoLogico', '1')
        .make()
    )

    // TODO Convertir a FUncion propia
    const data = []
    let prev
    for (const row of rows) {
      console.log(row)
      let curr = {}
      const { idTrabajador, nombre, apellido, horaEntrada, horaSalida } = row
      const horario = [{ horaEntrada, horaSalida }]
      curr = { idTrabajador, nombre, apellido, horario }
      if (prev && prev.idTrabajador == curr.idTrabajador) {
        const { horario } = prev
        prev.horario = [...horario, ...curr.horario]
      } else {
        console.log(`Current :`)
        console.log(curr)
        data.push(curr)
      }
      prev = curr

    }
    console.log(...data)
    res.send(data)
  }
  if (Object.keys(req.query) == 0) {
    const [rows] = await db.query("Select * from Trabajador where not BorradoLogico= true")
    res.send(rows)
  }
})

router.post("/trabajador/:id/asignarHorario", async (req, res) => {
  try {
    const idTrabajador_Horario = await commonQuerys.asignarHorario(req.body)
    if (idTrabajador_Horario) res.send(await commonQuerys.getTrabajadorHorario(req.body.idTrabajador))

  } catch (e) {
    res.send(e)
  }

})
router.post("/trabajador/update", async (req, res) => {
  try {
    console.log("Update")
    const { changedValues, idTrabajador } = req.body
    const rows = await commonQuerys.updateTrabajador(changedValues, idTrabajador)

    res.send({ idTrabajador: rows })

  } catch (e) {
    res.send(e)
  }

})


router.get("/trabajador/:id/delete", async (req, res) => {
  try {
    console.log(req.params.id)
    db.query(`update Trabajador set BorradoLogico = true where idTrabajador=${req.params.id}`);
    res.send({ idBorrado: req.params.id })
  }
  catch (e) {
    res.send(e);
  }
})
router.get("/trabajador/:id", async (req, res) => {

  try {
    console.log("Con Id")
    const id = req.params.id


    // Es igual a 
    /*const [rows] = await db.query(`Select * from Trabajador where idTrabajador = ${id}`)*/

    if (req.query.nomina) {
      res.send(await commonQuerys.getTrabajadorHorario(id))

    } else {
      const [rows] = await commonQuerys.getTrabajadorById(id)
      res.send(rows)

    }


  } catch (e) {
    console.log(e)
  }
})



router.post("/trabajador", async (req, res) => {
  const content = req.body
  console.log("Trabajador")
  try {
    console.log("Insertando")
    const { porcentajeComision, ...trabajador } = content
    console.log("Porcentaje Comision", porcentajeComision)
    console.log("Trabajador")
    console.log(trabajador)
    trabajador.BorradoLogico = 0
    const [rows] = await db.query(
      queryMaker.insert("Trabajador", trabajador)
        .make())
    console.log(rows.insertId)
    if (porcentajeComision) await commonQuerys.insertVendedor({ idTrabajador: rows.insertId, porcentajeComision })
    res.send({ result: "Todo Ok Todo Correcto" })
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
    .innerJoin("Trabajador")
    .onEquals("Trabajador.idTrabajador", "Vendedor.idTrabajador")
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

    res.send(await commonQuerys.getCargos())
  } catch (e) {
    res.send(e)
  }

})
router.post("/cargo/add", async (req, res) => {
  try {
    res.send({ idCargo: await commonQuerys.insertCargo(req.body) })
  } catch (e) {
    res.send(e)
  }
})

// Dia de Pago
router.get("/diasDePago", async (req, res) => {
  try {

    res.send(await commonQuerys.getDiasPago())
  } catch (e) {
    res.send(e)
  }
})


//Frecuencia de Pago

router.get("/frecuenciaDePago", async (req, res) => {

  try {
    console.log("Hello")
    const result = await commonQuerys.getFrecuenciaDePago()
    console.log("Despues del query")
    res.send(result)
  } catch (e) {
    res.send(e)
  }
})

// User
router.post("/user/create", async (req, res) => {

  try {
    console.log("User Create")
    const infoUser = req.body
    res.send(await commonQuerys.insertUser(infoUser))
  } catch (e) {
    res.send(e)
  }
})

router.get("/user/reset/:id", async (req, res) => {
  try {
    const rows = await commonQuerys.resetPassword(req.params.id)
    console.log(rows)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }
})
router.post("/user/update/:id", async (req, res) => {
  try {
    console.log(req.params)
    console.log("Actualizando usuario")
    const rows = await commonQuerys.updateUser(req.body, req.params.id)
    res.send(rows)
  } catch (e) {
    res.send(e)
  }
})

router.get("/user/:id", async (req, res) => {
  try {
    res.send(await commonQuerys.getUser(req.params.id))
  } catch (e) {
    res.send(e)
  }
})

// Periodo de Pago
router.post("/periodoPago/create", async (req, res) => {
  const periodo = req.body
  try {
    console.log(periodo)
    const id = await commonQuerys.inserPeriodo(periodo)
    console.log(id)
    res.send({ idPeriodoPago: id })
  } catch (e) {
    res.send(e)
  }
})

// Proceso Nomina
router.post("/crearNomina/trabajadores", async (req, res) => {
  try {
    console.log("Nomina")
    console.log(req.body)
    res.send(await commonQuerys.getTrabajadorByPeriodoYFrecuenciaDePago(req.body))
  }
  catch (e) {
    console.log(e)
  }
})

router.post("/nomina/create", async (req, res) => {
  try {
    console.log("Ruta Nomina Crear")
    res.send({ idNomina: await commonQuerys.createNomina(req.body) })
  } catch (e) {
    console.log(e)
  }
})

router.post("/nomina/ingresosNoFijos", async (req, res) => {
  try {
    const idIngresoNoFijo = await commonQuerys.crearIngresoNoFijo(req.body)
    console.log(idIngresoNoFijo)
    res.send({ idIngresoNoFijo })
  } catch (e) {
    res.send(e)
  }

})
router.post("/nomina/ingresosNoFijos/vendedor", async (req, res) => {
  try {
    res.send({ idIngresosNoFijoVendedor: await commonQuerys.crearIngresoNoFijoVendedor(req.body) })
  } catch (e) {
    res.send(e)
  }
})

router.post("/nomina/deduccion", async (req, res) => {
  try {
    console.log(req.body)
    res.send({ idDeduccion: await commonQuerys.crearDeduccion(req.body) })
  } catch (e) {
    res.send(e)
  }
})

router.post("/nomina/deduccionNoFija", async (req, res) => {
  try {
    console.log(req.body)
    res.send({ idDeduccionNoFija: await commonQuerys.crearDeduccionNoFija(req.body) })
  } catch (e) {
    res.send(e)
  }

})

router.post("/prestamo/trabajador/:id", async (req, res) => {
  try {
    const id = req.params.id
    res.send(await commonQuerys.checkTrabajadorTienePrestamo(id))
  } catch (e) {
    res.send(e)
  }
})

router.get("/horarios", async (req, res) => {
  const result = await commonQuerys.getHorarios()
  console.log(result)
  res.send(result)
})

router.get("/rol", async (req, res) => {
  try {
    res.send(await commonQuerys.getRoles())
  } catch (e) {
    res.send(e)
  }
})

router.post("/prestamo/crear", async (req, res) => {
  try {
    const prestamo = req.body
    prestamo.cancelado = false
    res.send({ idPrestamo: await commonQuerys.insertPrestamo(prestamo) })
  } catch (e) {
    res.send(e)
  }
})
router.get('/prestamo/getDetalles', async (req, res) => {
  try {
    res.send(await commonQuerys.getDetallesPrestamo())
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

module.exports = router