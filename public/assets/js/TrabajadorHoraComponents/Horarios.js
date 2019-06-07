import { Component, h } from "preact";


class Horarios extends Component {
  constructor() {
    super()
    this.state = {
      mostrarAgregarHorario: false,

    }
  }


  render({ horario }, { horarioAsignado, mostrarAgregarHorario }) {
    console.log("render")
    return (
      <div class="horarios" >
        <button >Asignar Horario</button>
        {
          mostrarAgregarHorario && (
            <select onChange={this.handleChange} >
              {
                horariosAAsignar.map(el => <option value={el.idHorario} >{`${el.horaEntrada} - ${el.horaSalida}`}</option>)
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
            {horario.map(el => <tr>
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