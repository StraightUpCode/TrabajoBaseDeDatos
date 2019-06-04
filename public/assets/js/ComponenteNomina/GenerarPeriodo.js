import { Component, h } from 'preact'
import linkState from 'linkstate'
class GenerarPeriodo extends Component {
  constructor() {
    super()
    this.super = {
      inicioPeriodo: '',
      finPeriodo: ''
    }
    this.generarPeriodoPago = this.generarPeriodoPago.bind(this)
  }

  generarPeriodoPago() {
    const { inicioPeriodo, finPeriodo } = this.state
    const { setPeriodo } = this.props
    console.log(setPeriodo)
    console.log(this.props)
    console.log("Voy a hacer un fetch")
    fetch("http://localhost:3000/api/periodoPago/create", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          inicioPeriodo,
          finPeriodo
        }
      )
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setPeriodo({ ...res, inicioPeriodo, finPeriodo })
      })
      .catch(e => console.log(e))
  }

  render(props, state) {
    return (
      <div>
        <h1>Seleccion el Periodo de Pago de las nominas</h1>
        <input type="date" name="inicioPeriodo" onChange={linkState(this, 'inicioPeriodo')}></input>
        <input type="date" name="finPeriodo" onChange={linkState(this, 'finPeriodo')}></input>
        <button onClick={this.generarPeriodoPago}>Crear Periodo</button>
      </div>
    )
  }

}

export default GenerarPeriodo