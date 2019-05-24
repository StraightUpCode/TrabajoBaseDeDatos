import { Component, h } from 'preact'

class FormularioTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      cargos: [],
      diasDePago: [],
      infoTrabajador: {

      }
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/trabajador/${this.props.idTrabajador}`)
      .then(res => res.json())
      .then(data => this.setState({ infoTrabajador: data[0] }))
      .catch(e => console.error(e))
    fetch(`http://localhost:3000/api/cargos`)
      .then(res => res.json())
      .then(data => this.setState({ cargos: data }))
      .catch(e => console.error(e))
    fetch(`http://localhost:3000/api/diasDePago`)
      .then(res => res.json())
      .then(data => this.setState({ diasDePago: data }))
      .catch(e => console.error(e))

  }


  render(props, { cargos, diasDePago, infoTrabajador }) {

    console.log(infoTrabajador)
    /*
    apellido: "Sanchez"
cedula: "1234D"
fechaDeContratacion: "2019-05-17T06:00:00.000Z"
frecuenciaDePago: null
idCargo: 1
idDiaPago: 1
idTrabajador: 1
nombre: "Roberto"
salario: "12340.00"
salarioPorHora: 0
    */
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
        <input type="number" name="salario" placeholder="Salario" max="1000000"></input>

        <label>Fecha Pago:</label>
        <select id="fechaPagos" name="idDiaPago">
        </select>
      </form>
    )
  }
}

export default FormularioTrabajador