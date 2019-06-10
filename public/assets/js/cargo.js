var arregloCargo = [], objetoCargo = { codigoCargo: '1', nombre: 'Desarrollador de Sistemas' };

var modoEdicion = false, idEdicion = "";
$(document).ready(function () {
    IniciarComponentes();

    $('#btnCargo').click(function () {        
        if($('#txtCargo').val() != '')
            crearCargo();
        else

        return false;
    });
    
      $('#aEstadoPrestamo').click(function(){
        console.log('estoy en Estado de prestamo');
        $('#divEstadoPrestamo').css('display','block');   
        $('#divPrestamo').css('display','none');        
        $('#divCargo').css('display','none');             
        return false;
      });

      $('#aCargo').click(function(){
        console.log('Bienvenido a Cargo');
        $('#divCargo').css('display','block');
        $('#divPrestamo').css('display','none');                   
        $('#divEstadoPrestamo').css('display','none');   
        return false;  
      });

      $('#aPrestamo').click(function(){
       console.log('Prestamo ');
       $('#divPrestamo').css('display','block');        
       $('#divCargo').css('display','none');  
       $('#divEstadoPrestamo').css('display','none');      
       return false;
     });


    // Edita una fila seleccionada
    $('#tblCargo').on('click', 'a.editor_edit', function (e) {        
        debugger;
        var RowIndex = $(this).closest('tr');
        var dt = $('#tblCargo').DataTable();
        var data = dt.row(RowIndex).data();
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
    cargarTablaCargo([]);
}

// Estructura de la tabla
function cargarTablaCargo(arregloCargo) {
    
    $('#tblCargo').DataTable({
        data: arregloCargo,
        destroy: true,
        columns: [
            { title: "Identificador", data: 'id', visible: false ,width:'1%'},
            { title: "Codigo", data: 'codigoCargo' ,visible:false,width:'1%' },
            { title: "Cargo", data: 'nombre' ,width:'78%' },
            {
                data: null,
                width:'20%',
                className: "center",
                defaultContent: '<a href="#" class="editor_edit">Editar</a> <a href="#" class="editor_remove">Eliminar</a>'
            }
        ]
    });

}
//pone los valores en el imput 
function cargarEdicionCargo(data) {
    $('#txtCodigoCargo').val(data.codigoCargo);
    $('#txtCargo').val(data.nombre);
    $('#btnCargo').text('Guardar');
    idEdicion = data.id;
}

function crearCargo(){
        debugger;
        var identificador =numeroUnico();
        if (modoEdicion) {
            identificador = idEdicion;
            arregloCargo = arregloCargo.filter(function (el) { return el.id != identificador });
        }
        var objeto = { id: identificador, codigoCargo: '', nombre: $('#txtCargo').val() }
        arregloCargo.push(objeto);
        cargarTablaCargo(arregloCargo);                
        modoEdicion = false;
        idEdicion ='';
        inicializarInputCargo();
        return false;
}
function inicializarInputCargo(){
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


