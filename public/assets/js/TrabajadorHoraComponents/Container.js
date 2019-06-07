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
      listaTrabajadores: []
    }
    this.loadTrabajadores = this.loadTrabajadores.bind(this)
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
        })
        .catch(e => console.log(e))
    }

  }

  getTrabajadorId(e) {
    this.setState({ idTrabajador: e.target.value, nombreTrabajador: e.target.label })
  }
  render(props, { nombreTrabajador, busquedaTrabajadores, listaTrabajadores }) {

    return (
      <div >

        <input placeholder="Buscar" value={nombreTrabajador} onInput={linkState(this, 'nombreTrabajador')} ></input>
        {busquedaTrabajadores.map(el =>
          <option value={el.idTrabajador} onClick={this.getTrabajadorId.bind(this)}> {`${el.nombre} ${el.apellido}`}</option>)}
        <div>
          <h2> Trabajadores </h2>
          {listaTrabajadores.map(el => <ElementoTrabajador trabajador={el} reload={this.loadTrabajadores} />)
          }
        </div>


      </div>
    )
  }
}



export default Container