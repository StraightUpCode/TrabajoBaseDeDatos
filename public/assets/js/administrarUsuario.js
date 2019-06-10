const editButtons = document.getElementsByClassName("editar")
const resetsDeContraseña = document.getElementsByClassName("reset_pass")
const deleteButtons = document.getElementsByClassName("delete")

const getUserData = (id) => {
  return fetch(`http://localhost:3000/api/user/${id}`)
    .then(res => res.json())
    .catch(e => console.log(e))
}
const getRoles = () => {
  return fetch(`http://localhost:3000/api/rol`)
    .then(res => res.json())
    .catch(e => console.log(e))
}

for (const editButton of editButtons) {
  editButton.addEventListener("click", (e) => {
    console.log(e.target.parentElement.dataset)
    const dataset = e.target.parentElement.dataset
    getUserData(dataset.userId)
      .then(data => {
        getRoles()
          .then(roles => {
            console.log(data)
            const container = document.getElementById("editUser")
            const form = document.createElement("form")
            const inputUsername = document.createElement('input')
            inputUsername.setAttribute('type', 'text')
            inputUsername.setAttribute('name', 'username')
            inputUsername.setAttribute('value', data.username)

            const rolSelect = document.createElement('select')
            rolSelect.setAttribute('name', 'idRol')
            for (const rol of roles) {
              const optionRol = document.createElement('option')
              optionRol.setAttribute('value', rol.idRol)
              if (rol.idRol == data.idRol) optionRol.setAttribute('selected', true)
              optionRol.append(document.createTextNode(rol.nombre))
              rolSelect.append(optionRol)
            }
            const submitButton = document.createElement('button')
            submitButton.setAttribute('type', 'submit')
            form.append(inputUsername)
            form.append(rolSelect)
            form.append(submitButton)
            form.addEventListener('submit', (e) => {
              const request = {}
              for (let campo of formulario.elements) {

                if (campo.name) {
                  let val;
                  console.log(campo.name);
                  if (campo.nodeName == "SELECT") {
                    val = campo.options[campo.selectedIndex].value; // si es select
                  } else {
                    val = campo.value // Si es input 
                  }
                  request[campo.name] = val;
                }
              }
              request.idRol = Number.parseInt(request.idRol) || 1 // idRol es un int
              console.log(req)
              formulario.reset()
              fetch(`http://localhost:3000/api/user/update/${data.idUser}`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
              })
                .then(res => console.log(res))
                .catch()
            })

          })

        // name="porcentajeComision" placeholder="Porcentaje Comision"
      })

  })
}



for (const resetContraseña of resetsDeContraseña) {
  resetContraseña.addEventListener("click", (e) => {
    console.log(e.target.parentElement.dataset)
    const dataset = e.target.parentElement.dataset
    fetch(`http://localhost:3000/api/user/reset/${dataset.userId}`)

  })
}
for (const deleteButton of deleteButtons) {

}