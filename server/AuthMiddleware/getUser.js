const db = require('../dbConnection')
const QueryMaker = require('../QueryMaker')
const queryMaker = new QueryMaker();

const getUser = async (user, password) => {
  const userQuery = queryMaker.select("*")
    .from("User")
    .equals("username", `"${user}"`)
    .and("password", "=", `"${password}"`)
    .make()
  const [rows] = await db.query(userQuery)
  return rows[0]
}


module.exports = getUser