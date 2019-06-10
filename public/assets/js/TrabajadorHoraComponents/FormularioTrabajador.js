import { Component, h } from 'preact'

class FormularioTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      cargos: [],
      diasDePago: [],
      frecuenciaDePago: [],
      infoTrabajador: {

      },
      changedValues: {

      }
    }
    this.cargarTrabajador = this.cargarTrabajador.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.cargarTrabajador()

    fetch(`http://localhost:3000/api/cargo`)
      .then(res => res.json())
      .then(data => {
        this.setState({ cargos: data })
      })
      .catch(e => console.error(e))

    fetch(`http://localhost:3000/api/diasDePago`)
      .then(res => res.json())
      .then(data => this.setState({ diasDePago: data }))
      .catch(e => console.error(e))

    fetch(`http://localhost:3000/api/frecuenciaDePago`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          frecuenciaDePago: data
        })
      })
      .catch(e => console.log(e))
  }

  handleChange(e) {
    this.setState((prevState) => {
      console.log(prevState)
      return (
        {
          infoTrabajador: {
            ...prevState.infoTrabajador,
            [e.target.name]: e.target.value
          },
          changedValues: {
            [e.target.name]: e.target.value
          }
        }
      )
    }, () => {
      console.log(this.state)
    })
  }
  cargarTrabajador() {
    fetch(`http://localhost:3000/api/trabajador/${this.props.idTrabajador}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({ infoTrabajador: data })
      })
      .catch(e => console.error(e))
  }
  handleSubmit(e) {
    e.preventDefault()
    const { changedValues, infoTrabajador } = this.state
    console.log(changedValues)
    console.log(infoTrabajador)
    fetch(`http://localhost:3000/api/trabajador/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        changedValues,
        idTrabajador: infoTrabajador.idTrabajador
      })
    }).then(res => res.json())
      .then(data => {
        this.props.actualizar()
        console.log(data)
      })
  }
  render(props, { cargos, diasDePago, frecuenciaDePago, infoTrabajador }) {
    console.log(infoTrabajador)
    console.log(infoTrabajador.porcentajeComision)
    return (
      <form onSubmit={this.handleSubmit} method="POST">
        <input onChange={this.handleChange} type="text" name="nombre" value={infoTrabajador.nombre}></input>
        <input onChange={this.handleChange} type="text" name="apellido" value={infoTrabajador.apellido}>
        </input>
        <input onChange={this.handleChange} type="text" name="cedula" value={infoTrabajador.cedula}>
        </input>

        <label>Cargo:</label>
        <select onChange={this.handleChange} id="cargos" name="idCargo">
          {cargos.map(e => e.idCargo == infoTrabajador.idTrabajador ?
            <option selected="selected" value={e.idCargo}>{e.nombre}</option> : <option value={e.idCargo}> {e.nombre}</option>)}
        </select>
        <label>Pago:</label>
        <select onChange={this.handleChange} name="salarioPorHora">
          <option value="false">Mensual</option>
          <option value="true">Hora</option>
        </select>

        <label>Salario Base:</label>
        <input type="number" step="any" value={infoTrabajador.salario} name="salario" placeholder="Salario" max="1000000"></input>
        {
          infoTrabajador.porcentajeComision && (
            <div>
              <label>Porcentaje Comision:</label>
              <input onChange={this.handleChange} type="number" step="any" value={infoTrabajador.porcentajeComision} name="salario" placeholder="Porcentaje Comision" max="100" />
            </div>
          )
        }
        <label>Fecha Pago:</label>
        <select onChange={this.handleChange} id="fechaPagos" name="idDiaPago">
          {diasDePago.map(e => e.idCargo == infoTrabajador.idTrabajador ?
            <option selected="selected" value={e.idDia_de_Pago}>{e.diaPago}</option> : <option value={e.idDia_de_Pago}> {e.diaPago}</option>)}
        </select>
        <label>
          Frecuencia de Pago
        </label>
        <select onChange={this.handleChange} id="frecuenciaDePagos" name="idFrecuenciaDePago">
          {frecuenciaDePago.map(el => el.idFrecuenciaDePago == infoTrabajador.idFrecuenciaDePago ? <option selected="selected" value={el.idFrecuenciaDePago} > {el.nombre}</option> : <option value={el.idFrecuenciaDePago}>{el.nombre}</option>)}
        </select>
        <button onSubmit={this.handleSubmit}>Guardar </button>
      </form>
    )
  }
}

export default FormularioTrabajador