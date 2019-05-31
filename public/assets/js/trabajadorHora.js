import { render, h } from 'preact'
import Container from './TrabajadorHoraComponents/Container'

const root = document.getElementById("root")
console.log(root)
console.log(render)
console.log(Container)
render(<Container />, root, root.firstChild)