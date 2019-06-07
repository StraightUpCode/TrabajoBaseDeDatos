import { Component, h } from 'preact'
import linkState from 'linkstate'
import ElementoTrabajador from './ElementoTrabajador';

class Container extends Component {

  constructor() {
    super()
    this.state = {
      queryInProgress: false,
      nombreTrabajador: '',
      idTrabajador: null,
      busquedaTrabajadores: [],
      listaTrabajadores: [],
      trabajadoresFiltrados: []
    }
    this.clearBusqueda = this.clearBusqueda.bind(this)
    this.loadTrabajadores = this.loadTrabajadores.bind(this)
    this.filterTrabajadores = this.filterTrabajadores.bind(this)
  }
  componentDidMount() {
    this.loadTrabajadores()
  }
  loadTrabajadores() {
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
          this.filterTrabajadores()
        })
        .catch(e => console.log(e))
    }

  }

  getTrabajadorId(e) {
    this.setState({ idTrabajador: e.target.value, nombreTrabajador: e.target.label })
  }

  filterTrabajadores() {
    const { idTrabajador, nombreTrabajador, listaTrabajadores } = this.state

    if (idTrabajador) {
      this.setState((prevState) => {
        return ({
          trabajadoresFiltrados: listaTrabajadores.filter(el => el.idTrabajador == idTrabajador)
        })
      })
    } else {
      this.setState((prevState) => {
        return ({
          trabajadoresFiltrados: listaTrabajadores.filter(el => {
            const bool = el.nombre.includes(nombreTrabajador) || el.apellido.includes(nombreTrabajador)
            console.log("Incluye el Nombre", bool)
            return bool
          })
        })
      })
    }

  }

  clearBusqueda() {
    this.setState({
      idTrabajador: null,
      nombreTrabajador: '',
      trabajadoresFiltrados: []
    })
  }
  render(props, { nombreTrabajador, busquedaTrabajadores, listaTrabajadores, trabajadoresFiltrados }) {
    const trabajadores = trabajadoresFiltrados.length > 0 ? trabajadoresFiltrados : listaTrabajadores
    return (
      <div >

        <input placeholder="Buscar" value={nombreTrabajador} onInput={linkState(this, 'nombreTrabajador')} ></input>
        {busquedaTrabajadores.map(el =>
          <option value={el.idTrabajador} onClick={this.getTrabajadorId.bind(this)}> {`${el.nombre} ${el.apellido}`}</option>)}
        <div onClick={this.clearBusqueda}>X</div>
        <div>
          <h2> Trabajadores </h2>
          {trabajadores.map(el => <ElementoTrabajador trabajador={el} reload={this.loadTrabajadores} />)
          }
        </div>


      </div>
    )
  }
}



export default Container