const queryMaker = require('../testrandom')
const db = require('../dbConnection')

const inserPeriodo = async (periodo) => {
  try {
    const [rows] = db.query(
      queryMaker.insert("PeriodoPago", periodo)
        .make()
    )
    return rows.insertId
  } catch (e) {
    throw e
  }
}

module.exports = {
  inserPeriodo
}