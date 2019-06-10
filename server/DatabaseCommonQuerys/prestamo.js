const db = require('../dbConnection')
const queryMaker = require('../testrandom')


const insertPrestamo = async (prestamo) => {
  try {
    const [rows] = db.query(
      queryMaker.insert('Prestamo', prestamo)
        .make()
    )
    return rows.insertId
  } catch (e) {
    throw e
  }
}

const checkTrabajadorTienePrestamo = async (id) => {
  try {
    const [rows] = await db.query(
      queryMaker.select('Prestamos.idTrabajador')
        .from('Prestamo')
        .equals('Prestamos.idPrestamo', id)
        .make()
    )

    return rows
  } catch (e) {
    throw e
  }

}

module.exports = {
  checkTrabajadorTienePrestamo,
  insertPrestamo
}