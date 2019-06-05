import { Component, h } from "preact";
import linkState from "linkstate";

class DeduccionNoFija extends Component {
  constructor() {
    super()
    this.state = {
      deduccionHorasRetraso: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.crearDeduccionNoFija({ deduccionHorasRetraso: Number.parseFloat(this.state.deduccionHorasRetraso) })
  }
  render() {
    return (
      <div>
        <label for="deduccionHorasRetraso">Deduccion Horas Retraso</label>
        <input type="number" name="deduccionHorasRetraso" placeholder="Deduccion Horas Retraso" onChange={
          linkState(this, 'deduccionHorasRetraso')
        }></input>
        <button onClick={this.handleSubmit}></button>
      </div>
    )
  }
}

export default DeduccionNoFija