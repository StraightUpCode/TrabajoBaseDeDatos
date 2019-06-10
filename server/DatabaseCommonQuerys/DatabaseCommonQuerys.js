const cargo = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')
const getFrecuenciaDePago = require('./frecuenciaDePago')
const user = require('./user')
const rol = require('./rol')
const periodo = require('./periodo')
const nomina = require('./nomina')
const prestamo = require('./prestamo')
const horario = require('./horario')
module.exports = {
  ...cargo,
  getDiasPago,
  ...querysTrabajador,
  getFrecuenciaDePago,
  ...user,
  ...rol,
  ...periodo,
  ...nomina,
  ...prestamo,
  ...horario
}
