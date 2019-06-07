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
    this.eliminarUsuario = this.eliminarUsuario.bind(this)
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


  eliminarUsuario() {
    fetch(`http://localhost:3000/api/trabajador/${this.props.trabajador.idTrabajador}/delete`)
      .then(res => {
        this.props.reload()
      })
  }


  render({ trabajador: { idTrabajador, nombre, apellido, horario } },
    { showHorario, showPopUpTrabajador }) {

    return (
      <div>
        <div class="header">
          <h2 >{nombre} {apellido}</h2>
          <div>
            <button onClick={this.mostrarHorario}>Mostrar Horario</button>
            <button onClick={this.mostrarTrabajadorEditable} >Editar</button>
            <button onClick={this.eliminarUsuario} >Eliminar</button>

          </div>
        </div>
        {
          showHorario && <Horarios horario={horario} idTrabajador={idTrabajador} />
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