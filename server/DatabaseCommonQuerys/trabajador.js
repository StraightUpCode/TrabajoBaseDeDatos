const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getTrabajador = async () => {
  const [rows] = await db.query(
    queryMaker.select('*')
      .from('Trabajador')
      .make()
  )

  return rows

}

const getTrabajadorById = async (id) => {
  const [rows] = await db.query(
    queryMaker.select('*')
      .from('Trabajador')
      .equals('idTrabajador', id)
      .make()
  )

  return rows
}

const getTrabajadorByName = async (name) => {
  const leQuery = queryMaker.select('*')
    .from('Trabajador')
    .where('nombre')
    .includes(name)
    .make()
  const [rows] = await db.query(
    leQuery
  )

  return rows
}
const getTrabajadorByPeriodoYFrecuenciaDePago = async ({ frecuenciaDePago, inicio, fin }) => {
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
    .make()
  console.log(leQuery)
  const [rows] = await db.query(
    leQuery
  )
  console.log(rows)
  return rows
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
      .make()
  )
  return rows
}

module.exports = {
  getTrabajador,
  getTrabajadorById,
  getTrabajadorByName,
  getTrabajadorByPeriodoYFrecuenciaDePago,
  getTrabajadorHorario
}