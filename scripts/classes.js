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
			if(grid[x][y] === null)
			{
				return {
						brick: -1,
						piece: -1
				};
			}
			else
			{
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

		that.update = function(){
			
		};
		
		return that;

	}

	//
	//Piece Template
	function Piece(id) {
		var that = {},
			bricks = [],
			type = Math.floor(Math.random() * 7 + 1),
			//type = 4,

			images = ['yellowBrick', 'blueBrick', 'purpleBrick', 'pinkBrick', 'greyBrick', 'greenBrick', 'redBrick'],
			imageType = type % 7;
			i = 1,
			imageName = 'images/' + images[imageType] + 'Plain.jpg';


		that.alreadyMoved = false;

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

		that.rotate = function() {

		};

		that.moveLeft = function() {
			var x, y,
				canMove = true;

			for(i = 0; i < 4; i++){
				if(bricks[i].getX() <= MyGame.bucketLeft){
					canMove = false;
					break;
				}
			}

			if(canMove === true){
				for(i = 0; i < 4; i++){
					x = bricks[i].getX() - MyGame.cellWidth;
					y = bricks[i].getY();
					bricks[i].setPosition(x, y);
				}
			}
		};

		that.moveRight = function() {
			var x, y,
				canMove = true;

			for(i = 0; i < 4; i++){
				if(bricks[i].getX() >= MyGame.bucketLeft + (MyGame.cellWidth * 10)){
					canMove = false;
					break;
				}
			}

			if(canMove === true){
				for(i = 0; i < 4; i++){
					x = bricks[i].getX() + MyGame.cellWidth;
					y = bricks[i].getY();
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
			return canMove();
		};

		that.getBricks = function() {
			return bricks;
		};

		that.update = function(elapsedTime) {
			if(canMove() === true){
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
			bricks[0].setPosition(x, y);
			
			for(i = 1; i < 4; i++) {
				x = MyGame.bucketLeft + (MyGame.cellWidth * (2 + i));
				y = MyGame.startLocation;
				bricks[i].setPosition(x, y);
			}
		}

		function L_Piece() {
			var x, y;

			x = MyGame.bucketLeft + (MyGame.cellWidth * (3));
			y = MyGame.startLocation + MyGame.cellWidth;
			bricks[0].setPosition(x, y);

			for(i = 1; i < 4; i++) {
				x = MyGame.bucketLeft + (MyGame.cellWidth * (2 + i));
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
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 4));
					y = MyGame.startLocation;
				}
				else if(i >= 2){
					x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 1));
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
			y = MyGame.startLocation + MyGame.cellWidth;
			bricks[0].setPosition(x, y);

			for(i = 1; i < 4; i++){
				x = MyGame.bucketLeft + (MyGame.cellWidth * (i + 2));
				y = MyGame.startLocation;
				bricks[i].setPosition(x, y);
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
