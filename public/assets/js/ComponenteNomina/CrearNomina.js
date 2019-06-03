import { Component, h } from "preact";
import linkSate from 'linkstate'

class CrearNomina extends Component {
  constructor() {
    super();
    this.state = {
      frecuenciasDePago: [],
      frecuenciaSeleccionada: ''
    }
    this.seleccionFrecuenciaPago = this.seleccionFrecuenciaPago.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/frecuenciaDePago")
      .then(res => res.json())
      .then(frecuenciasDePago => {
        this.setState({ frecuenciasDePago })
      })
      .catch(e => console.log(e))
  }

  seleccionFrecuenciaPago(e) {
    this.props.setFrecuencia(e.target.value)
  }
  render(props, { frecuenciasDePago, frecuenciaSeleccionada }) {
    console.log(frecuenciasDePago)
    console.log(frecuenciaSeleccionada)
    return (
      <div>
        <h1> Crear Nomina</h1>
        <span>Seleccione la frecuencia de Pago </span>
        {
          frecuenciasDePago.map(frec =>
            <button onClick={this.seleccionFrecuenciaPago} value={frec.nombre}>{frec.nombre}</button>)
        }
      </div>
    )
  }
}

export default CrearNomina