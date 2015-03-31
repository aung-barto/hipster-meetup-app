var net = require('net');
var fs = require('fs');
var port = 3000
var names = [];
var info = [];
var topic = [];
var date = [];
var location = "51 Bergen Street";

//reading meetup topic and date
fs.readFile('meetup.json', function(err, data) {
	if(err) {
		console.log(err);
	}
	else {
		var info = data.toString().split(',');
		topic.push(info[0].replace(/[_]/gi, " "));
		date.push(info[1].replace(/[_]/gi, " "));
		// console.log(topic, date);
	}
});

//greeting and getting developers' input
var server = net.createServer(function(socket) {
 	console.log('user is connected\n');
 	socket.write("Hello, this month Meetup is about " + topic + "\nAt 51 Bergen St. Brooklyn on " + date+".\nPlease enter your name and email address to RSVP.\n(firstname lastname email)");   

//getting rsvp list
 	socket.on('data', function(data) {
 		var message = data.toString().trim().split(" ");
 		// console.log(message);
		if (message[0] === 'adminlist') {
 				fs.readFile('rsvplist.json', function(err, data) {
 					if(err) {
 						console.log(err);
 					}
 					else {
 						socket.write("Your rsvp list:\n" + data.toString().split(','));
 					}
 				});
 		}

 //adding new topic and date
 		else if (message[0] === 'adminnew') {
 			// for (var i = 1; i < message.length; i++){
				info.push(message);
				console.log(info);
				fs.writeFile('meetup.json', info, function(err) {
		    		if(err) {
		    			console.log(err);
		    		}
		    		else {
		    			socket.write('new info saved');
		    		}
		    	});
			// }
 		}

//getting developers info
 		else if (message[0] != 'adminlist' && message[0] != 'adminnew') {
 			socket.write("We have your name. See you at "+ location + " on " + date + ".\n"+ names.length + " people have signed up.\nYou may exit telnet at anytime.");
 			var clientInfo = message.join(' ');
 			names.push(clientInfo+'\n');
 			fs.writeFile('rsvplist.json', names, function(err) {
	    		if(err) {
	    			console.log(err);
	    		}
	    		else {
	    			console.log('rsvp saved');
	    		}
    		});
 		}
 		else if (message === ""){
 			socket.end();
 		}
 	});

 		socket.on('end', function() {
			console.log('user disconnected');
	});
});

server.listen(port, function() { //'listening' listener
 console.log('listening on port ' + port );
});