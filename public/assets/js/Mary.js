/*Habilitar click*/ 

$(document ).ready(function() {
      console.log("ready!");

      $('#aPrestamo').click(function(){
        console.log('Bienvenido a  prestamo');
        $('#divPrestamo').css('display','block');        
        $('#divCargo').css('display','none');
        $('#divEstadoPrestamo').css('display','none');
      });
      
      $('#aEstadoPrestamo').click(function(){
        console.log('estoy en Estado de prestamo');
       $('#divPrestamo').css('display','none');        
       $('#divCargo').css('display','none');  
       $('divEstadoPrestamo'.css('display','block'));      
     });

      $('#aCargo').click(function(){
        console.log('Bienvenido a Cargo');
        $('#divPrestamo').css('display','none');        
        $('#divCargo').css('display','block');   
        $('#divEstadoPrestamo').css('display','none');     
      });


  });


