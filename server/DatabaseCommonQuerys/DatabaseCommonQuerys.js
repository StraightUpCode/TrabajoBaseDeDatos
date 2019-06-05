const getCargos = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')
const getFrecuenciaDePago = require('./frecuenciaDePago')
const user = require('./user')
const rol = require('./rol')
const periodo = require('./periodo')
const nomina = require('./nomina')
const prestamo = require('./prestamo')
module.exports = {
  getCargos,
  getDiasPago,
  ...querysTrabajador,
  getFrecuenciaDePago,
  ...user,
  ...rol,
  ...periodo,
  ...nomina,
  ...prestamo
}
