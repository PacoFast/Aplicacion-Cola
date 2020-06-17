//Comando para establecer comunicacion(conexion) activa activa
var socket = io(); 
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
	console.log('conectado desde el front-end');
});

socket.on('disconnect', function(){
	console.log('desconectado dessde el front-end'); 
});

socket.on('estadoActual', function(res){
	console.log(res); 
	label.text(res.actual); 
});

$('button').on('click', function(){
	socket.emit('siguienteTicket', null, function(siguienteTicket){
		label.text(siguienteTicket); 
	});
});


