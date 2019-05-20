import { Component, h } from 'preact'
import linkState from 'linkstate'


const elementoTrabajador = ({ trabajador }) => {
  const { horario } = trabajador
  console.log("Elemeento Trabajador")
  return (
    <div>
      <div class="header">
        <span>{trabajador.nombre} {trabajador.apellido}</span>
        <button > Mostrar Horario </button>
      </div>
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
    </div>
  )
}


class Container extends Component {

  constructor() {
    super()
    this.state = {
      queryInProgress: false,
      nombreTrabajador: '',
      idTrabajador: null,
      busquedaTrabajadores: [],
      listaTrabajadores: []
    }

  }
  componentDidMount() {
    fetch('http://localhost:3000/api/trabajador?horario=true')
      .then(res => res.json())
      .then(data => {
        this.setState({
          listaTrabajadores: data
        })
      })
      .catch(err => console.error(err))
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.nombreTrabajador.length >= 0 && prevState.nombreTrabajador.length != this.state.nombreTrabajador.length && prevState.queryInProgress == false) {
      this.setState((prevState) => {
        this.getTrabajadores()
        return { queryInProgress: true, nQuery: prevState.nQuery++ }
      })
    }
    if (prevState.nombreTrabajador.length == 0 && this.state.busquedaTrabajadores.length) {
      this.setState(prevState => {
        return { busquedaTrabajadores: [] }
      })
    }
  }
  getTrabajadores() {

    if (!this.state.queryInProgress) {
      fetch(`http://localhost:3000/api/trabajador?name=${this.state.nombreTrabajador}`)
        .then(res => {
          return res.json()
        })
        .then(trabajadores => {
          this.setState({
            busquedaTrabajadores: trabajadores,
            queryInProgress: false
          })
        })
        .catch(e => console.log(e))
    }

  }

  getTrabajadorId(e) {
    this.setState({ idTrabajador: e.target.value, nombreTrabajador: e.target.label })
  }
  render(props, { nombreTrabajador, busquedaTrabajadores, listaTrabajadores }) {
    console.log(busquedaTrabajadores)
    console.log(listaTrabajadores)
    return (
      <div>

        <input placeholder="Buscar" value={nombreTrabajador} onInput={linkState(this, 'nombreTrabajador')} ></input>
        {busquedaTrabajadores.map(el =>
          <option value={el.idTrabajador} onClick={this.getTrabajadorId.bind(this)}> {`${el.nombre} ${el.apellido}`}</option>)}
        <div>
          <h2> Trabajadores </h2>
          {listaTrabajadores.map(el => elementoTrabajador({ trabajador: el }))}
        </div>


      </div>
    )
  }
}

//const ElementoBuscar = ({ linkValue, clickHandler })


export default Container