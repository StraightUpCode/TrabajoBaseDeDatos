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

function cargarModal(data) {
    console.log(data)
    const fechaDePago = new Date(data.fechaDePago)
    const fechaInicial = new Date(data.fechaInicial)
    console.log(fechaInicial)
    console.log(fechaDePago)
    let stringFechaPago = 'No ha pagado'
    let stringFechaIncial = ''
    if (data.fechaDePago && !isNaN(fechaDePago.getTime())) {
        stringFechaPago = fechaDePago.toISOString().split('T')[0].split('-').reverse().join('/')
    }
    if (!isNaN(fechaInicial.getTime())) {
        stringFechaIncial = fechaInicial.toISOString().split('T')[0].split('-').reverse().join('/')
    }

    $('#exampleModal').modal();
    $('#txtfechaInicial').val(stringFechaIncial);
    $('#txtfechaPago').val(stringFechaPago);
    $('#txtCuota').val(data.cuota);
    $('#txtMonto').val(data.monto);
    $('#txtDeudaSaldada').val(data.deudaSaldada)
}

//inicia la tabla
function IniciarComponentesPrestamo() {

    console.log('Iniciando componentes prestamo.');
    objetoPrestamo = { idPrestamo: 2, nombre: 'Maria Luisa Medrano', fechaDePago: '07/07/2018', fechaIgnicial: '07/07/2019', cuota: 500, monto: 1200, deudaSaldada: 500 };
    fetch('http://localhost:3000/api/prestamo/getDetalles')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            arregloPrestamo = data
            arregloPrestamo.push(objetoPrestamo);

            cargarTablaPrestamo(arregloPrestamo);
        })
}

// Estructura de la tabla
function cargarTablaPrestamo(arregloPrestamo) {

    $('#tblPrestamo').DataTable({
        data: arregloPrestamo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'idPrestamo', visible: false, width: '1%' },
            { title: "Nombre Completo", data: 'nombre', width: '78%' },
            {
                data: null,
                width: '20%',
                className: "center",
                defaultContent: '<button type="button"  id="btnCargarModal"  class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Ver detalle</button>'
            }
        ]
    });

}

