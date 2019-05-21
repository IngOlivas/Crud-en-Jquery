 $(document).ready(function(){     

     var id = 0;
     var Datos = [];
     var idTabla = 1;
     var confirmar = false;       
     var Fierro = '';

     $('#chkHombre').click(function(){
         $('#chkMujer').prop('checked',false);
         $('#chkOtro').prop('checked',false);
     });

     $('#chkMujer').click(function(){
         $('#chkHombre').prop('checked',false);
         $('#chkOtro').prop('checked',false);
     });

     $('#chkOtro').click(function(){
         $('#chkMujer').prop('checked',false);
         $('#chkHombre').prop('checked',false);
         $('#txtEspecificar').prop('disabled', false);
     });

     $('#chkHombres').click(function(){
         $('#chkMujeres').prop('checked',false);
         $('#chkOtros').prop('checked',false);
         $('#txtEspecificarSexo').val('');
         $('#txtEspecificarSexo').prop('disabled', true);
     });

     $('#chkMujeres').click(function(){
         $('#chkHombres').prop('checked',false);
         $('#chkOtros').prop('checked',false);
         $('#txtEspecificarSexo').val('');
         $('#txtEspecificarSexo').prop('disabled', true);
     });

     $('#chkOtros').click(function(){
         $('#chkMujeres').prop('checked',false);
         $('#chkHombres').prop('checked',false);
         $('#txtEspecificarSexo').prop('disabled', false);
     });

     $('#btnAñadir').click(function(){

         $('#Fierro').modal();
         LimpiarTexto();
     });

     $('#btnGuardar').click(function(){

         var nombre = $('#txtNombre').val();
         var apellido = $('#txtApellido').val();
         var edad = $('#txtEdad').val();
         var sexo = '';

         localStorage.setItem("id",id);     
         localStorage.setItem("Nombre", nombre);
         localStorage.setItem("Apellido",apellido);
         localStorage.setItem("Edad", edad);  


         if( $('#chkHombre').prop('checked') ) {
             sexo = 'Hombre';
         }

         if( $('#chkMujer').prop('checked') ) {
             sexo = 'Mujer';
         }

         if( $('#chkOtro').prop('checked') ) {    
             var sexo = $('#txtEspecificar').val();
         }

         localStorage.setItem("sexo",sexo);              


         var objeto = {
             ID: id,
             NOMBRE: nombre,
             APELLIDO: apellido,
             EDAD: edad,
             SEXO: sexo 
         }

         Datos.push(objeto);

         var fila = '<tr class="'+ id +'"><td>'+nombre +'</td><td>'+apellido
         +'</td><td>'+ edad +'</td><td>'+ sexo +
         '</td><td><button type="button" class="btn btn-warning btnModificar">Modificar Cliente</button></td><td><button type="button" class="btn btn-danger btnEliminarse">Eliminar Cliente</button></td></tr>';


         $("#tablaFierro").append(fila);
         $('#Fierro').modal('hide');
         id++;
         console.log(Datos);
     });

 //Funcion para eliminar
 $('#tablaFierro').on('click',".btnEliminarse", function(){
   idTabla =  $(this).parent().parent().attr("class");
   Fierro = $(this).closest('tr');  
       //$(this).closest('tr').remove(); 
       console.log(Datos);

       $('#ModalConfirmacion').modal();

   });
 
 $('#BtnConfirmacion').click(function(){
   $('#ModalConfirmacion').modal('hide');
     //delete Datos[idTabla];
     var indexData =0;
     console.log(Datos);
     for(var x in Datos){
        console.log(Datos[x].ID)
        if(Datos[x].ID == idTabla){
            indexData=x;
            break;
        }
    }

    Datos.splice(indexData, 1);
    Fierro.remove();
});


 
 $('#tablaFierro').on('click',".btnModificar",function(){        
     $('#modalModificar').modal();
     idTabla =  $(this).parent().parent().attr("class");
     var indexData = 0;

     for(var x in Datos){
        console.log(Datos[x].ID)
        if(Datos[x].ID == idTabla){
            indexData=x;
            break;
        }
    }

    var objeto = {
     Datos: Datos[indexData],   
 } 

 console.log(indexData);

 var id = objeto.Datos.ID;
 var nombre =  objeto.Datos.NOMBRE;
 var apellido = objeto.Datos.APELLIDO;
 var edad = objeto.Datos.EDAD;
 var sexo = objeto.Datos.SEXO;
 console.log(objeto);
 $('#txtNombres').val(nombre);
 $('#txtApellidos').val(apellido);
 $('#txtEdades').val(edad);

 ModificarChecks(sexo);

});
 
 $('#btnModificarCambios').click(function(){



     var nombre = $('#txtNombres').val();
     var apellido = $('#txtApellidos').val();
     var edad = $('#txtEdades').val();
     var sexo = '';


     var indexData = 0;

     for(var x in Datos){
        console.log(Datos[x].ID)
        if(Datos[x].ID == idTabla){
            indexData=x;
            break;
        }
    }

 if( $('#chkHombres').prop('checked') ) {
     sexo = 'Hombre';
 }

 if( $('#chkMujeres').prop('checked') ) {
     sexo = 'Mujer';
 }

 if( $('#chkOtros').prop('checked') ) {    
     var sexo = $('#txtEspecificarSexo').val();
 }


 Datos[indexData].APELLIDO = apellido;
 Datos[indexData].NOMBRE = nombre;
 Datos[indexData].EDAD = edad;
 Datos[indexData].SEXO = sexo;

 $('#tablaFierro tbody > tr').remove();

 for(var i=0; i < Datos.length; i++){   

    var fila = '<tr class="'+ Datos[i].ID +'"><td>'+Datos[i].NOMBRE +'</td><td>'+ Datos[i].APELLIDO
    +'</td><td>'+ Datos[i].EDAD +'</td><td>'+ Datos[i].SEXO +
    '</td><td><button type="button" class="btn btn-warning btnModificar">Modificar Cliente</button></td><td><button type="button" class="btn btn-danger btnEliminarse">Eliminar Cliente</button></td></tr>';

    $("#tablaFierro").append(fila);  
}


$('#modalModificar').modal('hide'); 

});
 
 //Funcion para buscar por nombre
 $(".buscarNombre").keyup(function() {
     var valDato = this.value.toLowerCase().trim();

     $("tbody").find("tr").each(function(index) {
         var id_Dato = $(this).find("td:nth-child(1)").first().text().toLowerCase().trim();
         $(this).toggle(id_Dato.indexOf(valDato) !== -1);     
     });
 });
 
 $(".buscarApellido").keyup(function() {
     var valDato = this.value.toLowerCase().trim();

     $("tbody").find("tr").each(function(index) {
         var id_Dato = $(this).find("td:nth-child(2)").first().text().toLowerCase().trim();
         $(this).toggle(id_Dato.indexOf(valDato) !== -1);     
     });
 });
 
 
 $(".buscarEdad").keyup(function() {
     var valDato = this.value.toLowerCase().trim();

     $("tbody").find("tr").each(function(index) {
         var id_Dato = $(this).find("td:nth-child(3)").first().text().toLowerCase().trim();
         $(this).toggle(id_Dato.indexOf(valDato) !== -1);     
     });
 });
 
 $(".buscarSexo").keyup(function() {
     var valDato = this.value.toLowerCase().trim();

     $("tbody").find("tr").each(function(index) {
         var id_Dato = $(this).find("td:nth-child(4)").first().text().toLowerCase().trim();
         $(this).toggle(id_Dato.indexOf(valDato) !== -1);     
     });
 });
 
 
 function LimpiarTexto()
 {
     $('#btnAñadir').click(function(){

         $('#txtNombre').val(''); 
         $('#txtApellido').val('');
         $('#txtEdad').val('');
         $('#txtEspecificar').prop('disabled', true);
         $('#txtEspecificar').val('');
         $('#chkMujer').prop('checked',false);
         $('#chkHombre').prop('checked',false);
         $('#chkOtro').prop('checked',false);
     });
 }; 

 function ModificarChecks(sexo)
 {
     if (sexo == 'Hombre') {
         $('#chkHombres').prop('checked',true);
         $('#chkMujeres').prop('checked',false);
         $('#chkOtros').prop('checked',false);

         $('#txtEspecificarSexo').prop('disabled',true);
         $('#txtEspecificarSexo').val('');
     }

     if (sexo == 'Mujer') {
         $('#chkHombres').prop('checked',false);
         $('#chkMujeres').prop('checked',true);
         $('#chkOtros').prop('checked',false);

         $('#txtEspecificarSexo').prop('disabled',true);
         $('#txtEspecificarSexo').val('');
     }


     if (sexo != 'Hombre' && sexo != 'Mujer') {
         $('#chkHombres').prop('checked',false);
         $('#chkMujeres').prop('checked',false);
         $('#chkOtros').prop('checked',true);
         $('#txtEspecificarSexo').prop('disabled',false);
         $('#txtEspecificarSexo').val(sexo);
     }   
 }
});
 
