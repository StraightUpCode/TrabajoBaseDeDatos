var arregloCargo = [{ id: numeroUnico(), idCargo: '1', nombre: 'Desarrollador de Sistemas' }];

var modoEdicion = false, idEdicion = "";
$(document).ready(function () {
    IniciarComponentes();

    $('#btnCargo').click(function () {
        if ($('#txtCargo').val() != '') {
            crearCargo();
        }
        return false;
    });



    // Edita una fila seleccionada
    $('#tblCargo').on('click', 'a.editor_edit', function (e) {
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblCargo').DataTable();
        var data = dt.row(RowIndex).data();
        console.log(data)
        modoEdicion = true;
        cargarEdicionCargo(data);

        e.stopImmediatePropagation();
    });

    // Borra una fila seleccionada
    $('#tblCargo').on('click', 'a.editor_remove', function (e) {
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblCargo').DataTable();
        var data = dt.row(RowIndex).data();
        arregloCargo = arregloCargo.filter(function (el) { return el.id != data.id });
        cargarTablaCargo(arregloCargo);

        e.stopImmediatePropagation();
    });

});
//inicia la tabla
function IniciarComponentes() {
    console.log('Iniciando componentes.');
    console.log(arregloCargo)
    fetch('http://localhost:3000/api/cargo')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            arregloCargo = data.map(el => {
                el.id = numeroUnico()
                return el
            })
            cargarTablaCargo(arregloCargo)
        })
        ;
}

// Estructura de la tabla
function cargarTablaCargo(arregloCargo) {

    $('#tblCargo').DataTable({
        data: arregloCargo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'id', visible: false, width: '1%' },
            { title: "Codigo", data: 'idCargo', visible: false, width: '1%' },
            { title: "Cargo", data: 'nombre', width: '78%' },
            {
                data: null,
                width: '20%',
                className: "center",
                defaultContent: '<a href="#" class="editor_edit">Editar</a> <a href="#" class="editor_remove">Eliminar</a>'
            }
        ]
    });

}
//pone los valores en el imput 
function cargarEdicionCargo(data) {
    $('#txtCodigoCargo').val(data.idCargo);
    $('#txtCargo').val(data.nombre);
    $('#btnCargo').text('Guardar');
    idEdicion = data.id;
}

function crearCargo() {
    var identificador = numeroUnico();
    if (modoEdicion) {
        identificador = idEdicion;
        arregloCargo = arregloCargo.filter(function (el) { return el.id != identificador });
    }
    var objeto = { id: identificador, idCargo: '', nombre: $('#txtCargo').val() }
    const { nombre } = objeto;
    fetch('http://localhost:3000/api/cargo/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            objeto.idCargo = data.idCargo
            arregloCargo.push(objeto);
            cargarTablaCargo(arregloCargo);
        })
    modoEdicion = false;
    idEdicion = '';
    inicializarInputCargo();
    return false;
}
function inicializarInputCargo() {
    $('#txtCargo').val('');
    $('#btnCargo').text('Agregar');
}

//guid(numero unico)
function numeroUnico() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


