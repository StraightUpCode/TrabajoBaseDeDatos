const db = require('../dbConnection')
const queryMaker = require('../testrandom')
const prestamo = require('./prestamo')
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
      queryMaker.select('idSalarioAcumulado', 'salarioAcumulado', 'meses')
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
  if (frecuenciaDePago == 'Quincenal') {
    salarioActual *= 2
    meses /= 2
  }
  console.log("Salario Acumulado", salarioAcumulado)
  console.log("Salario del Resto del Año", salarioActual * (12 - meses))
  const salarioAnual = (salarioAcumulado + (
    salarioActual * (12 - meses)
  )
  )
  console.log(salarioAnual)
  // Rango salarial	Impuesto base % aplicable	Sobre exceso de
  // C$0.01 a C8, 333.33	—	0 %	—
  // 8, 333, 34 a 16, 666.66	—	15 % C$8, 333.33
  // 16, 666, 67 a 29, 166.66	C$1, 250.00	20 % 16, 666.66
  // 29, 666.67 a 41, 666.66	3, 750.00	25 % 29, 166.66
  // 41, 666.67 o más	6, 875.00	30 % 41, 666.66
  let impuestoAnual
  if (salarioAnual > 500000) {

    impuestoAnual = ((salarioAnual - 500000) * 0.3 + 82, 500)
  }
  if (salarioAnual > 350000) {
    impuestoAnual = ((salarioAnual - 350000) * .25 + 45000)
  }
  if (salarioAnual > 200000) {
    impuestoAnual = ((salarioAnual - 200000) * .20) + 15000
  }
  if (salarioAnual > 100000) {
    impuestoAnual = ((salarioAnual - 100000) * .15)
  } else {
    impuestoAnual = 0
  }
  return impuestoAnual / 12


}

const crearDeduccion = async (
  { idNomina, inss, idTrabajador, salario, frecuenciaDePago }
) => {
  try {
    console.log("Crear Deduccion")
    const salarioAcumulado = await getSalarioAcumulado(idTrabajador)
    salarioAcumulado.salarioAcumulado = Number.parseFloat(salarioAcumulado.salarioAcumulado)
    console.log(salarioAcumulado)
    if (frecuenciaDePago == 'Quincenal') {
      salarioAcumulado.meses = salarioAcumulado.meses / 2
    }
    const IR = calcIR(salario - inss, salarioAcumulado)
    console.log("IR = ", IR)
    db.query(
      queryMaker.update('SalarioAcumulado_IR', { salarioAcumulado: salario - inss }, 'idTrabajador', idTrabajador)
        .make()
    )

    const [rows] = await db.query(
      queryMaker.insert('Deduccion', { idNomina, inss, IR })
        .make()
    )
  prestamo.checkTrabajadorTienePrestamo(idTrabajador)
  .then(result => {
    if (!result.length > 0) {
      console.log("No tiene Prestamo")
    } else {
      console.log(result[0])
      const results = result[0]
      const fecha = new Date()
      prestamo.insertPagoPrestamo(
        {
          idPrestamo: results.idPrestamo,
          montoPagado: results.cuota,
          fechaDePago: fecha.toISOString().split('T')[0]
        }
      ).then(res => deduccionPrestamo(res) )
    }
  })

    return rows.insertId

  } catch (e) {
    throw e
  }

}

const deduccionPrestamo = async (idPagoPrestamo) => {
  try {
    const [rows] =  db.query(
      queryMaker.insert('DNFija_Prestamo', {idPagoPrestamo})
    )
    return rows.insertId
  }catch(e){
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

console.log("Revisando si id tiene Prestamo")
prestamo.checkTrabajadorTienePrestamo(1)
  .then(result => {
    if (!result.length > 0) {
      console.log("No tiene Prestamo")
    } else {
      console.log(result[0])
      const results = result[0]
      const fecha = new Date()
      prestamo.insertPagoPrestamo(
        {
          idPrestamo: results.idPrestamo,
          montoPagado: results.cuota,
          fechaDePago: fecha.toISOString().split('T')[0]
        }
      ).then(res => console.log(res))
    }
  })


module.exports = {
  createNomina,
  crearIngresoNoFijo,
  crearIngresoNoFijoVendedor,
  getDatosTrabajador,
  crearDeduccion,
  crearDeduccionNoFija
}