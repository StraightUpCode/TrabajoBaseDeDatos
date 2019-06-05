const db = require('../dbConnection')
const queryMaker = require('../testrandom')

const createNomina = async (Nomina) => {
  console.log("Insertando Nomina")
  console.log(Nomina)
  const [rows] = await db.query(
    queryMaker.insert("Nomina", Nomina)
      .make()
  )
  return rows.insertId
}

const crearIngresoNoFijo = async (IngresosNoFijos) => {
  console.log(IngresosNoFijos)
  try {
    const [rows] = await db.query(
      queryMaker.insert("IngresoNoFijo", IngresosNoFijos)
        .make()
    )
    console.log(rows.insertId)
    return rows.insertId
  } catch (e) {
    throw e
  }
}

const crearIngresoNoFijoVendedor = async (IngresosNoFijoVendedor) => {
  try {
    const [rows] = await db.query(queryMaker.insert("IngresoNoFijoVendedor", IngresosNoFijoVendedor)
      .make())
    return rows.insertId
  } catch (e) {
    throw e
  }
}
const getDatosTrabajador = async () => {
  console.log()
  try {
    const [rows] = await db.query(
      queryMaker.select("Trabajador.nombre", "Trabajador.apellidos",
      "Trabajador.cedula", "Cargo.nombre AS cargo", "Trabajador.salario" ,
      "Vendedor.porcentajeComision","Horas_Trabajador.horasExtras", 
      "IngresoNoFijo.viatico","IngresoNoFijo.incentivo","pagoHorasExtras",
      "(IngresoNoFijo.Viatico+IngresoNoFijo.incentivo+pagoHorasExtras) as totalIngresos",
      "Deduccion.IR","Deduccion.inss","(Deduccion.IR + Deduccion.inss) as totalDeducciones",
      "(Trabajador.salario+totalIngresos-totalDeducciones) as totalSalario").from( "Trabajador")
      .innerJoin("Cargo").onEquals(" Trabajador.idCargo", "Cargo.idCargo")
      .leftJoin(" Vendedor").onEquals("Trabajador.idTrabajador"," Vendedor.idTrabajador")
      .innerJoin("Nomina").onEquals("Trabajador.idTrabajador" ,"Nomina.idTrabajador")
      .innerJoin("PeriodoPago").onEquals("Nomina.idPeriodoPago","Periodo.idPeriodoPago")
      .leftJoin("Nomina.idNomina","IngresoNoFijo.idNomina")
      .onEquals("Trabajador.idTrabajador ","Horas_Trabajador.idTrabajador").make())
    return rows
  } catch (e) {
    throw e
  }
}
module.exports = {
  createNomina,
  crearIngresoNoFijo,
  crearIngresoNoFijoVendedor,
  getDatosTrabajador
}