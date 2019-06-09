import { Component, h } from 'preact'
import linkState from 'linkstate'
class GenerarPeriodo extends Component {
  constructor() {
    super()
    this.super = {
      inicioPeriodo: '',
      finPeriodo: '',
      errorMsg: ''
    }
    this.generarPeriodoPago = this.generarPeriodoPago.bind(this)
  }

  generarPeriodoPago() {
    const { inicioPeriodo } = this.state
    const { setPeriodo } = this.props
    console.log(setPeriodo)
    console.log(this.props)

    const fechaFinPeriodo = new Date(inicioPeriodo)
    if (isNaN(fechaFinPeriodo.getTime())) {
      this.setState({ errorMsg: 'Fecha No introducida' })
      return;
    } else {
      this.setState({ errorMsg: '' })

    }
    const diasAAgregar = this.props.frecuenciaDePago == 'Quincenal' ? 15 : 30
    fechaFinPeriodo.setDate(fechaFinPeriodo.getDate() + diasAAgregar)
    const finPeriodo = fechaFinPeriodo.toISOString().slice(0, 10)
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

  render(props, { errorMsg }) {
    return (
      <div>
        <h1>Seleccion el Inicio  del Periodo de Pago de las nominas</h1>
        <input required type="date" name="inicioPeriodo" onChange={linkState(this, 'inicioPeriodo')}></input>
        {
          errorMsg && <h4>{errorMsg}</h4>
        }
        <button onClick={this.generarPeriodoPago}>Crear Periodo</button>
      </div>
    )
  }

}

export default GenerarPeriodo