const db = require('../dbConnection')
const queryMaker = require('../testrandom')
const resultFactory = require('./resultFactory')

const getHorarios = resultFactory(
  queryMaker.select('*')
    .from('Horario')
    .make()
)

const asignarHorario = async (Trabajador_Horario) => {
  try {
    console.log(Trabajador_Horario)
    const [row] = await db.query(
      queryMaker.insert('Trabajador_Horario', Trabajador_Horario)
        .make()
    )
    console.log(row)
    return row.insertId
  } catch (e) {
    console.log(e)
    throw e
  }
}
module.exports = {
  getHorarios,
  asignarHorario
}