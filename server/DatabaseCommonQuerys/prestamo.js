const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const checkTrabajadorTienePrestamo = async (id) => {
  try {
    const [rows] = await db.query(
      queryMaker.select('Prestamos.idTrabajador')
        .from('Prestamo')
        .equals('Prestamos.idPrestamo', id)
    )
  } catch (e) {
    throw e
  }

}