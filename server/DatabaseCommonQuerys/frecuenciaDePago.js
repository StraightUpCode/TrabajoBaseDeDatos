
const queryMaker = require('../testrandom')
const resultFactory = require('./resultFactory')

const getFrecuenciaDePago = resultFactory(
  queryMaker.select('*')
    .from('FrecuenciaDePago')
    .make()
)

console.log(getFrecuenciaDePago())
module.exports = getFrecuenciaDePago