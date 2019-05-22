import { Component, h } from "preact";


class ElementoTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      showHorario: false
    }
    this.mostrarHorario = this.mostrarHorario.bind(this)
  }
  componentDidMount() {
    console.log("Elemento Trabajador")
  }
  mostrarHorario() {
    this.setState(prevState =>
      ({ showHorario: !prevState.showHorario })
    )
  }

  render({ trabajador: { nombre, apellido, horario } }, { showHorario }) {
    console.log(nombre)
    return (
      <div>
        <div class="header">
          <span>{nombre} {apellido}</span>
          <button onClick={this.mostrarHorario}> Mostrar Horario </button>
          <div>
            Editar
          </div>
        </div>
        {
          showHorario ? (
            <div class="horarios" >
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
          ) : null
        }
      </div>
    )
  }
}

export default ElementoTrabajador