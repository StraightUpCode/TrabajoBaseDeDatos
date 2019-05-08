(() => {
  const formaCargo = document.getElementById("cargos")
  console.log(formaCargo)
  fetch("/api/cargo")
    .then(res => res.json())
    .then(cargos => {
      console.log(cargos)
      for (let cargo of cargos) {
        console.log(cargo)
        const option = document.createElement('option')
        option.value = cargo.idCargo
        option.appendChild(document.createTextNode(cargo.nombre))
        formaCargo.appendChild(option)
      }
    })

  /* const formulario = document.getElementById("formularioTrabajador")
   formulario.addEventListener("submit", e => {
 
     e.preventDefault()
     for (let element of e.target.children) {
       console.log(element.children)
     }
   })
   */

})()


