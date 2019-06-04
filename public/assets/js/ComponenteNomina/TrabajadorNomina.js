import { Component, h } from 'preact'
import linkState from 'linkstate'
import NominaTrabajador from './NominaTrabajador';

class TrabajadorNomina extends Component {
  constructor() {
    super()
    this.state = {
      fecha: new Date(),
      mes: new Date().getMonth(),
      paso: 0
    }
    this.crearNominaTrabajador = this.crearNominaTrabajador.bind(this)
  }

  crearNominaTrabajador({ horasTrabajadas, horasExtra, valorVentas }) {
    const { idTrabajador, salarioPorHora, salario } = this.props.trabajador
    const { periodo } = this.props
    console.log(idTrabajador)
    console.log(this.props)
    console.log(periodo)
    console.log(typeof horasTrabajadas)
    const salarioNumero = Number.parseFloat(salario)
    const salarioPagado = salarioPorHora != 1 ? salarioNumero : salarioNumero * horasTrabajadas
    const { fecha } = this.state
    const reqBody = {
      idTrabajador,
      idPeriodoPago: periodo,
      fechaDeEmision: fecha.toISOString().slice(0, 10),
      salarioPagado

    }
    console.log(reqBody)
    fetch('http://localhost:3000/api/nomina/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    }).then(res => res.json())
      .then(data => {
        this.setState((prevState) => ({
          paso: ++prevState.paso,
          idNomina: data.idNomina
        }))
      })
  }

  render({ trabajador, next }, { paso }) {
    console.log(trabajador)
    const { nombre, apellido, cargo, porcentajeComision } = trabajador
    let pasoActual
    switch (paso) {
      case 0:
        pasoActual = <NominaTrabajador porcentajeComision={porcentajeComision} crearNomina={this.crearNominaTrabajador} />
        break;

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