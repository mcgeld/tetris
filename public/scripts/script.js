MyGame.initialize = (function initialize(){

	MyGame.hardDrop = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.hardDropPressed === false){
			MyGame.activePiece.hardDrop(elapsedTime);
			MyGame.playSound('audio/bloop_x');
			MyGame.hardDropPressed = true;
		}
	};
	
	MyGame.softDrop = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.softDropPressed === false){
			MyGame.activePiece.softDrop(elapsedTime);
		}
	};
	
	
	MyGame.rotateRight = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.rotateRightPressed === false){
			MyGame.activePiece.rotate(elapsedTime, 'R');
			MyGame.rotateRightPressed = true;
		}
	};

	MyGame.rotateLeft = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.rotateLeftPressed === false){
			MyGame.activePiece.rotate(elapsedTime, 'L');
			MyGame.rotateLeftPressed = true;
		}
	};

	MyGame.moveLeft = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.moveLeftPressed === false && MyGame.activePiece.inPlace() === false){
			MyGame.activePiece.moveLeft(elapsedTime);
			MyGame.moveLeftPressed = true;
		}
	};

	MyGame.moveRight = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.moveRightPressed === false && MyGame.activePiece.inPlace() === false){
			MyGame.activePiece.moveRight(elapsedTime);
			MyGame.moveRightPressed = true;
		}
	};


	var myKeyboard = MyGame.input.Keyboard(),
		context = document.getElementById('canvas-main').getContext('2d'),
		//scoreCtx = document.getElementById('canvas-scores').getContext('2d'),
		time = new Date().getTime(),
		prevTime = time,
		aiTime = new Date().getTime(),
		aiPrevTime = time,
		elapsedTime = 0,
		nextPieceId = 0,
		nextPieceType = Math.floor(Math.random() * 7 + 1);
		

	MyGame.nextPieceId = function() {
		return nextPieceId++;
	};

	MyGame.getNextPieceType = function() {
		return nextPieceType;
	};

	MyGame.setNextPieceType = function() {
		nextPieceType = Math.floor(Math.random() * 7 + 1);
	};

	MyGame.dummy = function(){
		return true;
	};

	MyGame.setSoftDropPressed = function() {
		MyGame.softDropPressed = false;
	};

	MyGame.setHardDropPressed = function() {
		MyGame.hardDropPressed = false;
	};

	MyGame.setRotateRightPressed = function() {
		MyGame.rotateRightPressed = false;
	};

	MyGame.setRotateLeftPressed = function() {
		MyGame.rotateLeftPressed = false;
	};

	MyGame.setMoveLeftPressed = function(){
		MyGame.moveLeftPressed = false;
	};

	MyGame.setMoveRightPressed = function() {
		MyGame.moveRightPressed = false;;
	};

	MyGame.inPlay = false;
	MyGame.AIReady = false;
	MyGame.AIReadyWait = false;
	MyGame.AICount = 0;
	MyGame.gameType = 0;
	MyGame.score = 0;
	MyGame.rowsCleared = 0;
	MyGame.currentLevel = 0;
	MyGame.highScoresList = [];

	MyGame.pieceArr = [];
	MyGame.activePiece = null;
	MyGame.firstPiece = true;

	MyGame.rotateRightPressed = false;
	MyGame.rotateLeftPressed = false;
	MyGame.moveLeftPressed = false;
	MyGame.moveRightPressed = false;
	MyGame.softDropPressed = false;
	MyGame.hardDropPressed = false;

	MyGame.frameUpdated = false;
	MyGame.stuffMoving = false;
	MyGame.linesCleared = false;
	MyGame.receivedInput = false;
	MyGame.gameOver = false;
	MyGame.numCols = 10;
	MyGame.numRows = 20;
	MyGame.play = false;
	MyGame.timeQuantum = 0.75;
	MyGame.emitters = [];
	MyGame.timeMod = 25 / 1000;


	MyGame.attractModeTimer = 0;

	MyGame.highScores = ["1000", "2000"];
	
	MyGame.keyboard = myKeyboard;
	//MyGame.sctx = scoreCtx;
	MyGame.context = context;
	MyGame.canvas = document.getElementById('canvas-main');
	MyGame.keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];

	MyGame.keyBeingSet = 0;
	MyGame.keys = {

					1: {key: KeyEvent.DOM_VK_SPACE, func: MyGame.hardDrop, funcUp: MyGame.setHardDropPressed},
					2: {key: KeyEvent.DOM_VK_DOWN, func: MyGame.softDrop, funcUp: MyGame.setSoftDropPressed},
					3: {key: KeyEvent.DOM_VK_Q, func: MyGame.rotateLeft, funcUp: MyGame.setRotateLeftPressed},
					4: {key: KeyEvent.DOM_VK_UP, func: MyGame.rotateRight, funcUp: MyGame.setRotateRightPressed},
					5: {key: KeyEvent.DOM_VK_LEFT, func: MyGame.moveLeft, funcUp: MyGame.setMoveLeftPressed},
					6: {key: KeyEvent.DOM_VK_RIGHT, func: MyGame.moveRight, funcUp: MyGame.setMoveRightPressed}
				   };

	MyGame.settingKey = false;

	MyGame.time = 0;

	MyGame.registerCommandKeyDown = function(key, func){
		myKeyboard.registerCommandKeyDown(key, func);
	};

	MyGame.registerCommandKeyUp = function(key, func){
		myKeyboard.registerCommandKeyUp(key, func);
	};

	MyGame.unregisterCommandKeyDown = function(key){
		myKeyboard.unregisterCommandKeyDown(key);
	};

	MyGame.unregisterCommandKeyUp = function(key){
		myKeyboard.unregisterCommandKeyUp(key);
	};



	MyGame.gameLoop = function(){
		//UPDATE TIME//
		time = new Date().getTime();
		elapsedTime = (time - prevTime) / 1000;
		prevTime = time;

		//UPDATE GAME - GET KEYBOARD INPUT AND//
		//MOVE NON-KEYBOARD DEPENDENT OBJECTS.//
		
		MyGame.updateGame(elapsedTime);
	

		//RENDER GAME//
		MyGame.render();

		if(MyGame.gameOver === false)
			requestAnimationFrame(MyGame.gameLoop);
	};

	MyGame.updateAttractTime = function(){

		aiTime = new Date().getTime();
		elapsedTime = (aiTime - aiPrevTime) / 1000;
		aiPrevTime = aiTime;

		MyGame.attractModeTimer += elapsedTime;
		//console.log(MyGame.attractModeTimer + " " );
		if(MyGame.attractModeTimer >= 5 && MyGame.inPlay === false){//10){
			MyGame.toNewGame(1);
		}
		else if(MyGame.receivedInput === false)
			requestAnimationFrame(MyGame.updateAttractTime);
	};

	MyGame.toMainMenu = function(){
		MyGame.attractModeTimer = 0;
		var time = new Date().getTime();
		requestAnimationFrame(MyGame.updateAttractTime);
		document.getElementById('newGameScreen').hidden = true;
		document.getElementById('highScoreScreen').hidden = true;
		document.getElementById('controlScreen').hidden = true;
		document.getElementById('creditScreen').hidden = true;
		document.getElementById('mainMenuScreen').hidden = false;
	};

	MyGame.toMainMenu();

	return function(){
		CanvasRenderingContext2D.prototype.clear = function() {
			this.save();
			this.setTransform(1, 0, 0, 1, 0, 0);
			this.clearRect(0, 0, MyGame.canvas.width, MyGame.canvas.height);
			this.restore();
		};
		MyGame.clear = function(){
			MyGame.context.clear();
		};
		for(var i = 1; i <= 6; i++)
		{
			MyGame.registerCommandKeyDown(MyGame.keys[i].key, MyGame.keys[i].func);
			MyGame.registerCommandKeyUp(MyGame.keys[i].key, MyGame.keys[i].funcUp);
		}
	};
}());

MyGame.sparkEmitter = function(spec){
	return new Emitter({
						count: 20,
						creationRate: 5 / 1000,
						particle: {
									myContext: spec.myContext,
									image: spec.image,
									size: {
											mean: 10,
											stdev: 2,
											max: 20,
											min: 1
									},
									lifetime: {
												mean: 500 / 1000,
												stdev: 250 / 1000,
												max: 1000 / 1000,
												min: 100 / 1000
									},
									rotation: {
												mean: 15,
												stdev: 8,
												max: 30,
												min: -15
									},
									speed: {
											mean: 3,
											stdev: .5,
											max: 5,
											min: 1
									}
						},
						angle: {
								min: 0,
								max: 360,
						},
						location: {
									x: spec.center.x,
									y: spec.center.y
						}
		});
};

MyGame.random = function(mean, stdev, max, min){
    var rand = Math.round(((Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)) * stdev + mean);
    if(rand > max)
    {
        return max;
    }
    else if(rand < min)
    {
        return min;
    }
    else
    {
        return rand;
    }
};

MyGame.updateGame = function(elapsedTime){
	var i,
		j,
		piece,
		pieceMoved;
	MyGame.keyboard.update(elapsedTime);
	MyGame.clear();
	MyGame.drawBackground();
	MyGame.stuffMoving = false;
	

	MyGame.time += elapsedTime;

	if(MyGame.time > MyGame.timeQuantum){
		MyGame.updateLevel();
		MyGame.time = 0;
		for(i = MyGame.numRows + 1; i >= 0; i--)
		{
			for(j = 0; j < MyGame.numCols; j++)
			{
				piece = MyGame.grid.getId(i, j).piece;
				if(piece > 5)
				{
					//console.log(piece);
				}
				if(piece != -1 && MyGame.pieceArr[piece].alreadyMoved === false && MyGame.pieceArr[piece].active === true)
				{
					pieceMoved = MyGame.pieceArr[piece].update(elapsedTime);
					MyGame.playSound('audio/tick');
					MyGame.pieceArr[piece].alreadyMoved = pieceMoved;
					
					if(MyGame.stuffMoving === false)
					{
						MyGame.stuffMoving = pieceMoved;
					}


	              
				}
			}

		}

		MyGame.checkMoving(elapsedTime);
		
		

		for(piece in MyGame.pieceArr)
		{
			MyGame.pieceArr[piece].alreadyMoved = false;
		}

		if(MyGame.gameType === 1 && MyGame.AIReady === true)
			MyGame.AICount += 1;

		if(MyGame.gameType === 1 && MyGame.AIReadyWait === true)
		{
			MyGame.runAI();
			MyGame.AIReady = false;
			MyGame.AIReadyWait = false;
		}
		if(MyGame.AIReady)
		{
			if(MyGame.AICount > 3){
				MyGame.AIReadyWait = true;
				MyGame.AICount = 0;
			}
		}

	}
	for(var i = 0; i < MyGame.emitters.length; i++)
	{
		if(MyGame.emitters[i].update(elapsedTime) === false)
		{
			MyGame.emitters.splice(i, 1);
			i--;
		}
	}

};

MyGame.render = function(elapsedTime){
	for(piece in MyGame.pieceArr)
	{
		MyGame.pieceArr[piece].draw();	
	}
	for(var i = 0; i < MyGame.emitters.length; i++)
    {
        MyGame.emitters[i].draw();
    }
};

MyGame.gameOverCheck = function(elapsedTime){

};

MyGame.checkMoving = function(elapsedTime){
	var fullRows,
		name,
		scoreObj;

	if(MyGame.stuffMoving === false || MyGame.firstPiece === true)
	{
		fullRows = MyGame.grid.checkFullRows();

		if(fullRows.length > 0){
			MyGame.linesCleared = true;
			MyGame.rowsCleared += fullRows.length;
		}
		else
			MyGame.linesCleared = false;
		
		
		if(MyGame.linesCleared === false){
			//
			//Check for game over
			if(MyGame.grid.checkGameOver() === true){
				name = prompt("Please enter your name", "Name");
				if(name === null)
					name = "Playa";
				else{
					scoreObj = {name: name, score: MyGame.score};
					addScore(scoreObj);
				}

				console.log("Game Over");
				MyGame.pauseSound('audio/gameLoop');
				MyGame.gameOver = true;
			}
			else{
				MyGame.activePiece = new Piece(MyGame.nextPieceId(), MyGame.getNextPieceType());
				MyGame.setNextPieceType();
				MyGame.pieceArr.push(MyGame.activePiece);
				MyGame.firstPiece = false;
				MyGame.AIReady = true;
			}
		}
		else{
			MyGame.grid.clearRow(fullRows);
			MyGame.updateScore(fullRows.length);
			MyGame.playSound('audio/clear-line')
		}

	}

};

MyGame.runAI = function(){
	var preGrid,
		prePiece,
		i,
		j,
		k,
		score,
		maxScore = -1000,
		currentMove = [],
		bestMove = [];

	//STORE OFF CURRENT STATE
	/*preGrid = MyGame.grid.getGrid();
	prePiece = MyGame.activePiece.getPiece();
	console.log("prevPiece: " + prePiece.bricks[0].getY());
	console.log("--------------------------------------------------------------------------------------");

	MyGame.printGrid(preGrid);*/

	//Do stuff
	//FOR EACH ROTATION:
	for(i = 0; i < 4; i++)
	{
		currentMove = [];

		for(j = 0; j < 10; j++)
		{

			for(k = 0; k <= i; k++)
			{
				MyGame.rotateLeft();
				MyGame.setRotateLeftPressed();
				currentMove.push(1);
			}
			for(k = 0; k <= 5; k++)
			{
				MyGame.moveRight();
				MyGame.setMoveRightPressed();
				currentMove.push(2);
			}
			for(k = 0; k < j; k++)
			{
				MyGame.moveLeft();
				MyGame.setMoveLeftPressed();
				currentMove.push(3);
			}
			MyGame.hardDrop();
			MyGame.setHardDropPressed();

			score = MyGame.grid.scoreGrid();

			if(score > maxScore)
			{
				maxScore = score;
				bestMove = currentMove.slice();
			}

			/*for(k = 0; k <= 5 + j + 1; k++)
			{
				currentMove.pop();
				currentMove.pop();
			}*/

			//MyGame.activePiece.draw();
			/*console.log("---------------------------PRE-RESTORE------------------------");
			MyGame.printGrid(MyGame.grid.getGrid());
			MyGame.grid.restoreGrid(preGrid);
			/*console.log("---------------------------POST-RESTORE------------------------");
			MyGame.printGrid(MyGame.grid.getGrid());*/
			//MyGame.activePiece.restorePieceLocation(prePiece);
			MyGame.activePiece.reset();
			for(k = 0; k < 3; k++)
				MyGame.activePiece.update(100);
		}
		//MyGame.activePiece.restorePieceRotation(prePiece);
	}
	console.log("Score: " + maxScore);

	for(i = 0; i < bestMove.length; i++)
	{
		switch(bestMove[i]){
			case 1:
				MyGame.rotateLeft();
				MyGame.setRotateLeftPressed();
				break;
			case 2:
				MyGame.moveRight();
				MyGame.setMoveRightPressed();
				break;
			case 3:
				MyGame.moveLeft();
				MyGame.setMoveLeftPressed();
				break;
		}
	}
	MyGame.hardDrop();
	MyGame.setHardDropPressed();
}

MyGame.printGrid = function(grid)
{
	var i,
		j,
		output;
	output = '';
	for(i = 0; i < grid.length; i++)
	{
		for(j = 0; j < grid[i].length; j++)
		{
			if(grid[i][j] === null)
			{
				output += ' ';
			}
			else
			{
				output += 'X';
			}
		}
		output += '\n';
	}
	console.log(output);
}

MyGame.updateLevel = function(){
	if(MyGame.rowsCleared === 10){
		MyGame.currentLevel++;
		MyGame.rowsCleared = 0;
	}
};

MyGame.updateScore = function(rowsCleared){
	showScores();
	console.log("score: " + MyGame.highScoresList.length);
	
	if(rowsCleared === 1){
		MyGame.score += 40 * (MyGame.currentLevel + 1);
	}
	else if(rowsCleared === 2){
		MyGame.score += 100 * (MyGame.currentLevel + 1);
	}
	else if(rowsCleared === 3){
		MyGame.score += 300 * (MyGame.currentLevel + 1);
	}
	else if(rowsCleared === 4){
		MyGame.score += 1200 * (MyGame.currentLevel + 1);
	}
};

MyGame.addHighScore = function(){

};

MyGame.showHighScores = function(){
	MyGame.drawHighScores();
	
};

MyGame.activePieceCanRotate = function(){
	return MyGame.activePiece.notAtTop();
};

MyGame.playSound = function(sound){
	MyGame.sounds[sound + "." + MyGame.audioExt].play();
};

MyGame.pauseSound = function(sound){
	MyGame.sounds[sound + "." + MyGame.audioExt].pause();
}

MyGame.toNewGame = function(gameType){
	MyGame.inPlay = true;
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('newGameScreen').hidden = false;
	MyGame.newGame(gameType);
	MyGame.play = true;
};

MyGame.toHighScores = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('highScoreScreen').hidden = false;

	//MyGame.drawScores();
};

MyGame.toControls = function(){
	document.getElementById('mainMenuScreen').hidden = true;
    document.getElementById('waitingScreen').hidden = true;
	document.getElementById('hardDropKey').innerHTML = MyGame.keyboardMap[MyGame.keys[1].key];
	document.getElementById('softDropKey').innerHTML = MyGame.keyboardMap[MyGame.keys[2].key];
	document.getElementById('rotateLeftKey').innerHTML = MyGame.keyboardMap[MyGame.keys[3].key];
	document.getElementById('rotateRightKey').innerHTML = MyGame.keyboardMap[MyGame.keys[4].key];
	document.getElementById('controlScreen').hidden = false;
};

MyGame.toCredits = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('creditScreen').hidden = false;
};


MyGame.setKey = function(e){
	MyGame.unregisterCommandKeyDown(MyGame.keys[MyGame.keyBeingSet].key);
	MyGame.unregisterCommandKeyUp(MyGame.keys[MyGame.keyBeingSet].key);
	MyGame.keys[MyGame.keyBeingSet].key = e.keyCode;
	MyGame.registerCommandKeyDown(MyGame.keys[MyGame.keyBeingSet].key, MyGame.keys[MyGame.keyBeingSet].func);
	MyGame.registerCommandKeyUp(MyGame.keys[MyGame.keyBeingSet].key, MyGame.keys[MyGame.keyBeingSet].funcUp);
	MyGame.settingKey = false;
	MyGame.toControls();
};

MyGame.getSetKey = function(){
	return MyGame.settingKey;
};

MyGame.readySetKey = function(keyNum, action){
	MyGame.settingKey = true;
	MyGame.keyBeingSet = keyNum;
    document.getElementById('controlScreen').hidden = true;
    document.getElementById('waitingScreenMessage').innerHTML = 'Please press the key you would like to configure for ' + action;
    document.getElementById('waitingScreen').hidden = false;
};
