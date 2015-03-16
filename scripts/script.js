MyGame.initialize = (function initialize(){
	return function(){
		CanvasRenderingContext2D.prototype.clear = function() {
			this.save();
			this.setTransform(1, 0, 0, 1, 0, 0);
			this.clearRect(0, 0, canvas.width, canvas.height);
			this.restore();
		};
		MyGame.clear = function(){
			context.clear();
			context2.clear();
		};
		/*myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_UP, MYGAME.accelerate);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_W, MYGAME.accelerate);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_DOWN, MYGAME.decelerate);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_S, MYGAME.decelerate);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_LEFT, MYGAME.turnLeft);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_A, MYGAME.turnLeft);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_RIGHT, MYGAME.turnRight);
		myKeyboard.registerCommandKeyDown(KeyEvent.DOM_VK_D, MYGAME.turnRight);
        myKeyboard.registerCommandKeyUp(KeyEvent.DOM_VK_DOWN, MYGAME.brakesOff);
        myKeyboard.registerCommandKeyUp(KeyEvent.DOM_VK_S, MYGAME.brakesOff);
		requestAnimationFrame(menu);*/
	};
}());

MyGame.toNewGame = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('newGameScreen').hidden = false;
}

MyGame.toHighScores = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('highScoreScreen').hidden = false;
}

MyGame.toControls = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('controlScreen').hidden = false;
}

MyGame.toCredits = function(){
	document.getElementById('mainMenuScreen').hidden = true;
	document.getElementById('creditScreen').hidden = false;
}

MyGame.toMainMenu = function(){
	document.getElementById('newGameScreen').hidden = true;
	document.getElementById('highScoreScreen').hidden = true;
	document.getElementById('controlScreen').hidden = true;
	document.getElementById('creditScreen').hidden = true;
	document.getElementById('mainMenuScreen').hidden = false;
}