	// 
	//Brick Grid
	function Grid(cols, rows) {
		var that = {},
			grid,
			i,
			j;

		grid = [];

		//Define 2D array
		for(i = 0; i < rows + 2; i++){
			if(!grid[i])
				grid[i] = [];
		}

		//Initialize to null
		for(i = 0; i < rows + 2; i++)
			for(j = 0; j < cols; j++)
				grid[i][j] = null;

		that.addBrick = function(brickID, pieceID, partID, bActive, x, y){
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);
			if(row > 21)
			{
				row = 21;
			}
			grid[row][col] = {
				brick: brickID,
				piece: pieceID,
				part: partID,
				active: bActive
			};
		};

		that.removeBrick = function(x, y) {
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);
			if(row > 21)
			{
				row = 21;
			}
			grid[row][col] = null;
		};
		
		that.getId = function(x, y) {
			if(grid[x][y] === null){
				return {
						brick: -1,
						piece: -1,
						part: -1
				};
			}
			else{
				return grid[x][y];
			}
		};

		that.getGrid = function(){
			var copy = [],
				i;
			for(i = 0; i < grid.length; i++)
			{
				copy[i] = grid[i].slice();
			}
			return copy;
		};

		that.restoreGrid = function(storedGrid){
			//console.log("------------------------------STORED GRID------------------------");
			MyGame.printGrid(storedGrid);
			//console.log("------------------------------GRID------------------------");
			MyGame.printGrid(grid);
			var i;
			grid = new Array();
			for(i = 0; i < storedGrid.length; i++)
			{
				grid[i] = storedGrid[i].slice();
			}
			//grid = storedGrid;
		};

		that.scoreGrid = function(){
			var aggregateHeight,
				i,
				j,
				highest,
				potHole,
				potHoleCount,
				prevHeight,
				fullRowsArr,
				score,
				holes,
				completeLines,
				bumpiness,
				maxHeight,
				minHeight;
			maxHeight = 0;
			minHeight = 25;
			score = 0;
			aggregateHeight = 0;
			completeLines = 0;
			holes = 0;
			bumpiness = 0;
			for(i = 0; i < cols; i++)
			{
				highest = 0;
				potHoleCount = 0;
				potHole = false;
				for(j = rows + 1; j >= 0; j--)
				{
					if(grid[j][i] != null)
					{
						highest = (rows + 2) - j;
						if(potHole === true)
						{
							holes += potHoleCount;
							potHole = false;
						}
					}
					else
					{
						potHole = true;
						potHoleCount++;
					}
				}
				if(highest > maxHeight)
				{
					maxHeight = highest;
				}
				if(highest < minHeight)
				{
					minHeight = highest;
				}
				//aggregateHeight += highest;
				if(i != 0)
				{
					bumpiness += Math.abs(prevHeight - highest);
				}
				prevHeight = highest;
			}
			fullRowsArr = that.checkFullRows();
			completeLines = 100 * fullRowsArr.length;
			aggregateHeight = maxHeight - minHeight;

			score += -5.94077 * aggregateHeight;
			score += completeLines;
			score += -10.96544 * holes;
			score += -1.66569 * bumpiness;


			MyGame.printGrid(grid);
			//console.log('AH: ' + aggregateHeight + ', Lines: ' + completeLines + ', Holes: ' + holes + ', Bump: ' + bumpiness);
			//console.log('Score: ' + score);
			return score;
		};
		
		that.checkBrick = function(x, y) {
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);

			if(col < 0 || row > MyGame.numRows + 1 || col > MyGame.numCols - 1)
				return -1;
			else {
				return grid[row][col];
			}
		};

		that.checkFullRows = function() {
			var fullRow = true,
				fullRows = [];

			for(i = rows + 1; i >= 0; i--){
				fullRow = true;
				for(j = cols; j >= 0; j--){
					if(grid[i][j] === null){
						fullRow = false;
						break;
					}
				}
				if(fullRow === true)
					fullRows.push(i);
			}

			return fullRows;

		};


		that.clearRow = function(list) {
			var i,
				brickId, pieceId,
				rowY,
				hashArray = {};
			for(i = 0; i < list.length; i++){
				//rowY = MyGame.startLocation + (list[i] * MyGame.cellWidth);
				//MyGame.score++;
				for(j = 0; j < MyGame.numCols; j++){
					brickId = that.getId(list[i], j).brick;
					pieceId = that.getId(list[i], j).piece;
					if(pieceId in hashArray){
						hashArray[pieceId].push(brickId);
					}
					else{
						hashArray[pieceId] = [];
						hashArray[pieceId].push(brickId);
					}
				}
			}
			for(var piece in hashArray)
			{
				MyGame.pieceArr[piece].clearBricks(hashArray[piece]);
			}
		};
		



		that.checkGameOver = function() {	
			var gameOver = false;
			for(i = 0; i < 2; i++){
				for(j = 0; j < cols; j++){
					if(grid[i][j] !== null){
						gameOver = true;
						break;
					}
				}
			}
			return gameOver;

		};

	
		return that;
		

	}

	//Piece of Piece Template
	/*function PieceOfPiece(id, bricks){
		var that = {},
			i;
		for(i = 0; i < bricks.length; i++)
		{
			bricks[i].setId(id, i + 1);
		}
		that.active = true;
		that.alreadyMoved = false;
		that.update = function(elapsedTime){
			if(canMove() === true){
				for(i = 0; i < bricks.length; i++){
					if(bricks[i].active)
					{
						bricks[i].update(elapsedTime);
					}
				}

				for(i = 0; i < bricks.length; i++){
					if(bricks[i].active)
					{
						//console.log('PieceOfPiece AddToGrid');
						bricks[i].addToGrid();
					}
				}
				return true;
			}
			else
			{
				return false;
			}
		}
		
		function canMove(){
			var canMove = true;
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].active === true)
				{
					if(bricks[i].canMove() === false){
						canMove = false;
						break;
					}
				}
			}
			return canMove;
		}
		
		that.draw = function() {
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].active === true)
				{
					bricks[i].draw();
				}
			}
		};
		
		that.clearBricks = function(bricksToClear) {
			for(var brick in bricksToClear)
			{
				MyGame.emitters.push(new MyGame.sparkEmitter({
																image: bricks[bricksToClear[brick] - 1].getImage(),
																myContext: MyGame.context,
																center: {
																			x: bricks[bricksToClear[brick] - 1].getCoordinates().x + MyGame.cellWidth / 2,
																			y: bricks[bricksToClear[brick] - 1].getCoordinates().y + MyGame.cellWidth / 2
																}
														}));
				bricks[bricksToClear[brick] - 1].active = false;
				bricks[bricksToClear[brick] - 1].removeFromGrid();
			}
		};
		
		return that;
	}*/
	//
	//Piece Template
	function Piece(id, type) {
		var that = {},
			i = 1,
			bricks = [],
			time = 0;
			//type = 4;
			images = ['yellowBrick', 'blueBrick', 'purpleBrick', 'pinkBrick', 'greyBrick', 'greenBrick', 'redBrick'],
			imageType = type % 7,
			imageName = 'images/' + images[imageType] + 'Plain.jpg';

		that.alreadyMoved = false;
		that.orientation = 1;
		that.active = true;

		


		//Fill Bricks array
		for(i = 0; i < 4; i++){
			bricks[i] = new Brick({
				image: MyGame.images[imageName],
				position: {
					x: 0,
					y: 0 },
				width: MyGame.cellWidth,
				height: MyGame.cellWidth,
				brickID: i + 1,
				pieceID: id
			});
		}

		that.setStartLocation = function(){
			//Set Piece Shape
			if(type === 1) {
				I_Piece();
			}
			else if(type === 2) {
				J_Piece();
			}
			else if(type === 3) {
				L_Piece();
			}
			else if(type === 4) {
				O_Piece();
			}
			else if(type === 5) {
				S_Piece();
			}
			else if(type === 6) {
				Z_Piece();
			}
			else if(type === 7) {
				T_Piece();
			}
		}


		//Initial call to setStartLocation
		that.setStartLocation();

		that.rotate = function(elapsedTime, direction) {
			
			if(MyGame.activePieceCanRotate() === true){
				if(type === 1)
					rotate_I();
				else if(type === 2)
					rotate_J(direction);
				else if(type === 3)
					rotate_L(direction);
				else if(type === 5)
					rotate_S(direction);
				else if(type === 6)
					rotate_Z(direction);
				else if(type === 7)
					rotate_T(direction);
			}
		};


		that.moveLeft = function() {
			var x, y,
				canMove = true;

			for(i = 0; i < 4; i++){
				if(bricks[i].getX() <= MyGame.bucketLeft || bricks[i].canMoveLeft() === false){
					canMove = false;
					break;
				}
			}

			if(canMove === true){
				for(i = 0; i < 4; i++){
					x = bricks[i].getX() - MyGame.cellWidth;
					y = bricks[i].getY();
					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}
			}
		};

		that.moveRight = function() {
			var x, y,
				canMove = true;

			for(i = 0; i < 4; i++){
				if(bricks[i].getX() >= MyGame.bucketRight - MyGame.cellWidth || bricks[i].canMoveRight() === false){
					canMove = false;
					break;
				}
			}

			if(canMove === true){
				for(i = 0; i < 4; i++){
					x = bricks[i].getX() + MyGame.cellWidth;
					y = bricks[i].getY();
					bricks[i].removeFromGrid()
					bricks[i].setPosition(x, y);
				}
			}	
		};

		that.reset = function(){
			for(i = 0; i < 4; i++){
					bricks[i].removeFromGrid()
				}
			that.setStartLocation();
			that.orientation = 1;
		};

		that.hardDrop = function(elapsedTime) {
			while(canMovePiece() === true){
				that.update(elapsedTime);
			}
		};

		that.softDrop = function(elapsedTime) {
			if(canMovePiece() === true){
				for(i = 0; i < bricks.length; i++){
					bricks[i].update(elapsedTime);
				}

				for(i = 0; i < bricks.length; i++){
					//console.log('softDrop AddToGrid');
					bricks[i].addToGrid();
				}
				MyGame.playSound('audio/soft-drop');
				MyGame.score++;
				return true;
			}
			else {
				return false;
			}
		};

		that.getPiece = function(){
			var copy = [],
				i;
			copy = JSON.parse(JSON.stringify(bricks));
			return {
						bricks: copy,
						orientation: that.orientation
			};
		};

		that.restorePieceLocation = function(info){
			
			//console.log(info.bricks[0].getY());
			bricks = info.bricks.slice();
			//console.log(info.bricks[0].getY());
		};

		that.restorePieceRotation = function(info){
			that.orientation = info.orientation;
		};

		that.clearBricks = function(bricksToClear) {
			for(var brick in bricksToClear)
			{
				MyGame.emitters.push(new MyGame.sparkEmitter({
																image: bricks[bricksToClear[brick] - 1].getImage(),
																myContext: MyGame.context,
																center: {
																			x: bricks[bricksToClear[brick] - 1].getCoordinates().x + MyGame.cellWidth / 2,
																			y: bricks[bricksToClear[brick] - 1].getCoordinates().y + MyGame.cellWidth / 2
																}
														}));
				bricks[bricksToClear[brick] - 1].active = false;
				bricks[bricksToClear[brick] - 1].removeFromGrid();
			}
			var state = 0;
			for(var i = 0; i < 4; i++)
			{
				if(state === 0)
				{
					if(bricks[i].active === true)
					{
						state++;
					}
				}
				else if(state === 1)
				{
					if(bricks[i].active === false)
					{
						state++;
					}
				}
				else if(state === 2)
				{
					if(bricks[i].active === true)
					{
						state++;
					}
				}
			}
			if(state === 3)
			{
				//console.log("SPLIT THE PIECE!");
				var tempArray = [];
				var partID = 0;
				for(i = 0; i < 4; i++)
				{
					if(bricks[i].active === true)
					{
						bricks[i].setPartID(partID);
						/*OLD CODE
						tempArray.push(i);
						*/
					}
					else if(bricks[i].active === false)
					{
						bricks[i].setPartID(partID++);
						/* OLD CODE
						if(tempArray.length > 0)
						{
							MyGame.pieceArr.push(new PieceOfPiece(MyGame.nextPieceId(), tempArray));
							tempArray = [];
						}
						*/
					}
				}
				/*OLD CODE
				if(tempArray.length > 0)
				{
					MyGame.pieceArr.push(new PieceOfPiece(MyGame.nextPieceId(), tempArray));
				}
				MyGame.pieceArr[id].active = false;
				*/
			}
			else
			{
				var goneCount = 0;
				for(i = 0; i < 4; i++)
				{
					if(bricks[i].active === false)
					{
						goneCount++;
					}
				}
				if(goneCount === 4)
				{
					MyGame.pieceArr[id].active = false;
				}
			}
		};

		that.inPlace = function() {
			//return atBottom();
			return false;
		};

		that.getBricks = function() {
			return bricks;
		};

		that.update = function(elapsedTime) {
			var somethingMoved = false;
			for(var m = 0; m < bricks.length; m++)
			{
				if(that.active === true && canMove(m) === true){
					for(i = 0; i < bricks.length; i++){
						if(bricks[i].active && bricks[i].partID === m)
						{
							bricks[i].update(elapsedTime);
						}
					}

					somethingMoved = true;
				}
				for(i = 0; i < bricks.length; i++){
					if(bricks[i].active)
					{
						bricks[i].addToGrid();
					}
				}
			}
			return somethingMoved;

			//MyGame.checkMoving(elapsedTime)
		};

		that.draw = function() {
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].active === true)
				{
					bricks[i].draw();
				}
			}
		};

		that.notAtTop = function() {
			var canRotate = true;
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].getY() < MyGame.startLocation + MyGame.cellWidth * 2){
					canRotate = false;
					break;
				}
			}
			return canRotate;
		}

 
		function canMove(partGroup) {
			var canMove = true,
				groupExists = false,
				i;
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].active === true && bricks[i].partID === partGroup)
				{
					groupExists = true;
					if(bricks[i].canMove() === false){
						canMove = false;
						break;
					}
				}
			}
			if(groupExists === false)
			{
				return false;
			}
			else if(groupExists === true)
			{
				return canMove;
			}
		}

		function canMovePiece() {
			var canMove = true,
				i;
			for(i = 0; i < bricks.length; i++)
			{
				if(bricks[i].active === true)
				{
					if(bricks[i].canMove() === false)
					{
						canMove = false;
						break;
					}
				}
			}
			return canMove;
		}

		function updateOrientation(direction){
			if(direction === 'R'){
				that.orientation++;

				if((type < 5  || type === 7) && that.orientation > 4)
					that.orientation = 1;
				else if(type >= 5 && type < 7 && that.orientation > 2)
					that.orientation = 1;
			}

			else if(direction === 'L'){
				that.orientation--;
				if((type < 5  || type === 7) && that.orientation < 1)
					that.orientation = 4;
				else if(type >= 5 && type < 7 && that.orientation < 1)
					that.orientation = 2;
			}
			
			

			//console.log("orientation: " + that.orientation);
		}


		//*********************************
		//    Piece Shape Templates
		//
		//*********************************
		function I_Piece() {
			var x, y;
			
			for(i = 0; i < 4; i++) {
				x = MyGame.bucketLeft + (MyGame.cellWidth * (3 + (i)));
				y = MyGame.startLocation;
				bricks[i].setPosition(x, y);
			}

		}

		function J_Piece() {
			var x, y;

			x = MyGame.bucketLeft + (MyGame.cellWidth * 5);
			y = MyGame.startLocation + MyGame.cellWidth;
			bricks[3].setPosition(x, y);
			
			for(i = 0; i < 3; i++) {
				x = MyGame.bucketLeft + (MyGame.cellWidth * (3 + i));
				y = MyGame.startLocation;
				bricks[i].setPosition(x, y);
			}
		}

		function L_Piece() {
			var x, y;

			x = MyGame.bucketLeft + (MyGame.cellWidth * (3));
			y = MyGame.startLocation + MyGame.cellWidth;
			bricks[3].setPosition(x, y);

			for(i = 0; i < 3; i++) {
				x = MyGame.bucketLeft + (MyGame.cellWidth * (5 - i));
				y = MyGame.startLocation;
				bricks[i].setPosition(x, y);
			}
		}

		function O_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 4));
					y = MyGame.startLocation;
				}
				else if(i >= 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 2));
					y = MyGame.startLocation + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function S_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (5 - i));
					y = MyGame.startLocation;
				}
				else if(i >= 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (6 - i));
					y = MyGame.startLocation + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function Z_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 4));
					y = MyGame.startLocation;
				}
				else if(i >= 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 3));
					y = MyGame.startLocation + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function T_Piece() {
			var x, y;

			for(i = 0; i < 2; i++){
				x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 3));
				y = MyGame.startLocation + MyGame.cellWidth;
				bricks[i].setPosition(x, y);
			}
			x = MyGame.bucketLeft + (MyGame.cellWidth * 4);
			y = MyGame.startLocation;
			bricks[2].setPosition(x, y);
			
			x = MyGame.bucketLeft + (MyGame.cellWidth * (5));
			y = MyGame.startLocation + MyGame.cellWidth;
			bricks[3].setPosition(x, y);
		}


		/********************************
		/  Piece rotation functions
		/********************************/

		function rotate_I() {
			var x,y,
				canMove = true,
				piece,
				col = bricks[1].getX(),
				row = bricks[1].getY();


			if(that.orientation === 1){
				//Check for valid rotation
				for(i = 0; i < 4; i++){
					x = col;
					if(i === 0)
						y = row - MyGame.cellWidth;
					else if(i === 1)
						y = row;
					else
						y = row + MyGame.cellWidth * (i - 1);

					newBrick = MyGame.grid.checkBrick(x, y);
					
					//console.log(newBrick !== -1 + " " + newBrick !== null + " " + newBrick !== -1 ? newBrick.getId.piece : 0);
					if(i !== 1 && newBrick !== -1 && newBrick !== null && newBrick.piece !== bricks[i].getId().piece){
						canMove = false;
						break;
					}
					//console.log("brick: " + i + " check: " + newBrick);
				}
				
				//Move
				if(canMove === true){
					for(i = 0; i < 4; i++){
						x = col;
						if(i === 0)
							y = row - MyGame.cellWidth;
						else if(i === 1)
							y = row;
						else
							y = row + MyGame.cellWidth * (i - 1);

						bricks[i].removeFromGrid();
						bricks[i].setPosition(x, y);
					}
				}
				that.orientation = 2;
			}
			else if(that.orientation === 2){
				//Check for valid rotation
				for(i = 0; i < 4; i++){
					y = row;
					if(i === 0)
						x = col - MyGame.cellWidth;
					else if(i === 1)
						x = col;
					else
						y = col + MyGame.cellWidth * (i - 1);


					newBrick = MyGame.grid.checkBrick(x, y);
					
					if(i !== 1){
						if(newBrick === -1 || (newBrick !== null && newBrick.piece !== bricks[i].getId().piece)){
							canMove = false;
							break;
						}
					}
					//console.log("brick: " + i + " check: " + newBrick + " can: " + canMove);
				}

				//Move
				if(canMove === true){
					for(i = 0; i < 4; i++){
						y = row;
						if(i === 0)
							x = col - MyGame.cellWidth;
						else if(i === 1)
							x = col;
						else
							x = col + MyGame.cellWidth * (i - 1);

						bricks[i].removeFromGrid();
						bricks[i].setPosition(x, y);
					}
					that.orientation = 1;
				}

			}

		}

		function rotate_J(direction){
			var x,y,
				canMove = true,
				piece;
				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					//Check if valid
				}

				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();
					
					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else if(i === 3){
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}
					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}

				updateOrientation(direction);

			


			function brick1(x, y){
				var col, row;
				if(direction === 'R'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{ //2 -
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
				if(direction === 'R'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth * 2;
						row = y
					}
					else if(that.orientation === 2){
						col = x;
						row = y - MyGame.cellWidth * 2;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth * 2;
						row = y;
					}
					else{
						col = x;
						row = y + MyGame.cellWidth * 2;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x;
						row = y - MyGame.cellWidth * 2;
					}
					else if(that.orientation === 4){
						col = x - MyGame.cellWidth * 2;
						row = y;
					}
					else if(that.orientation === 3){
						col = x;
						row = y + MyGame.cellWidth * 2;
					}
					else{
						col = x + MyGame.cellWidth * 2;
						row = y;
					}
				}

				return {x: col, y: row};
			}
		}

		function rotate_L(direction){
			var x,y,
				canMove = true,
				piece;
				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					//Check if valid
				}
				

				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else if(i === 3){
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}

				updateOrientation(direction);

			


			function brick1(x, y){
				var col, row;
				if(direction === 'R'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x;
						row = y - MyGame.cellWidth * 2;
					}
					else if(that.orientation === 2){
						col = x + MyGame.cellWidth * 2;
						row = y; 
					}
					else if(that.orientation === 3){
						col = x;
						row = y + MyGame.cellWidth * 2;
					}
					else{
						col = x - MyGame.cellWidth * 2;
						row = y;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth * 2;
						row = y;
					}
					else if(that.orientation === 4){
						col = x;
						row = y - MyGame.cellWidth * 2; 
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth * 2;
						row = y;
					}
					else{
						col = x;
						row = y + MyGame.cellWidth * 2;
					}
				}

				return {x: col, y: row};
			}
		}

		function rotate_S(direction){
			var x,y,
				canMove = true,
				piece;
				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					//Check if valid
				}
				

				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else if(i === 3){
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}

				updateOrientation(direction);


			function brick1(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x - MyGame.cellWidth * 2;
					row = y - MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x + MyGame.cellWidth * 2;
					row = y + MyGame.cellWidth;
				}
				
				return {x: col, y: row};
			}

			function brick2(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x - MyGame.cellWidth;
					row = y;
				}
				else if(that.orientation === 2){
					col = x + MyGame.cellWidth;
					row = y;
				}

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x;
					row = y - MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x;
					row = y + MyGame.cellWidth;
				}

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x + MyGame.cellWidth;
					row = y;
				}
				else if(that.orientation === 2){
					col = x - MyGame.cellWidth;
					row = y; 
				}

				return {x: col, y: row};
			}
		}

		function rotate_Z(direction){
			var x,y,
				canMove = true,
				piece;
				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					//Check if valid
				}
				

				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 2){
						x = brick3(x, y).x;
						y = brick3(x, y).y;
					}
					else if(i === 3){
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}

				updateOrientation(direction);


			function brick1(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x + MyGame.cellWidth * 2;
					row = y - MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x - MyGame.cellWidth * 2;
					row = y + MyGame.cellWidth;
				}
				
				return {x: col, y: row};
			}

			function brick2(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x + MyGame.cellWidth;
					row = y;
				}
				else if(that.orientation === 2){
					col = x - MyGame.cellWidth;
					row = y;
				}

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x;
					row = y - MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x;
					row = y + MyGame.cellWidth;
				}

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x - MyGame.cellWidth;
					row = y;
				}
				else if(that.orientation === 2){
					col = x + MyGame.cellWidth;
					row = y; 
				}

				return {x: col, y: row};
			}
		}

		function rotate_T(direction){
			var x,y,
				canMove = true,
				piece;
				
				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();

					if(i === 0){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 2){
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					//Check if valid
				}
				

				for(i = 0; i < 4; i++){
					x = bricks[i].getX();
					y = bricks[i].getY();
					
					if(i === 0){
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 2){
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = x;
						y = y;
					}
					else{
						x = brick4(x, y).x;
						y = brick4(x, y).y;
					}

					bricks[i].removeFromGrid();
					bricks[i].setPosition(x, y);
				}

				updateOrientation(direction);

			


			function brick1(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick2(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 3){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;

				if(direction === 'R'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else if(that.orientation === 2){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth; 
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
				}

				else if(direction === 'L'){
					if(that.orientation === 1){
						col = x - MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
					else if(that.orientation === 4){
						col = x - MyGame.cellWidth;
						row = y + MyGame.cellWidth; 
					}
					else if(that.orientation === 3){
						col = x + MyGame.cellWidth;
						row = y + MyGame.cellWidth;
					}
					else{
						col = x + MyGame.cellWidth;
						row = y - MyGame.cellWidth;
					}
				}

				return {x: col, y: row};
			}
		}


		return that;

	}

	//
	//Brick Template
	function Brick(spec) {
		var that = {};

		that.getX = function() {
			return spec.position.x;
		};

		that.getY = function() {
			return spec.position.y;
		};
		
		that.canMove = function() {
			var below = MyGame.grid.checkBrick(spec.position.x, spec.position.y + MyGame.cellWidth);
			if(below != null)
			{
				if(below.active === false)
				{
					return false;
				}
				else if(below === -1)
				{
					//Looking past bottom
					return false;
				}
				else if(below.piece != spec.pieceID)
				{
					//Different piece below
					return false;
				}
				else
				{
					//Same piece below
					if(below.part != that.partID)
					{
						return false;
					}
					else
					{
						return true;
					}
				}
			}
			else
			{
				return true;
			}
		};

		that.canMoveLeft = function() {
			var left = MyGame.grid.checkBrick(spec.position.x - MyGame.cellWidth, spec.position.y);
			if(left != null)
			{
				if(left.active === false)
				{
					return false;
				}
				else if(left === -1)
				{
					//Looking past border
					return false;
				}
				else if(left.piece != spec.pieceID)
				{
					//Different piece left
					return false;
				}
				else
				{
					//Same piece left
					if(left.part != that.partID)
					{
						return false;
					}
					else
					{
						return true;
					}
				}
			}
			else
			{
				return true;
			}
		};

		that.getImage = function()
		{
			return spec.image;
		}

		that.canMoveRight = function() {
			var right = MyGame.grid.checkBrick(spec.position.x + MyGame.cellWidth, spec.position.y);
			if(right != null)
			{
				if(right.active === false)
				{
					return false;
				}
				else if(right === -1)
				{
					//Looking past border
					return false;
				}
				else if(right.piece != spec.pieceID)
				{
					//Different piece right
					return false;
				}
				else
				{
					//Same piece right
					if(right.part != that.partID)
					{
						return false;
					}
					else
					{
						return true;
					}
				}
			}
			else
			{
				return true;
			}
		};

		that.setPosition = function(x, y) {
			spec.position.x = x;
			spec.position.y = y;
			//console.log('Brick SetPosition');
            MyGame.grid.addBrick(spec.brickID, spec.pieceID, that.partID, that.active, x, y);
		};
		
		that.getId = function() {
			return {
				piece: spec.pieceID,
				brick: spec.brickID,
				part: that.partID
			};
		};
		
		that.setId = function(newPieceId, newId){
			spec.pieceID = newPieceId;
			spec.brickID = newId;
			//console.log('Brick SetPieceId');
            MyGame.grid.addBrick(spec.brickID, spec.pieceID, that.partID, that.active, spec.position.x, spec.position.y);
		};

		that.getCoordinates = function() {
			return {x: spec.position.x, y: spec.position.y};
		};

		that.update = function(elapsedTime) {
			MyGame.grid.removeBrick(spec.position.x, spec.position.y);
			spec.position.y += MyGame.cellWidth;
		};

		that.addToGrid = function() {
			//console.log('Brick AddToGrid');
			 MyGame.grid.addBrick(spec.brickID, spec.pieceID, that.partID, that.active, spec.position.x, spec.position.y);
		};

		that.removeFromGrid = function() {
			MyGame.grid.removeBrick(spec.position.x, spec.position.y);
		};

		that.setPartID = function(newID)
		{
			that.partID = newID;
		}
		
		that.active = true;
		that.partID = 0;

		that.draw = function() {
			MyGame.context.save();
			
			MyGame.context.drawImage(
				spec.image,
				spec.position.x,
				spec.position.y,
				spec.width, spec.height);

			MyGame.context.restore();
		};
		return that;
	}
