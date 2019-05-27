const getCargos = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')
const getFrecuenciaDePago = require('./frecuenciaDePago')
const user = require('./user')
module.exports = {
  getCargos,
  getDiasPago,
  ...querysTrabajador,
  getFrecuenciaDePago,
  ...user
}
