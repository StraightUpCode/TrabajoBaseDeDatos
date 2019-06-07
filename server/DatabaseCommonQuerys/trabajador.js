const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getTrabajador = async () => {
  const [rows] = await db.query(
    queryMaker.select('Trabajador.idTrabajador', 'Trabajador.nombre', 'Trabajador.apellido', 'Trabajador.idCargo', 'Trabajador.cedula', 'Trabajador.salario', 'Trabajador.salarioPorHora', 'Trabajador.fechaDeContratacion', 'Trabajador.idDiaPago', 'Trabajador.idFrecuenciaDePago', 'Vendedor.porcentajeComision')
      .from('Trabajador')
      .leftJoin('Vendedor')
      .onEquals('Trabajador.idTrabajador', 'Vendedor.idTrabajador')
      .not('Trabajador.BorradoLogico', '1')
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
    .not('Trabajador.BorradoLogico', '1')
    .make()
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
    .not('Trabajador.BorradoLogico', '1')
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
    .not('Trabajador.BorradoLogico', '1')
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
      .not('Trabajador.BorradoLogico', '1')
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