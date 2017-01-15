var express = require('express');

var PORT = 3000;

var server = express();

server.use(express.static(__dirname + '/dist'));

server.listen(PORT, function () {
	console.log('Server running on port ' + PORT);
})