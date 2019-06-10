const resultFactory = require('./resultFactory')
const queryMaker = require('../testrandom')
const db = require('../dbConnection')

const insertUser = async (user) => {
  console.log(user)
  try {
    if (!(await searchUserBy({ username: user.username })).length > 0) {
      const [rows] = await db.query(
        queryMaker.insert("User", user)
          .make()
      )
      return rows
    } else {
      throw new Error("Ya existe un usuario con ese Username")
    }
  } catch (e) {
    throw e
  }

}

const getUsers = resultFactory(
  queryMaker.select('User.username', 'User.password', 'Rol.nombre')
    .from("User")
    .innerJoin("Rol")
    .onEquals('User.idRol', 'Rol.idRol')
    .make()
)
const searchUserBy = async ({ username, idRol }) => {
  const query = queryMaker.select('User.username', 'User.password', 'Rol.nombre')
    .from("User")
    .innerJoin("Rol")
    .onEquals('User.idRol', 'Rol.idRol')

  if (idRol) query.equals("Rol.idRol", `"${idRol}"`)
  if (username) query.equals("User.username", `"${username}"`)
  const [rows] = await db.query(query.make())
  return rows

}

module.exports = {
  insertUser,
  getUsers,
  searchUserBy

}
