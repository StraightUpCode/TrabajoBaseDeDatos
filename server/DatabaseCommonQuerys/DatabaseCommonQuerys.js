const getCargos = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')
const getFrecuenciaDePago = require('./frecuenciaDePago')

module.exports = {
  getCargos,
  getDiasPago,
  ...querysTrabajador,
  getFrecuenciaDePago
}
