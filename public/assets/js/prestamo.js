const idTrabajador = document.getElementById("idTrabajador")
const fechaInicial = document.getElementById("fechaInicial")
const cuota = document.getElementById("cuota")
const monto = document.getElementById("monto")

const btnAgregarPrestamo = document.getElementById("btnAgregarPrestamo")


const form = document.getElementById("form")
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const request = {}
    for (const campo of form.elements) {
        if (campo.name) request[campo.name] = campo.value
    }
    request.idTrabajador = Number.parseInt(request.idTrabajador)
    request.cuota = Number.parseFloat(request.cuota)
    request.monto = Number.parseFloat(request.monto)

    fetch('http://localhost:3000/api/prestamo/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    }).then(res => res.json())
        .then(data => console.log(data))
})