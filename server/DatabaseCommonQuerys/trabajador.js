const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getTrabajador = async () => {
  const [rows] = await db.query(
    queryMaker.select('Trabajador.idTrabajador', 'Trabajador.nombre', 'Trabajador.apellido', 'Trabajador.idCargo', 'Trabajador.cedula', 'Trabajador.salario', 'Trabajador.salarioPorHora', 'Trabajador.fechaDeContratacion', 'Trabajador.idDiaPago', 'Trabajador.idFrecuenciaDePago', 'Vendedor.porcentajeComision')
      .from('Trabajador')
      .leftJoin('Vendedor')
      .onEquals('Trabajador.idTrabajador', 'Vendedor.idTrabajador')
      .andNotEquals('Trabajador.BorradoLogico', '1')
      .make()
  )

  return rows

}

const getTrabajadorById = async (id) => {
  const queryString = queryMaker.select('Trabajador.idTrabajador', 'Trabajador.nombre', 'Trabajador.apellido', 'Trabajador.idCargo', 'Trabajador.cedula', 'Trabajador.salario', 'Trabajador.salarioPorHora', 'Trabajador.fechaDeContratacion', 'Trabajador.idDiaPago', 'Trabajador.idFrecuenciaDePago', 'Vendedor.porcentajeComision')
    .from('Trabajador')
    .leftJoin('Vendedor')
    .onEquals('Trabajador.idTrabajador', 'Vendedor.idTrabajador')
    .equals('Trabajador.idTrabajador', id)
    .andNotEquals('Trabajador.BorradoLogico', '1')
    .make()
  console.log(queryString)
  const [rows] = await db.query(
    queryString
  )
  console.log(queryString)
  console.log(rows)
  return rows
}

const getTrabajadorByName = async (name) => {
  const leQuery = queryMaker.select('Trabajador.idTrabajador', 'Trabajador.nombre', 'Trabajador.apellido', 'Trabajador.idCargo', 'Trabajador.cedula', 'Trabajador.salario', 'Trabajador.salarioPorHora', 'Trabajador.fechaDeContratacion', 'Trabajador.idDiaPago', 'Trabajador.idFrecuenciaDePago', 'Vendedor.porcentajeComision')
    .from('Trabajador')
    .leftJoin('Vendedor')
    .onEquals('Trabajador.idTrabajador', 'Vendedor.idTrabajador')
    .where('nombre')
    .includes(name)
    .andNotEquals('Trabajador.BorradoLogico', '1')
    .make()
  const [rows] = await db.query(
    leQuery
  )

  return rows
}
const getTrabajadorByPeriodoYFrecuenciaDePago = async ({ frecuenciaDePago, inicio, fin }) => {

  try {
    if (inicio == fin) fin = 30
    const leQuery = queryMaker.select("Trabajador.idTrabajador", "Trabajador.nombre", "Trabajador.apellido", "Cargo.nombre as cargo", "DiaDePago.diaPago", "FrecuenciaDePago.nombre as frecuenciaDePago", "Trabajador.salario", "Trabajador.salarioPorHora", "Vendedor.porcentajeComision")
      .from("Trabajador")
      .leftJoin("Vendedor")
      .onEquals("Trabajador.idTrabajador", "Vendedor.idTrabajador")
      .innerJoin("Cargo")
      .onEquals("Trabajador.idCargo", "Cargo.idCargo")
      .innerJoin("DiaDePago")
      .onEquals("Trabajador.idDiaPago", "DiaDePago.idDiaDePago")
      .innerJoin("FrecuenciaDePago")
      .onEquals("Trabajador.idFrecuenciaDePago", "FrecuenciaDePago.idFrecuenciaDePago")
      .where("DiaDePago.diaPago")
      .between(inicio, fin)
      .andEquals("FrecuenciaDePago.nombre", `"${frecuenciaDePago}"`)
      .andNotEquals('Trabajador.BorradoLogico', '1')
      .make()
    console.log(leQuery)
    const [rows] = await db.query(
      leQuery
    )
    console.log(rows)
    return rows
  } catch (e) {
    console.log(e)
  }
}

getTrabajadorHorario = async id => {
  const [rows] = await db.query(
    queryMaker.select('Horario.horaEntrada', 'Horario.horaSalida')
      .from('Trabajador')
      .innerJoin('Trabajador_Horario')
      .onEquals('Trabajador.idTrabajador', 'Trabajador_Horario.idTrabajador')
      .innerJoin('Horario')
      .onEquals('Trabajador_Horario.idHorario', 'Horario.idHorario')
      .equals('Trabajador.idTrabajador', id)
      .andNotEquals('Trabajador.BorradoLogico', 1)
      .make()
  )
  return rows
}
const updateTrabajador = async (objeto, id) => {
  try {
    console.log("Update")
    if (!objeto.porcentajeComision) {
      console.log("Trabajador")
      console.log(objeto, id)
      let bodyQuery = queryMaker.update('Trabajador', objeto, 'idTrabajador', id).make()

      const [rows] = await db.query(
        bodyQuery
      )
      console.log(bodyQuery)
      return rows
    } else {
      console.log("Vendedor")
      const [rows] = await db.query(
        queryMaker.update('Vendedor', objeto, 'idTrabajador', id)
          .make()
      )
      return rows
    }

  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  getTrabajador,
  getTrabajadorById,
  getTrabajadorByName,
  getTrabajadorByPeriodoYFrecuenciaDePago,
  getTrabajadorHorario,
  updateTrabajador
}