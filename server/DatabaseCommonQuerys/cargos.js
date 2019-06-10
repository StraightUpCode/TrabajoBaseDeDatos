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


module.exports = getCargos
