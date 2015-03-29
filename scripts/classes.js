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

		that.addBrick = function(brickID, pieceID, x, y){
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);

			grid[row][col] = {
				brick: brickID,
				piece: pieceID
			};
		};

		that.removeBrick = function(x, y) {
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);

			grid[row][col] = null;
		};
		
		that.getId = function(x, y) {
			if(grid[x][y] === null){
				return {
						brick: -1,
						piece: -1
				};
			}
			else{
				return grid[x][y];
			}
		};
		
		that.checkBrick = function(x, y) {
			var col = Math.floor((x - MyGame.bucketLeft) / MyGame.cellWidth),
				row = Math.floor((y - MyGame.startLocation) / MyGame.cellWidth);

			if(row > MyGame.numRows + 1 || col < 0 || col > MyGame.numCols - 1)
				return -1;

			return grid[row][col];
		};
		
		return that;

	}

	//
	//Piece Template
	function Piece(id, type) {
		var that = {},
			i = 1,
			bricks = [],
			time = 0;
			//type = Math.floor(Math.random() * 7 + 1),
			//type = 1,
			images = ['yellowBrick', 'blueBrick', 'purpleBrick', 'pinkBrick', 'greyBrick', 'greenBrick', 'redBrick'],
			imageType = type % 7,
			imageName = 'images/' + images[imageType] + 'Plain.jpg';

			//if(type === 3 || type === 2)
			//	type = 7;
		console.log("Type: " + type);
		that.alreadyMoved = false;
		that.orientation = 1;


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

		that.rotate = function(elapsedTime) {

			if(type === 1)
				rotate_I();
			else if(type === 2)
				rotate_J();
			else if(type === 3)
				rotate_L();
			else if(type === 5)
				rotate_S();
			else if(type === 6)
				rotate_Z();
			else if(type === 7)
				rotate_T();
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

		that.hardDrop = function() {

		};

		that.softDrop = function() {

		};


		that.clearBricks = function() {

		};

		that.inPlace = function() {
			//return atBottom();
			return false;
		};

		that.getBricks = function() {
			return bricks;
		};

		that.update = function(elapsedTime) {
			time += elapsedTime;
			if(time > 1 && canMove() === true){
				time = 0;
				for(i = 0; i < bricks.length; i++){
					bricks[i].update(elapsedTime);
				}

				for(i = 0; i < bricks.length; i++){
					bricks[i].addToGrid();
				}
				return true;
			}
			else
			{
				return false;
			}
		};

		that.draw = function() {
			for(i = 0; i < bricks.length; i++){
				bricks[i].draw();
			}
		};
/*
		function atBottom() {
			var atBottom = true;
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].canMove() === false || bricks[i].canMoveLeft() === false || bricks[i].canMoveRight() === false){
					canMove = false;
					break;
				}
			}
		}


*/

		function canMove() {
			var canMove = true;
			for(i = 0; i < bricks.length; i++){
				if(bricks[i].canMove() === false){
					canMove = false;
					break;
				}
			}
			return canMove;
		}

		function updateOrientation(){
			that.orientation++;
			console.log("type: " + type + " " + that.orientation);
			if(type < 5  || type === 7 && that.orientation > 4)
				that.orientation = 1;
			else if(type >= 5 && type < 7 && that.orientation > 2)
				that.orientation = 1;
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

			x = MyGame.bucketLeft + (MyGame.cellWidth * 4);
			y = MyGame.startLocation;
			bricks[0].setPosition(x, y);

			for(i = 1; i < 4; i++){
				x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 2));
				y = MyGame.startLocation + MyGame.cellWidth;
				bricks[i].setPosition(x, y);
			}
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


			// TODO: Figure out timing for rotate button.

			if(that.orientation === 1){
				for(i = 0; i < 4; i++){
					x = col;
					if(i === 0)
						y = row - MyGame.cellWidth;
					else if(i === 1)
						y = row;
					else
						y = row + MyGame.cellWidth * (i - 1);

					piece = MyGame.grid.checkBrick(x, y);
					//if(piece !== -1 && (piece !== null && piece.piece !==))
				
					
				}
				
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
				for(i = 0; i < 4; i++){
					y = row;
					if(i === 0)
						x = col - MyGame.cellWidth;
					else if(i === 1)
						x = col;
					else
						y = col + MyGame.cellWidth * (i - 1);

					//Check
				}

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

		function rotate_J(){
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

				updateOrientation();

			


			function brick1(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
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

				return {x: col, y: row};
			}
		}

		function rotate_L(){
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

				updateOrientation();

			


			function brick1(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick3(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
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

				return {x: col, y: row};
			}
		}

		function rotate_S(){
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

				updateOrientation();


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

		function rotate_Z(){
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

				updateOrientation();


			function brick1(x, y){
				var col, row;
				if(that.orientation === 1){
					col = x + MyGame.cellWidth * 2;
					row = y + MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x - MyGame.cellWidth * 2;
					row = y - MyGame.cellWidth;
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
					row = y + MyGame.cellWidth;
				}
				else if(that.orientation === 2){
					col = x;
					row = y - MyGame.cellWidth;
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

		function rotate_T(){
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
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 2){
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
						x = brick1(x, y).x;
						y = brick1(x, y).y;
					}
					else if(i === 1){
						x = brick2(x, y).x;
						y = brick2(x, y).y;
					}
					else if(i === 2){
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

				updateOrientation();

			


			function brick1(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick2(x, y){
				var col, row;
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

				return {x: col, y: row};
			}

			function brick4(x, y){
				var col, row;
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
				if(below === -1)
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
					return true;
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
				if(left === -1)
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
					return true;
				}
			}
			else
			{
				return true;
			}
		};

		that.canMoveRight = function() {
			var right = MyGame.grid.checkBrick(spec.position.x + MyGame.cellWidth, spec.position.y);
			if(right != null)
			{
				if(right === -1)
				{
					//Looking past border
					return false;
				}
				else if(right.piece != spec.pieceID)
				{
					//Different piece left
					return false;
				}
				else
				{
					//Same piece left
					return true;
				}
			}
			else
			{
				return true;
			}
		};

		that.setPosition = function(x, y) {
            MyGame.grid.addBrick(spec.brickID, spec.pieceID, x, y);
			spec.position.x = x;
			spec.position.y = y;
		};
		
		that.getId = function() {
			return {
					piece: spec.pieceID,
					brick: spec.brickID
			};
		};

		that.update = function(elapsedTime) {
			MyGame.grid.removeBrick(spec.position.x, spec.position.y);
			spec.position.y += MyGame.cellWidth;

		};

		that.addToGrid = function() {
			 MyGame.grid.addBrick(spec.brickID, spec.pieceID, spec.position.x, spec.position.y);
		};

		that.removeFromGrid = function() {
			MyGame.grid.removeBrick(spec.position.x, spec.position.y);
		};

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
