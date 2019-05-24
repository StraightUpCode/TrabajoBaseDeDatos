import { Component, h } from "preact";
import FormularioTrabajador from './FormularioTrabajador'

class ElementoTrabajador extends Component {
  constructor() {
    super()
    this.state = {
      showHorario: false,
      showPopUpTrabajador: false
    }
    this.mostrarHorario = this.mostrarHorario.bind(this)
    this.mostrarTrabajadorEditable = this.mostrarTrabajadorEditable.bind(this)
  }
  componentDidMount() {
    console.log("Elemento Trabajador")
  }
  mostrarHorario() {
    this.setState(prevState =>
      ({ showHorario: !prevState.showHorario })
    )
  }

  mostrarTrabajadorEditable() {
    this.setState(prevState =>
      ({ showPopUpTrabajador: !prevState.showPopUpTrabajador })
    )
  }

  render({ trabajador: { idTrabajador, nombre, apellido, horario } },
    { showHorario, showPopUpTrabajador }) {
    console.log(nombre)
    return (
      <div>
        <div class="header">
          <span>{nombre} {apellido}</span>
          <div>
            <div onClick={this.mostrarHorario}>Mostrar Horario</div>
            <div onClick={this.mostrarTrabajadorEditable} >Editar</div>
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
        {
          showPopUpTrabajador ? (
            <div>
              <FormularioTrabajador idTrabajador={idTrabajador} />
            </div>
          ) : null
        }
      </div>
    )
  }
}

export default ElementoTrabajador