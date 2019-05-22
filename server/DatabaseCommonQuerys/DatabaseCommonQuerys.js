const getCargos = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')

module.exports = {
  getCargos,
  getDiasPago,
  ...querysTrabajador
} ha fuck