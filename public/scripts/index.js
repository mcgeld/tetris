//------------------------------------------------------------------
//
// Make a request to the server to add a new score.
//
//------------------------------------------------------------------
function addScore(newScore) {
	var name = newScore.name;
		score = newScore.score;
	console.log("Adding score in index.js...");
	$.ajax({
		url: 'http://localhost:3000/v1/high-scores?name=' + name + '&score=' + score,
		type: 'POST',
		dataType: 'text',
		error: function() { alert('POST failed'); },
		success: function() {
			showScores();
		}
	});

}

//------------------------------------------------------------------
//
// Make a request to the server to obtain the current set of high
// scores and show them.
//
//------------------------------------------------------------------
function showScores() {
	$.ajax({
		url: 'http://localhost:3000/v1/high-scores',
		cache: false,
		type: 'GET',
		error: function() { alert('GET failed'); },
		success: function(data) {

			for(value = 0; value < data.length; value++){
				MyGame.highScoresList.push({name: data[value].name, score: data[value].score})
			}
			var list = $('#id-high-scores'),
			value,
			text;
			
			list.empty();
			for (value = 0; value < data.length; value++) {
				console.log(data[value].name);
				text = (data[value].name + ' : ' + data[value].score);
				list.append($('<li>', { text: text }));
			}
		}
	});
}
