const db = require('../dbConnection')

const resultFactory = (stringQuery) =>
  async () => {
    const [rows] = await db.query(stringQuery)
    console.log(rows)
    return rows
  }

module.exports = resultFactory