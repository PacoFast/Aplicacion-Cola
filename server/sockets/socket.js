const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control'); 
const ticketControl = new TicketControl(); 


io.on('connection', (client) => {
  console.log('usuario conectado');  
	
	client.on('siguienteTicket', (data, callback) =>{
		let ticketSiguiente = ticketControl.siguiente();
		console.log(ticketSiguiente);
		callback(ticketSiguiente);
	});

	client.emit('estadoActual', { 
		actual: ticketControl.getUltimoTicket(),
		ultimos4: ticketControl.getUltimos4()
	});




	client.on('atenderTicket', (data, callback) =>{
		if(!data.escritorio){
			return callback({
				err: true, 
				message: 'El escritorio es necesario'
			});

		}


		//Obtenemos el escritorio de la parte del front-end 
		let atenderTicket = ticketControl.atenderTicket(data.escritorio); 

		if(atenderTicket === 'No hay tickets'){
			atenderTicket = 'No hay tickets';
		}
		
		
		
		callback(atenderTicket); 

		client.broadcast.emit('ultimos4', {
			ultimos4: ticketControl.getUltimos4(),
			atenderTicket
	  });

	});

});
