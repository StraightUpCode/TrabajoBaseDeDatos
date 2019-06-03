import { Component, h } from 'preact'
import linkState from 'linkstate'
class GenerarPeriodo extends Component {
  constructor() {
    super()
  }


  render() {
    return (
      <div>
        <h1>Seleccion el Periodo de Pago de las nominas</h1>
        <input type="date" name="inicioPeriodo" ></input>
        <input type="date" name="finPeriodo"></input>

      </div>
    )
  }

}