import { Component, h } from "preact";


class Horarios extends Component {
  constructor() {
    super()
    this.state = {
      mostrarAgregarHorario: false,

    }
    this.cargarHorarios = this.cargarHorarios.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  cargarHorarios() {
    fetch("http://localhost:3000/api/horarios")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          horarioAAsignar: data,
          mostrarAgregarHorario: true
        })
      })

  }

  handleChange(e) {
    console.log(this.props)
    const requestBody = JSON.stringify({
      idTrabajador: this.props.idTrabajador,
      idHorario: Number.parseInt(e.target.value)
    })
    console.log(requestBody)
    fetch(`http://localhost:3000/api/trabajador/${this.props.idTrabajador}/asignarHorario`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          nuevoHorario: data
        })
      })
  }

  render({ horario }, { horarioAAsignar, mostrarAgregarHorario, nuevoHorario }) {
    const horarios = nuevoHorario || horario
    return (
      <div class="horarios" >
        <button onClick={this.cargarHorarios} >Asignar Horario</button>
        {
          mostrarAgregarHorario && (
            <select onChange={this.handleChange} >
              <option selected value=''>Escoger una Opcion</option>
              {
                horarioAAsignar.map(el => <option value={el.idHorario} >{`${el.horaEntrada} - ${el.horaSalida}`}</option>)
              }
            </select>
          )
        }
        <table>
          <thead>
            <th> Hora Entrada
            </th>
            <th> Hora Salida
            </th>
          </thead>
          <tbody>
            {horarios.map(el => <tr>
              <td>{el.horaEntrada}</td>
              <td>{el.horaSalida}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Horarios