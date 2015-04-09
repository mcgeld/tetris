//------------------------------------------------------------------
//
// This is some dummy score data
//
//------------------------------------------------------------------
/*
var scores = [ {
		id : 0,
		name : 'John Doe',
		score : 1000,
		date : '03-March-2014',
		time : '18:40'
	}, {
		id : 1,
		name : 'Jane Doe',
		score : 2000,
		date : '04-March-2014',
		time : '14:20'
	}],
	nextId = 2;


var fs = require('fs');


//------------------------------------------------------------------
//
// Report all scores back to the requester.
//
//------------------------------------------------------------------
exports.all = function(request, response) {
	console.log('find all scores called');
	response.writeHead(200, {'content-type': 'application/json'});

	fs.readFile('public/scores.txt', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	});

	response.end(JSON.stringify(data));
};

//------------------------------------------------------------------
//
// Add a new score to the server data.
//
//------------------------------------------------------------------
exports.add = function(request, response) {
	console.log('add new score called');
	console.log('Name: ' + request.query.name);
	console.log('Score: ' + request.query.score);
	
	var now = new Date();

	scores.push( {
		id : nextId,
		name : request.query.name,
		score : request.query.score,
		date : now.toLocaleDateString(),
		time : now.toLocaleTimeString()
	});
	nextId++;

/*
	var path = 'public/scores.txt',
	buffer = new Buffer("new score added\n");

	fs.open(path, 'w', function(err, fd) {
	    if (err) {
	        throw 'error opening file: ' + err;
	    } else {
	        fs.write(fd, buffer, 0, buffer.length, null, function(err) {
	            if (err) throw 'error writing file: ' + err;
	            fs.close(fd, function() {
	                console.log('file written');
	            })
	        });
	    }
	});
	
	response.writeHead(200);
	response.end();
};
*/

//------------------------------------------------------------------
//
// This is some dummy score data
//
//------------------------------------------------------------------
var scores = [ {
		id : 0,
		name : 'John Doe',
		score : 1000,
		date : '03-March-2014',
		time : '18:40'
	}, {
		id : 1,
		name : 'Jane Doe',
		score : 2000,
		date : '04-March-2014',
		time : '14:20'
	}],
	nextId = 2,
	content,
	path = 'public/scores.txt';

var fs = require('fs');

//------------------------------------------------------------------
//
// Report all scores back to the requester.
//
//------------------------------------------------------------------
exports.all = function(request, response) {
	console.log('find all scores called');
	response.writeHead(200, {'content-type': 'application/json'});


	fs.readFile('public/scores.txt', function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    content = data;
	});


	console.log("Data: " + content);

	response.end(JSON.stringify(scores));
};

//------------------------------------------------------------------
//
// Add a new score to the server data.
//
//------------------------------------------------------------------
exports.add = function(request, response) {
	console.log('add new score called');
	console.log('Name: ' + request.query.name);
	console.log('Score: ' + request.query.score);
	
	var now = new Date();
	scores.push( {
		id : nextId,
		name : request.query.name,
		score : request.query.score,
		date : now.toLocaleDateString(),
		time : now.toLocaleTimeString()
	});
	nextId++;

	fs.writeFile('public/scores.txt', JSON.stringify(scores), function (err) {
	  if (err) return console.log(err);
	  console.log('Wrote to scores.txt');
	});
	
	response.writeHead(200);
	response.end();
};

