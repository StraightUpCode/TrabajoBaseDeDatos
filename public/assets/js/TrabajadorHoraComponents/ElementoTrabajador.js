import { Component, h } from "preact";
import FormularioTrabajador from './FormularioTrabajador'
import Horarios from "./Horarios";

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

    return (
      <div>
        <div class="header">
          <h2 >{nombre} {apellido}</h2>
          <div>
            <div onClick={this.mostrarHorario}>Mostrar Horario</div>
            <div onClick={this.mostrarTrabajadorEditable} >Editar</div>
          </div>
        </div>
        {
          showHorario && <Horarios horario={horario} />
        }
        {
          showPopUpTrabajador &&
          <FormularioTrabajador idTrabajador={idTrabajador} />
        }
      </div>
    )
  }
}

export default ElementoTrabajador