const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getCargos = async () => {
  try {

    const [rows] = await db.query(
      queryMaker.select('*')
        .from('Cargo')
        .make()
    )

    return rows
  } catch (e) {
    console.log(e)
  }
}

const insertCargo = async (cargo) => {
  try {
    const [rows] = await db.query(
      queryMaker.insert('Cargo', cargo)
        .make()
    )
    return rows.insertId
  } catch (e) {
    throw e
  }
}

module.exports = {
  getCargos,
  insertCargo
}
