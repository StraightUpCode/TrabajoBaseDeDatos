const formulario = document.getElementById("usuario");
formulario.addEventListener("submit", e => {
    e.preventDefault();
    const request = {};
    for (let campo of formulario.elements) {
        // Obtener los valores del formulario
        /*
        idRol , 
        username,
        password
        */
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
    console.log("ay lmao")
    request.idRol = Number.parseInt(request.idRol) || 1 // idRol es un int

    fetch("api/user/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(res => console.log(res))
        .catch()

})