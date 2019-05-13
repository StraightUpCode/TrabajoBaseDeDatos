const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getCargos = async () => {
  const [rows] = await db.query(
    queryMaker.select('*')
      .from('Cargo')
      .make()
  )
  return rows
}


module.exports = getCargos
