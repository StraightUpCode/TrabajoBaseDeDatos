import { Component, h } from 'preact'
import linkState from 'linkstate'
import NominaTrabajador from './NominaTrabajador';
import IngresosNoFijo from './ingresosNoFijos';

class TrabajadorNomina extends Component {
  constructor() {
    super()
    this.state = {
      fecha: new Date(),
      mes: new Date().getMonth(),
      paso: 0,
      idNomina: 0,
      calIngresoNoFijo: {
        horasExtra: 0,
        valorVentas: 0
      }
    }
    this.crearNominaTrabajador = this.crearNominaTrabajador.bind(this)
    this.getHorasJornadaTrabajador = this.getHorasJornadaTrabajador.bind(this)
    this.generarIngresosNoFijos = this.generarIngresosNoFijos.bind(this)
  }



  crearNominaTrabajador({ horasTrabajadas, horasExtra, valorVentas }) {
    const { idTrabajador, salarioPorHora, salario, porcentajeComision } = this.props.trabajador
    const { periodo } = this.props
    const salarioNumero = Number.parseFloat(salario)
    const salarioPagado = salarioPorHora != 1 ? salarioNumero : salarioNumero * horasTrabajadas
    const { fecha } = this.state
    const reqBody = {
      idTrabajador,
      idPeriodoPago: periodo,
      fechaDeEmision: fecha.toISOString().slice(0, 10),
      salarioPagado
    }

    fetch('http://localhost:3000/api/nomina/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then(res => res.json())
      .then(data => {
        console.log("Nomina")
        console.log(data)
        this.setState((prevState) => ({
          paso: ++prevState.paso,
          idNomina: data.idNomina,
          calIngresoNoFijo: {
            horasExtra,
            valorVentas
          }
        }), () => console.log(this.state))
      })
      .catch(e => console.log(e))

  }
  getHorasJornadaTrabajador() {

    return fetch(`http://localhost:3000/api/trabajador/${this.props.trabajador.idTrabajador}?nomina=true`)
      .then(res => res.json())
      .then(data => {
        let dates = data.map(el => {
          const horaEntrada = new Date()
          const horaSalida = new Date()
          horaSalida.setHours(...(el.horaSalida.split(":")))
          horaEntrada.setHours(...(el.horaEntrada.split(":")))
          return horaSalida.getHours() - horaEntrada.getHours()
        })
        const jornadaLaboral = dates.reduce((acc, cur) => acc + cur, 0)
        console.log("Jornadas Laboral" + jornadaLaboral)
        return jornadaLaboral
      })
  }

  generarIngresosNoFijos({ viatico, incentivo }) {
    const { idNomina, calIngresoNoFijo } = this.state
    const { salario, porcentajeComision } = this.props.trabajador
    console.log(porcentajeComision)
    console.log("Incentivo 1 ")
    console.log(incentivo)
    let idIngresoNoFijo
    // Fetch para crear los ingresos no Fijos (viatico, incentivo y pagoHorasExtras)
    this.getHorasJornadaTrabajador()
      .then(horasJornada => {
        const salarioHorasExtra = Number.parseFloat(salario) / (horasJornada * 30)
        const pagoHorasExtras = Number.parseFloat((calIngresoNoFijo.horasExtra * (2 * salarioHorasExtra)).toFixed(2))
        console.log("Incentivo 2 ")
        console.log(incentivo)
        fetch("http://localhost:3000/api/nomina/ingresosNoFijos", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idNomina,
            viatico,
            incentivo,
            pagoHorasExtras
          })
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            console.log(porcentajeComision)
            if (porcentajeComision) {
              this.generarIngresosNoFijosVendedor(data)
            }
            return;
          })
          .catch(e => console.log(e))

      })


  }
  generarIngresosNoFijosVendedor({ idIngresoNoFijo }) {
    const { porcentajeComision } = this.props.trabajador
    const { valorVentas } = this.state.calIngresoNoFijo
    console.log("IngresosNoFijoVendedor")
    console.log(porcentajeComision)
    console.log(valorVentas)
    fetch("http://localhost:3000/api//nomina/ingresosNoFijos/vendedor", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

  }

  render({ trabajador, next }, { paso }) {
    const { nombre, apellido, cargo, porcentajeComision } = trabajador
    let pasoActual
    switch (paso) {
      case 0:
        pasoActual = <NominaTrabajador porcentajeComision={porcentajeComision} crearNomina={this.crearNominaTrabajador} />
        break;
      case 1: {
        pasoActual = <IngresosNoFijo crearIngresosNoFijos={this.generarIngresosNoFijos} porcentajeComision={porcentajeComision} />
      }
      default:
        break;
    }
    return (
      <div>
        <h2>{`${nombre} ${apellido}`}</h2>
        <h4>{cargo}</h4>
        {pasoActual}
      </div>)
  }
}

export default TrabajadorNomina