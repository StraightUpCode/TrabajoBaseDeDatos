    const formulario= document.getElementById("u");
    formulario.addEventListener("submit",e=>{
        e.preventDefault();
        const request = {};
        for(let campo of formulario.elements)
            {
                if(campo.name)
                {let val;
                console.log(campo.name);
                if (campo.nodeName == "SELECT") 
                {val = campo.options[campo.selectedIndex].value;
                } else 
                {val = campo.value}
                request[campo.name] = val;}
            }
        console.log(request);

     })