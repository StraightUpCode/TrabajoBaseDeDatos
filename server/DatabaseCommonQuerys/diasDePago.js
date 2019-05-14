const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const getDiasDePago = async () => {
  const [rows] = await db.query(
    queryMaker.select("*")
      .from("DiaDePago")
      .make()
  )
  return rows
}

module.exports = getDiasDePago