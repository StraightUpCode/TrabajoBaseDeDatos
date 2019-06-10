import { Component, h } from 'preact'
import CrearNomina from './CrearNomina'
import GenerarPeriodo from './GenerarPeriodo'
import TrabajadorNomina from './TrabajadorNomina'


class ComponenteNomina extends Component {
  constructor() {
    super()
    this.state = {
      frecuenciaDePago: '',
      paso: 0,
      indiceTrabajadorActual: 0,
      listaTrabajadores: [],
      Periodo: {
        idPeriodo: 0,
        inicioPeriodo: 0,
        finPeriodo: 0
      }

    }
    this.avanzarPaso = this.avanzarPaso.bind(this)
    this.setFrecuenciaDePago = this.setFrecuenciaDePago.bind(this)
    this.setPeriodoPago = this.setPeriodoPago.bind(this)
    this.queryTrabajadores = this.queryTrabajadores.bind(this)
    this.avanzarTrabajador = this.avanzarTrabajador.bind(this)
  }

  avanzarPaso() {
    this.setState((prevState) => ({
      paso: ++prevState.paso
    }))
  }
  avanzarTrabajador() {
    this.setState((prevState) => {
      console.log(prevState)
      console.log("Indice ", prevState.indiceTrabajadorActual)
      console.log("Length", prevState.listaTrabajadores.length)
      console.log("Indice Al que Vamos ", prevState.indiceTrabajadorActual + 1)

      if (prevState.indiceTrabajadorActual + 1 >= prevState.listaTrabajadores.length) {
        return ({
          ...prevState,
          paso: ++prevState.paso
        })
      } {
        return ({ indiceTrabajadorActual: ++prevState.indiceTrabajadorActual })
      }

    })
  }

  setFrecuenciaDePago(frecuenciaDePago) {
    this.setState({ frecuenciaDePago }, () => this.avanzarPaso())
  }

  setPeriodoPago(Periodo) {
    this.setState({ Periodo }, () => this.queryTrabajadores())
  }
  queryTrabajadores() {
    const { frecuenciaDePago, Periodo: { inicioPeriodo, finPeriodo } } = this.state

    console.log("Cargando Trabajadores")
    fetch("http://localhost:3000/api/crearNomina/trabajadores", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        frecuenciaDePago,
        inicio: new Date(...(inicioPeriodo.split("-"))).getDate(),
        fin: new Date(...(finPeriodo.split("-"))).getDate()
      })

    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          listaTrabajadores: data
        }, this.avanzarPaso())
      }).catch()
  }
  render(props, { frecuenciaDePago,
    paso,
    indiceTrabajadorActual,
    listaTrabajadores,
    Periodo }
  ) {
    let pasoActual
    switch (paso) {
      case 0: {
        pasoActual = <CrearNomina setFrecuencia={this.setFrecuenciaDePago} />
        break;
      }
      case 1: {
        pasoActual = <GenerarPeriodo setPeriodo={this.setPeriodoPago} frecuenciaDePago={frecuenciaDePago} />
        break;
      }
      case 2: {
        console.log(this.state)
        pasoActual = <TrabajadorNomina trabajador={listaTrabajadores[indiceTrabajadorActual]} next={this.avanzarTrabajador} periodo={Periodo.idPeriodoPago} />
        break;
      }
      default: {
        pasoActual = (() => (
          <div>
            <h3>Nominas Generadas Correctamente</h3>
          </div>
        ))()
        break;
      }
    }

    console.log(listaTrabajadores)
    console.log("Indice Trabajador Actual", indiceTrabajadorActual)
    console.log("Trabajador Actual")
    console.log(listaTrabajadores[indiceTrabajadorActual])
    return (
      <section >
        {pasoActual}
      </section>
    )

  }
}

export default ComponenteNomina