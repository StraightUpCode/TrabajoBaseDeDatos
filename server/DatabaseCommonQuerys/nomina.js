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
const getSalarioAcumulado = async (id) => {
  try {
    console.log("get Salario")
    const [rows] = await db.query(
      queryMaker.select('salarioAcumulado', 'meses')
        .from('SalarioAcumulado_IR')
        .equals('idTrabajador', id)
        .make()
    )
    console.log(rows[0])
    return rows[0]
  } catch (e) {
    throw e
  }
}

const calcIR = (salarioActual, { salarioAcumulado, meses, frecuenciaDePago }) => {
  if (frecuenciaDePago == 'Quincenal') salarioActual *= 2
  const salarioAnual = (salarioAcumulado + (
    salarioActual * (12 - meses)
  )
  ) / 12
  // Rango salarial	Impuesto base % aplicable	Sobre exceso de
  // C$0.01 a C8, 333.33	—	0 %	—
  // 8, 333, 34 a 16, 666.66	—	15 % C$8, 333.33
  // 16, 666, 67 a 29, 166.66	C$1, 250.00	20 % 16, 666.66
  // 29, 666.67 a 41, 666.66	3, 750.00	25 % 29, 166.66
  // 41, 666.67 o más	6, 875.00	30 % 41, 666.66

  if (salarioAnual > 41666.66) return salarioAnual * .30
  if (salarioAnual > 29166.66) return salarioAnual * .25
  if (salarioAnual > 16666.66) return salarioAnual * .20
  if (salarioAnual > 8333.33) return salarioAnual * .15
  return 0.0


}

const crearDeduccion = async (
  { idNomina, inss, idTrabajador, salario, frecuenciaDePago }
) => {
  try {
    console.log("Crear Deduccion")
    const salarioAcumulado = await getSalarioAcumulado(idTrabajador)
    salarioAcumulado.salarioAcumulado = Number.parseFloat(salarioAcumulado.salarioAcumulado)
    if (frecuenciaDePago == 'Quincenal') {
      salarioAcumulado.meses = salarioAcumulado.meses / 2
    }
    const IR = calcIR(salario - inss, salarioAcumulado)
    const [rows] = await db.query(
      queryMaker.insert('Deduccion', { idNomina, inss, IR })
        .make()
    )
    console.log(rows)

    return rows.insertId

  } catch (e) {
    throw e
  }

}
const crearDeduccionNoFija = async (deduccionNoFija) => {
  try {
    const [rows] = await db.query(
      queryMaker.insert('DeduccionNoFija', deduccionNoFija)
        .make()
    )
    return rows.insertId
  } catch (e) {
    throw e
  }
}
const getDatosTrabajador = async () => {
  console.log()
  try {
    const leQuery = queryMaker.select("Trabajador.nombre", "Trabajador.apellido",
      "Trabajador.cedula", "Cargo.nombre AS cargo", "Trabajador.salario",
      "Vendedor.porcentajeComision", "Horas_Trabajador.horasExtras",
      "IngresoNoFijo.viatico", "IngresoNoFijo.incentivo", "IngresoNoFijo.pagoHorasExtras",
      "IngresoNoFijo.viatico + IngresoNoFijo.incentivo + IngresoNoFijo.pagoHorasExtras AS totalIngresos",
      "Deduccion.IR", "Deduccion.inss", "(Deduccion.IR + Deduccion.inss) as totalDeducciones", "PeriodoPago.inicioPeriodo", "PeriodoPago.finPeriodo",
      "Nomina.fechaDeEmision", "Nomina.salarioPagado")
      .from("Trabajador")
      .innerJoin("Cargo").onEquals(" Trabajador.idCargo", "Cargo.idCargo")
      .leftJoin(" Vendedor").onEquals("Trabajador.idTrabajador", " Vendedor.idTrabajador")
      .leftJoin("Nomina").onEquals("Trabajador.idTrabajador", "Nomina.idTrabajador")
      .leftJoin("Deduccion").onEquals("Nomina.idNomina", "Deduccion.idNomina")
      .leftJoin("PeriodoPago").onEquals("Nomina.idPeriodoPago", "PeriodoPago.idPeriodoPago")
      .leftJoin("IngresoNoFijo").onEquals("Nomina.idNomina", "IngresoNoFijo.idNomina")
      .leftJoin("IngresoNoFijoVendedor").onEquals("IngresoNoFijo.idIngresoNoFijo", "IngresoNoFijoVendedor.idIngresoNoFijo")
      .leftJoin("Horas_Trabajador")
      .onEquals("Trabajador.idTrabajador ", "Horas_Trabajador.idTrabajador").make()
    console.log(leQuery)
    const [rows] = await db.query(
      leQuery
    )
    console.log(rows)
    return rows

  } catch (e) {
    throw e
  }
}
module.exports = {
  createNomina,
  crearIngresoNoFijo,
  crearIngresoNoFijoVendedor,
  getDatosTrabajador,
  crearDeduccion,
  crearDeduccionNoFija
}