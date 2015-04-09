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

			var value;
			console.log(data);

			//Update highScoreList
			MyGame.highScoresList = [];
			for(value = 0; value < data.length; value++){
				MyGame.highScoresList.push(data[value]);
			}

			MyGame.highScoresList.sort(function(a, b){
				return b.score - a.score;
			});

			while(MyGame.highScoresList.length > 10){
				MyGame.highScoresList.pop();
			}
			
		}
	});
}
