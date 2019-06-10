<<<<<<< HEAD
var arregloPrestamo = [], objetoPrestamo = {};
var modoEdicion = false, idEdicion = "";
$(document).ready(function () {
    IniciarComponentesPrestamo();

    $('#tblPrestamo').on('click', '#btnCargarModal', function (e) {       
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblPrestamo').DataTable();
        var data = dt.row(RowIndex).data();
                
        cargarModal(data);
        e.stopImmediatePropagation();
        e.stopPropagation();
    });
    
});

function cargarModal(data){    
    $('#exampleModal').modal(); 
    $('#txtfechaInicial').val(data.fechaInicial);
    $('#txtfechaPago').val(data.fechaPago);
    $('#txtCuota').val(data.cuota);    
    $('#txtMonto').val(data.monto);
    $('#txtInicio').val(data.inicioPeriodo);
    $('#txtFin').val(data.FinPeriodo);    
}

//inicia la tabla
function IniciarComponentesPrestamo() {    
    debugger;
    console.log('Iniciando componentes prestamo.');
    objetoPrestamo ={ id : 1,nombre: 'Maria Luisa Medrano',fechaPago:'07/07/2018',fechaInicial:'07/07/2019',cuota:500,monto:1200,inicioPeriodo:'T00-1',FinPeriodo:'T00-2' };    
    arregloPrestamo.push(objetoPrestamo);

    cargarTablaPrestamo(arregloPrestamo);
}

// Estructura de la tabla
function cargarTablaPrestamo(arregloPrestamo) {
    
    $('#tblPrestamo').DataTable({
        data: arregloPrestamo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'id', visible: false ,width:'1%'},
            { title: "Nombre Completo", data: 'nombre' ,width:'78%' },
            {
                data: null,
                width:'20%',
                className: "center",
                defaultContent: '<button type="button"  id="btnCargarModal"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Ver detalle</button>'
            }
        ]
    });

}





=======
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
>>>>>>> 4c568848031795d4bf07de4d58a217777f423abf
