const db = require('../dbConnection')

const resultFactory = (stringQuery) =>
  async () => {
    const [rows] = await db.query(stringQuery)
    return rows
  }

module.exports = resultFactory