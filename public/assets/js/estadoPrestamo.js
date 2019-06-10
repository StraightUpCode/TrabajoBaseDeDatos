var arregloEstadoPrestamo = [];
var modoEdicionPrestamoPrestamo = false, idEdicionPrestamo = "";

$(document).ready(function () {
    IniciarComponentesEstadoPrestamo();

    $('#btnAgregarPrestamo').click(function () {                
        crearObjeto();
        
        return false;
    });         

    // Edita una fila seleccionada
    $('#tblEstadoPrestamo').on('click', 'a.editor_edit_prestamo', function (e) {        
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblEstadoPrestamo').DataTable();
        var data = dt.row(RowIndex).data();
        modoEdicionPrestamo = true;
        cargarEdicionPrestamo(data);

        e.stopImmediatePropagation();
    });

    // Borra una fila seleccionada
    $('#tblEstadoPrestamo').on('click', 'a.editor_remove_prestamo', function (e) {
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblEstadoPrestamo').DataTable();
        var data = dt.row(RowIndex).data();
        arregloEstadoPrestamo = arregloEstadoPrestamo.filter(function (el) { return el.id != data.id });
        CargarTabla(arregloEstadoPrestamo);

        e.stopImmediatePropagation();        
    });

});
//inicia la tabla
function IniciarComponentesEstadoPrestamo() {
    console.log('Iniciando componentes estado Prestamo.');
    CargarTabla([]);
}

// Estructura de la tabla
function CargarTabla(arregloEstadoPrestamo) {   

    $('#tblEstadoPrestamo').DataTable({
        data: arregloEstadoPrestamo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'id', visible: false ,width:'1%'},
            { title: "Codigo Trabajador", data: 'codigo' ,visible:false,width:'1%' },            
            { title: "Tasa", data: 'tasa' ,width:'78%' },
            { title: "Fecha", data: 'fecha' ,width:'78%' },
            { title: "Cuota", data: 'cuota' ,width:'78%' },
            { title: "Monto Prestamo", data: 'monto' ,width:'78%' },
            {
                data: null,
                width:'20%',
                className: "center",
                defaultContent: '<a href="#" class="editor_edit_prestamo">Editar</a> <a href="#" class="a.editor_remove_prestamo">Eliminar</a>'
            }
        ]
    });
}

//pone los valores en el imput 
function cargarEdicionPrestamo(data) {
    $('#txtCodigoCargo').val(data.codigoCargo);
    $('#txtCargo').val(data.nombre);
    $('#btnCargo').text('Guardar');
    idEdicionPrestamo = data.id;
}

function crearObjeto(){
        debugger;
        var identificador =numeroUnico();
        if (modoEdicionPrestamo) {
            identificador = idEdicionPrestamo;
            arregloEstadoPrestamo = arregloEstadoPrestamo.filter(function (el) { return el.id != identificador });
        }
        var objeto = { id: identificador, codigo: 'M00021', tasa:0.25,fecha :'2018/01/01',cuota : 0.5,monto : 7000 }
        arregloEstadoPrestamo.push(objeto);
        CargarTabla(arregloEstadoPrestamo);                
        modoEdicionPrestamo = false;
        idEdicionPrestamo ='';
        inicializarInputPrestamo();        
}

function inicializarInputPrestamo(){
    $('#txttasa').val('');
    $('#btnAgregarPrestamo').text('Agregar');
}

//guid(numero unico)
function numeroUnico() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


