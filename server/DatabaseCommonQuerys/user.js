const resultFactory = require('./resultFactory')
const queryMaker = require('../testrandom')
const db = require('../dbConnection')

const insertUser = async (user) => {
  try {
    if (!(await searchUserBy({ username: user.username })).length > 0) {
      console.log(user)
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
  queryMaker.select('User.idUser', 'User.username', 'User.password', 'Rol.idRol', 'Rol.nombre')
    .from("User")
    .innerJoin("Rol")
    .onEquals('User.idRol', 'Rol.idRol')
    .make()
)
const searchUserBy = async ({ username, idRol }) => {
  let query

  if (idRol) {
    query = queryMaker.select('User.username', 'User.password', 'Rol.nombre')
      .from("User")
      .innerJoin("Rol")
      .onEquals('User.idRol', 'Rol.idRol')
      .equals("Rol.idRol", `"${idRol}"`)
      .make()
  }
  if (username) query = queryMaker.select('User.username', 'User.password', 'Rol.nombre')
    .from("User")
    .innerJoin("Rol")
    .onEquals("User.idRol", "Rol.idRol")
    .equals("User.username", `"${username}"`)
    .make()

  const [rows] = await db.query(query)
  return rows

}

const resetPassword = async (id) => {
  try {
    const [rows] = await db.query(
      queryMaker.update('User', { password: 12345678 }, 'idUser', id)
        .make()
    )
    return rows
  } catch (e) {
    throw e
  }

}
const getUser = async (id) => {
  try {
    const [rows] = await db.query(
      queryMaker.select('*')
        .from('User')
        .equals('User.idUser', id)
        .make()
    )
    return rows[0]
  } catch (e) {
    throw e
  }
}
const updateUser = async (user, id) => {
  try {
    console.log("Update User")
    console.log(user)
    const leQuery = queryMaker.update('User', user, 'idUser', id)
      .make()
    console.log(leQuery)
    const [rows] = await db.query(
      leQuery
    )
    console.log(rows)
    return rows
  } catch (e) {
    console.log(e)
    throw e
  }

}

module.exports = {
  insertUser,
  getUsers,
  searchUserBy,
  resetPassword,
  getUser,
  updateUser

}
