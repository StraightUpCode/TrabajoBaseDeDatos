const queryMaker = require('../testrandom')
const db = require('../dbConnection')

const inserPeriodo = async (periodo) => {
  try {
    const [rows] = await db.query(
      queryMaker.insert("PeriodoPago", periodo)
        .make()
    )
    console.log(rows.insertId)
    return rows.insertId
  } catch (e) {
    throw e
  }
}

module.exports = {
  inserPeriodo
}