var net = require('net');

var client = net.Socket();
client.connect(3000, function() {
  	console.log("You're connected to BKLN Developers Meetup.");

  	process.stdin.on('readable', function(){
  		var chunk = process.stdin.read();
        if (chunk !== null) {
        client.write(chunk);
      }
  	});
  	process.stdin.on('end', function() {
  		client.write('end');
  	});

	client.on('data', function(data){
	    console.log(data.toString().trim())
	});

	client.on('end', function() {
	    console.log("You're disconnected from BKLN Developers Meetup.");
	});
});

