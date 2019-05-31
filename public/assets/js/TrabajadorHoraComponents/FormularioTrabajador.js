import { Component, h } from 'preact'

class FormularioTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      cargos: [],
      diasDePago: [],
      frecuenciaDePago: [],
      infoTrabajador: {

      }
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/trabajador/${this.props.idTrabajador}`)
      .then(res => res.json())
      .then(data => this.setState({ infoTrabajador: data[0] }))
      .catch(e => console.error(e))

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


  render(props, { cargos, diasDePago, frecuenciaDePago, infoTrabajador }) {

    return (
      <form>
        <input type="text" name="nombre" value={infoTrabajador.nombre}></input>
        <input type="text" name="apellido" value={infoTrabajador.apellido}>
        </input>
        <input type="text" name="cedula" value={infoTrabajador.cedula}>
        </input>

        <label>Cargo:</label>
        <select id="cargos" name="idCargo">
          {cargos.map(e => e.idCargo == infoTrabajador.idTrabajador ?
            <option selected="selected" value={e.idCargo}>{e.nombre}</option> : <option value={e.idCargo}> {e.nombre}</option>)}
        </select>
        <label>Pago:</label>
        <select name="salarioPorHora">
          <option value="false">Mensual</option>
          <option value="true">Hora</option>
        </select>

        <label>Salario Base:</label>
        <input type="number" value={infoTrabajador.salario} name="salario" placeholder="Salario" max="1000000"></input>

        <label>Fecha Pago:</label>
        <select id="fechaPagos" name="idDiaPago">
          {diasDePago.map(e => e.idCargo == infoTrabajador.idTrabajador ?
            <option selected="selected" value={e.idDia_de_Pago}>{e.diaPago}</option> : <option value={e.idDia_de_Pago}> {e.diaPago}</option>)}
        </select>
        <label>
          Frecuencia de Pago
        </label>
        <select id="frecuenciaDePagos" name="idFrecuenciaDePago">
          {frecuenciaDePago.map(el => el.idFrecuenciaDePago == infoTrabajador.idFrecuenciaDePago ? <option selected="selected" value={el.idFrecuenciaDePago} > {el.nombre}</option> : <option value={el.idFrecuenciaDePago}>{el.nombre}</option>)}
        </select>
      </form>
    )
  }
}

export default FormularioTrabajador