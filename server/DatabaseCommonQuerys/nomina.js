const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const createNomina = async (Nomina) => {
  console.log("Insertando Nomina")
  console.log(Nomina)
  const [rows] = await db.query(
    queryMaker.insert("Nomina", Nomina)
      .make()
  )
  return rows.insertId
}


module.exports = {
  createNomina
}