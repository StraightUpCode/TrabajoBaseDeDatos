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
  console.log(leQuery)
  const [rows] = await db.query(
    leQuery
  )

  return rows
}


module.exports = {
  getTrabajador,
  getTrabajadorById,
  getTrabajadorByName
}