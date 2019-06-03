import { Component, h } from 'preact'
import CrearNomina from './CrearNomina'


class ComponenteNomina extends Component {
  constructor() {
    super()
    this.state = {
      frecuenciaDePago: '',
      paso: 0,
      indiceTrabajadorActual: 0,
      listaTrabajadores: [],
      idPeriodo: 0,

    }
    this.avanzarPaso = this.avanzarPaso.bind(this)
    this.setFrecuenciaDePago = this.setFrecuenciaDePago.bind(this)
  }
  avanzarPaso() {
    this.setState((prevState) => ({
      paso: ++prevState.paso
    }))
  }

  setFrecuenciaDePago(frecuenciaDePago) {
    this.setState({ frecuenciaDePago }, () => this.avanzarPaso())
  }
  render(props, { frecuenciaDePago,
    paso,
    indiceTrabajadorActual,
    listaTrabajadores,
    idPeriodo }
  ) {
    const PASOS = [<CrearNomina setFrecuencia={this.setFrecuenciaDePago} />, "1"]
    const pasoActual = PASOS[paso]

    return (
      <section >
        {pasoActual}
      </section>
    )

  }
}

export default ComponenteNomina