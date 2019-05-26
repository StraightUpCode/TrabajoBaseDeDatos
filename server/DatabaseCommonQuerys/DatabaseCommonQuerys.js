const getCargos = require('./cargos')
const getDiasPago = require('./diasDePago')
const querysTrabajador = require('./trabajador')
const getFrecuenciaDePago = require('./frecuenciaDePago')

module.exports = {
  getCargos,
  getDiasPago,
  ...querysTrabajador,
  getFrecuenciaDePago
<<<<<<< HEAD
}
=======
}
>>>>>>> adc90e940ec9b7a85995a32288798156fe1d6e2f
