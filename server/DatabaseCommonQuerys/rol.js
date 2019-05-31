const resultFactory = require('./resultFactory')
const queryMaker = require('../testrandom')
const getRoles = resultFactory(
  queryMaker.select('*')
    .from('Rol')
    .make()
)

module.exports = {
  getRoles
}