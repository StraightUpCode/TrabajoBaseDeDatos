import { Component, h } from 'preact'
import linkState from 'linkstate'

class NominaTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      horasTrabajadas: 0,
      horasExtra: 0,
      valorVentas: 0
    }
    this.crearNomina = this.crearNomina.bind(this)
  }
  crearNomina() {
    const { horasExtra, horasTrabajadas, valorVentas } = this.state
    this.props.crearNomina({
      horasExtra: Number.parseFloat(horasExtra), horasTrabajadas: Number.parseFloat(horasTrabajadas), valorVentas: Number.parseFloat(valorVentas)
    })

  }


  render({ porcentajeComision }, { horasExtra, horasTrabajadas, valorVentas }) {
    return (<div>
      <label for="horasTrabajadas">Horas Trabajadas</label>
      <input type="number" step="any" name="horasTrabajadas" placeholder="Horas Trabajadas" value={horasTrabajadas} onInput={linkState(this, 'horasTrabajadas')} ></input>
      <label for="horasTrabajadas">Horas Extra</label>
      <input type="number" step="any" name="horasExtra" placeholder="Horas Extra" value={horasExtra} onInput={linkState(this, 'horasExtra')} ></input>
      {
        porcentajeComision &&
        (
          <div>
            <label for="horasTrabajadas">Ventas Realizadas</label>
            <input type="number" step="any" name="comision" placeholder="Ventas Realizadas" value={valorVentas} onInput={linkState(this, 'valorVentas')} ></input>
          </div>
        )
      }

      <button onClick={this.crearNomina}>Siguiente</button>

    </div>)
  }
}

export default NominaTrabajador