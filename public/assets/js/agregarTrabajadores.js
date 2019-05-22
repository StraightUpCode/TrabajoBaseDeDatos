(() => {
  const formulario = document.getElementById("formularioTrabajador")
  formulario.addEventListener("submit", e => {

    e.preventDefault()
    const request = {}
    for (let field of formulario.elements) {
      let val
      if (field.nodeName == "SELECT") {
        val = field.options[field.selectedIndex].value
      } else {
        val = field.value
      }
      request[field.name] = val
    }
    console.log(request)
    request.idCargo = Number.parseInt(request.idCargo)
    request.idDiaPago = Number.parseInt(request.idDiaPago)
    request.salario = Number.parseFloat(request.salario)
    request.salarioPorHora = request.salarioPorHora == "true"
    delete request.submit

    fetch("/api/trabajador", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    })
      .then(res => res.json())
      .then(result => formulario.reset())
      .catch(e => console.error(e))
  })
})()


