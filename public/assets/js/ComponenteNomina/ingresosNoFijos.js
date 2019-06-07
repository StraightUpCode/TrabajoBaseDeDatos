import { Component, h } from "preact";
import linkState from "linkstate";

class IngresosNoFijos extends Component {

  constructor() {
    super()
    this.state = {
      viatico: 0,
      incentivo: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { viatico, incentivo } = this.state
    console.log("Viatico" + viatico)
    console.log("Incentivo " + incentivo)
    this.props.crearIngresosNoFijos({
      viatico: Number.parseFloat(viatico),
      incentivo: Number.parseFloat(incentivo)
    })
  }

  render({ porcentajeComision }) {
    return (
      <div>
        <label for="viatico">Viatico</label>
        <input name="viatico" type="number" step="any" placeholder="Viatico" onChange={linkState(this, 'viatico')} />
        <label for="incentivo">Incentivo</label>
        <input name="incentivo" type="number" step="any" placeholder="Incentivo" onChange={linkState(this, 'incentivo')} />
        <button onClick={this.handleClick} > Siguiente</button>
      </div>
    )
  }
}

export default IngresosNoFijos