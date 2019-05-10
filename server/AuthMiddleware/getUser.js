const db = require('../dbConnection')
const QueryMaker = require('../QueryMaker')
const queryMaker = new QueryMaker();

const getUser = (user, password) => {
  const [rows] = await db.query(queryMaker.select("*")
    .from("Users")
    .equals("username", `"${user}"`)
    .and("password", "=", `"${password}"`)
    .make())

  return rows

}


module.exports = getUser