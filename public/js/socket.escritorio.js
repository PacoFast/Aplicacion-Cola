//establecemos la conexion  
var socket = io();
//Obtengo los parametros de la url
var searchParams = new URLSearchParams(window.location.search);
var label = $('small'); 
if(!searchParams.has('escritorio')){
	//En caso de no tener un escritorio asignado se saldra a la pagina principal
	window.location = 'index.html'; 
	throw new Error('El escritorio es necesario'); 
}

//obtenemos el numero de escritorio
var escritorio = searchParams.get('escritorio'); 
var resp = '';
$('h1').text('Escritorio '+escritorio); 

$('button').on('click', function(){
	//Mandamos el escritorio que obtenemos en los parametros del link
	socket.emit('atenderTicket', { escritorio: escritorio}, function(resp){
		console.log(resp);
		if(resp === 'No hay tickets'){
			label.text('No hay tickets'); 
			alert(resp);
			resp = 'No hay tickets';
			return;
		}
		label.text(resp.numero); 
	});
}); 
