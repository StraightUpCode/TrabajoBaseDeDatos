(() => {
  const formulario = document.getElementById("formularioTrabajador")
  formulario.addEventListener("submit", e => {

    e.preventDefault()
    const request = {}
    for (let field of formulario.elements) {
      let val
      if (field.name) {
        console.log(field.name)
        if (field.nodeName == "SELECT") {
          console.log(field.options
          )
          val = field.options[field.selectedIndex].value
        } else {
          console.log(field)
          val = field.value
        }
        request[field.name] = val
      }
    }
    request.idCargo = Number.parseInt(request.idCargo)
    console.log(request.idDiaPago)
    console.log(request)
    request.idDiaPago = Number.parseInt(request.idDiaPago)
    request.salario = Number.parseFloat(request.salario)
    request.salarioPorHora = request.salarioPorHora == "true"
    request.idFrecuenciaDePago = Number.parseFloat(request.idFrecuenciaDePago)
    delete request.submit

    console.log(request)



    fetch("http://localhost:3000/api/trabajador", {
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