
const formulario = document.getElementById("formularioTrabajador")

formulario.addEventListener('submit', e => {
  e.preventDefault()
  const bodyLogin = {}
  for (const campo of formulario.elements) {
    if (campo.name) bodyLogin[campo.name] = campo.value
  }

  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyLogin)
  })
    .then(res => res.json())
    .then(({ message }) => {
      console.log(message)
    })
})