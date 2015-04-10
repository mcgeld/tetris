
var scores = [ {
		id : 0,
		name : 'Wade',
		score : 1323,
		date : '03-March-2014',
		time : '18:40'
	}],
	scores = [],

	i,
	nextId = 2,
	content,
	string,
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
	    content = JSON.parse(data);
	    string = JSON.stringify(content);
	});


	if(content != ""){
		for(i = 0; i < content.length; i++){
			scores[i] = content[i];
		}

		console.log("Data: " + string);
	}
	

	//var score = JSON.parse(content);
	//var s = JSON.stringify(score);

	//console.log("Data: " + string);


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

