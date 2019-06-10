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
    this.mandarAPadre = this.mandarAPadre.bind(this)
  }

  handleClick() {
    const { viatico, incentivo } = this.state
    console.log("Reset Ingreso No Fijo")
    this.setState({ viatico: 0, incentivo: 0 }, () => {
      this.mandarAPadre({ viatico, incentivo })
    })


  }
  mandarAPadre({ viatico, incentivo }) {
    this.props.crearIngresosNoFijos({
      viatico: Number.parseFloat(viatico),
      incentivo: Number.parseFloat(incentivo)
    })
  }

  render({ porcentajeComision }, { incentivo, viatico
     }) {
    return (
      <div>
        <label for="viatico">Viatico</label>
        <input name="viatico" value={viatico}type="number" step="any" placeholder="Viatico" onChange={linkState(this, 'viatico')} />
        <label for="incentivo">Bono</label>
        <input name="incentivo" value={incentivo }type="number" step="any" placeholder="Incentivo" onChange={linkState(this, 'incentivo')} />
        <button onClick={this.handleClick} > Siguiente</button>
      </div>
    )
  }
}

export default IngresosNoFijos