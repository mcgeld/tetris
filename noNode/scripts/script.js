MyGame.initialize = (function initialize(){

	MyGame.hardDrop = function(elapsedTime){
		MyGame.context.fillStyle = 'red';
		MyGame.context.fillRect(0, 0, MyGame.context.canvas.width, MyGame.context.canvas.height);
	};
	
	MyGame.softDrop = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.softDropPressed === false){
			MyGame.activePiece.softDrop(elapsedTime);
			MyGame.rotatePressed = true;
		}
	};
	
	MyGame.rotateLeft = function(elapsedTime){
		MyGame.context.fillStyle = 'yellow';
		MyGame.context.fillRect(0, 0, MyGame.context.canvas.width, MyGame.context.canvas.height);
	};
	
	MyGame.rotate = function(elapsedTime){
		if(MyGame.activePiece != null && MyGame.rotatePressed === false){
			MyGame.activePiece.rotate(elapsedTime);
			MyGame.rotatePressed = true;
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
		time = new Date().getTime(),
		prevTime = time,
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

	MyGame.setRotatePressed = function() {
		MyGame.rotatePressed = false;
	};

	MyGame.setMoveLeftPressed = function(){
		MyGame.moveLeftPressed = false;
	};

	MyGame.setMoveRightPressed = function() {
		MyGame.moveRightPressed = false;;
	};

	MyGame.score = 0;
	MyGame.pieceArr = [];
	MyGame.activePiece = null;
	MyGame.firstPiece = true;
	MyGame.rotatePressed = false;
	MyGame.moveLeftPressed = false;
	MyGame.moveRightPressed = false;
	MyGame.softDropPressed = false;
	MyGame.frameUpdated = false;
	MyGame.stuffMoving = false;
	MyGame.linesCleared = false;
	MyGame.numCols = 10;
	MyGame.numRows = 20;
	MyGame.play = false;
	MyGame.timeQuantum = 1;
	MyGame.keyboard = myKeyboard;
	MyGame.context = context;
	MyGame.canvas = document.getElementById('canvas-main');
	MyGame.keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];

	MyGame.keyBeingSet = 0;
	MyGame.keys = {
					1: {key: KeyEvent.DOM_VK_UP, func: MyGame.rotate, funcUp: MyGame.setRotatePressed},
					2: {key: KeyEvent.DOM_VK_DOWN, func: MyGame.softDrop, funcUp: MyGame.setSoftDropPressed},
					3: {key: KeyEvent.DOM_VK_LEFT, func: MyGame.moveLeft, funcUp: MyGame.setMoveLeftPressed},
					4: {key: KeyEvent.DOM_VK_RIGHT, func: MyGame.moveRight, funcUp: MyGame.setMoveRightPressed}
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
		requestAnimationFrame(MyGame.gameLoop);
	};


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
		for(var i = 1; i <= 4; i++)
		{
			MyGame.registerCommandKeyDown(MyGame.keys[i].key, MyGame.keys[i].func);
			MyGame.registerCommandKeyUp(MyGame.keys[i].key, MyGame.keys[i].funcUp);
		}
	};
}());


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
		MyGame.time = 0;
		for(i = MyGame.numRows + 1; i >= 0; i--)
		{
			for(j = 0; j < MyGame.numCols; j++)
			{
				piece = MyGame.grid.getId(i, j).piece;
				if(piece > 5)
				{
					console.log(piece);
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
	                //prevPiece = piece;
				}
			}
		}

			
		MyGame.checkMoving(elapsedTime);
		
		for(piece in MyGame.pieceArr)
		{
			MyGame.pieceArr[piece].alreadyMoved = false;
		}
	}

};

MyGame.render = function(elapsedTime){
	for(piece in MyGame.pieceArr)
	{
		MyGame.pieceArr[piece].draw();	
	}
};

MyGame.checkMoving = function(elapsedTime){
	var fullRows;
	if(MyGame.stuffMoving === false || MyGame.firstPiece === true)
	{
		fullRows = MyGame.grid.checkFullRows();

		if(fullRows.length > 0)
			MyGame.linesCleared = true;
		else
			MyGame.linesCleared = false;
		
		console.log(MyGame.linesCleared + " " + fullRows.length);
		if(MyGame.linesCleared === false){
			MyGame.activePiece = new Piece(MyGame.nextPieceId(), MyGame.getNextPieceType());
			MyGame.setNextPieceType();
			MyGame.pieceArr.push(MyGame.activePiece);
			MyGame.firstPiece = false;
		}
		else{
			MyGame.grid.clearRow(fullRows);
			//MyGame.player('audio/clear_line')
		}
	}
};

MyGame.playSound = function(sound){
	console.log("in play");
	MyGame.sounds[sound + "." + MyGame.audioExt].play();
};

MyGame.toNewGame = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('newGameScreen').hidden = false;
	MyGame.newGame();
	MyGame.play = true;
};

MyGame.toHighScores = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('highScoreScreen').hidden = false;
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

MyGame.toMainMenu = function(){
	document.getElementById('newGameScreen').hidden = true;
	document.getElementById('highScoreScreen').hidden = true;
	document.getElementById('controlScreen').hidden = true;
	document.getElementById('creditScreen').hidden = true;
	document.getElementById('mainMenuScreen').hidden = false;
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
