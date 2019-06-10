var arregloPrestamo = [], objetoPrestamo = {};
var modoEdicion = false, idEdicion = "";
$(document).ready(function () {
    IniciarComponentesPrestamo();

    $('#tblPrestamo').on('click', '#btnCargarModal', function (e) {
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblPrestamo').DataTable();
        var data = dt.row(RowIndex).data();

        cargarModal(data);
        e.stopImmediatePropagation();
        e.stopPropagation();
    });

});

function cargarModal(data) {
    $('#exampleModal').modal();
    $('#txtfechaInicial').val(data.fechaInicial);
    $('#txtfechaPago').val(data.fechaDePago);
    $('#txtCuota').val(data.cuota);
    $('#txtMonto').val(data.monto);
    $('#txtDeudaSaldada').val(data.deudaSaldada
    )
}

//inicia la tabla
function IniciarComponentesPrestamo() {
    debugger;
    console.log('Iniciando componentes prestamo.');
    objetoPrestamo = { id: 1, nombre: 'Maria Luisa Medrano', fechaDePago: '07/07/2018', fechaInicial: '07/07/2019', cuota: 500, monto: 1200, deudaSaldada: 500 };
    arregloPrestamo.push(objetoPrestamo);

    cargarTablaPrestamo(arregloPrestamo);
}

// Estructura de la tabla
function cargarTablaPrestamo(arregloPrestamo) {

    $('#tblPrestamo').DataTable({
        data: arregloPrestamo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'id', visible: false, width: '1%' },
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

