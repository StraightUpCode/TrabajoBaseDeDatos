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
const getTrabajadorByPeriodo = async (inicio, fin) => {
  const [rows] = await db.query(
    queryMaker.select("*")
      .from("Trabajador")
      .innerJoin("DiaDePago")
      .onEquals("Trabajador.idDiaDePago", "DiaDePago.idDiaDePago")
      .where("DiaDePago.diaDePago")
      .between(inicio, fin)
      .make()
  )

  return rows
}

module.exports = {
  getTrabajador,
  getTrabajadorById,
  getTrabajadorByName,
  getTrabajadorByPeriodo
}