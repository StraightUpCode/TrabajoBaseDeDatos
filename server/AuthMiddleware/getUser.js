const db = require('../dbConnection')
const QueryMaker = require('../QueryMaker')
const queryMaker = new QueryMaker();

const getUser = async (user, password) => {
  const userQuery = queryMaker.select("User.username", "User.password", "Rol.nombre AS rol")
    .from("User")
    .innerJoin("Rol")
    .onEquals("User.idRol", "Rol.idRol")
    .equals("username", `"${user}"`)
    .andEquals("password", `"${password}"`)
    .make()
  const [rows] = await db.query(userQuery)
  return rows[0]

}


module.exports = getUser