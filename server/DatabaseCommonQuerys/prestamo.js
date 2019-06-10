const db = require('../dbConnection')
const queryMaker = require('../testrandom')
const resultFactory = require('./resultFactory')

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
/*
 select  CONCAT(Trabajador.nombre, ' ', Trabajador.apellido) as nombre , Prestamo.fechaInicial, SUM(PagoPrestamo.montoPagado) as deudaSaldada, Prestamo.cuota, PagoPrestamo.fechaDePago
 from Prestamo
 left join PagoPrestamo on Prestamo.idPrestamo = PagoPrestamo.idPrestamo
 left join Trabajador on Prestamo.idTrabajador = Trabajador.idTrabajador
 group by Prestamo.idPrestamo;

*/
console.log(queryMaker.select('Prestamo.idPrestamo', 'CONCAT(Trabajador.nombre," ", Trabajador.apellido ) as nombre', 'Prestamo.fechaInicial', 'SUM(PagoPrestamo.montoPagado) as deudaSaldada', 'Prestamo.cuota', 'PagoPrestamo.fechaDePago')
  .from('Prestamo')
  .leftJoin('PagoPrestamo')
  .onEquals('Prestamo.idPrestamo', 'PagoPrestamo.idPrestamo')
  .leftJoin('Trabajador')
  .onEquals('Prestamo.idTrabajador', 'Trabajador.idTrabajador')
  .groupBy('Prestamo.idPrestamo')
  .make())
const getDetallesPrestamo = resultFactory(
  queryMaker.select('Prestamo.idPrestamo', 'CONCAT(Trabajador.nombre," ", Trabajador.apellido ) as nombre', 'Prestamo.fechaInicial', 'SUM(PagoPrestamo.montoPagado) as deudaSaldada', 'Prestamo.cuota', 'PagoPrestamo.fechaDePago')
    .from('Prestamo')
    .leftJoin('PagoPrestamo')
    .onEquals('Prestamo.idPrestamo', 'PagoPrestamo.idPrestamo')
    .leftJoin('Trabajador')
    .onEquals('Prestamo.idTrabajador', 'Trabajador.idTrabajador')
    .groupBy('Prestamo.idPrestamo')
    .make()
)

module.exports = {
  checkTrabajadorTienePrestamo,
  insertPrestamo,
  getDetallesPrestamo
}