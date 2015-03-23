MyGame.classes = (function() {


	// 
	//Brick Grid
	function Grid() {
		var that = {},
			grid,
			i,
			j;

		that.create = function(rows, cols) {
			grid = [];

			//Define 2D array
			for(i = 0; i < rows; i++){
				if(!grid[row])
					grid[row] = [];
			}

			//Initialize to null
			for(i = 0; i < rows; i++)
				for(j = 0; j < cols; j++)
					grid[i][j] = null;

		};

		that.addBrick = function(brickID, pieceID, x, y){
			var row = (x - MyGame.bucketWidth) / MyGame.cellWidth,
				col = y / MyGame.cellWidth;

			grid[row][col] = {
				brick: brickID,
				piece: pieceID
			};
		};

		that.removeBrick = function(x, y) {
			var row = (x - MyGame.bucketWidth) / MyGame.cellWidth,
				col = y / MyGame.cellWidth;

			grid[row][col] = null;
		};

		that.update = function(){
			
		};

	}

	//
	//Piece Template
	function Piece() {
		var that = {},
			bricks = [],
			//type = Math.floor(Math.random() * 8 + 1),
			type = 7,
			images = ['yellowBrick', 'blueBrick', 'purpleBrick', 'pinkBrick', 'greyBrick', 'greenBrick', 'redBrick'],
			imageType = type % 7;
			i = 1,


			imageName = 'images/' + images[imageType] + 'Plain.jpg';

		//Fill Bricks array
		for(i = 0; i < 4; i++){
			bricks[i] = MyGame.classes.Brick({
				image: MyGame.images[imageName],
				position: {
					x: 0,
					y: 0 },
				width: MyGame.cellWidth,
				height: MyGame.cellWidth,
				brickID: i + 1,
				pieceID: 1
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
			var x, y;
			for(i = 0; i < 4; i++){
				x = bricks[i].getX() - MyGame.cellWidth;
				y = bricks[i].getY();
				if(x >= MyGame.bucketWidth)
					bricks[i].setPosition(x, y);
			}
		};

		that.moveRight = function() {

		};

		that.hardDrop = function() {

		};

		that.softDrop = function() {

		};

		that.clearBricks = function() {

		};

		that.update = function() {
			for(i = 0; i < bricks.length; i++){
				bricks[i].update();
			}
		};

		that.draw = function() {
			for(i = 0; i < bricks.length; i++){
				bricks[i].draw();
			}
		};


		//*********************************
		//    Piece Shape Templates
		//
		//*********************************

		function I_Piece() {
			var x, y;
			
			for(i = 0; i < 4; i++) {
				x = MyGame.bucketWidth + (MyGame.cellWidth * (3 + (i)));
				y = MyGame.bucketBorder;
				bricks[i].setPosition(x, y);
			}
		}

		function J_Piece() {
			var x, y;

			x = MyGame.bucketWidth + (MyGame.cellWidth * 5);
			y = MyGame.bucketBorder + MyGame.cellWidth;
			bricks[0].setPosition(x, y);
			
			for(i = 1; i < 4; i++) {
				console.log(x, y);
				x = MyGame.bucketWidth + (MyGame.cellWidth * (2 + i));
				y = MyGame.bucketBorder;
				bricks[i].setPosition(x, y);
			}
		}

		function L_Piece() {
			var x, y;

			x = MyGame.bucketWidth + (MyGame.cellWidth * (3));
			y = MyGame.bucketBorder + MyGame.cellWidth;
			bricks[0].setPosition(x, y);

			for(i = 1; i < 4; i++) {
				x = MyGame.bucketWidth + (MyGame.cellWidth * (2 + i));
				y = MyGame.bucketBorder;
				bricks[i].setPosition(x, y);
			}
		}

		function O_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 4));
					y = MyGame.bucketBorder;
				}
				else if(i >= 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 2));
					y = MyGame.bucketBorder + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function S_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 4));
					y = MyGame.bucketBorder;
				}
				else if(i >= 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 1));
					y = MyGame.bucketBorder + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function Z_Piece() {
			var x, y;

			for(i = 0; i < 4; i++){
				if(i < 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 4));
					y = MyGame.bucketBorder;
				}
				else if(i >= 2){
					x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 3));
					y = MyGame.bucketBorder + MyGame.cellWidth;
				}

				bricks[i].setPosition(x, y);
			}
		}

		function T_Piece() {
			var x, y;

			x = MyGame.bucketWidth + (MyGame.cellWidth * 4);
			y = MyGame.bucketBorder + MyGame.cellWidth;
			bricks[0].setPosition(x, y);

			for(i = 1; i < 4; i++){
				x = MyGame.bucketWidth + (MyGame.cellWidth * (i + 2));
				y = MyGame.bucketBorder;
				
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

		that.setPosition = function(x, y) {
			spec.position.x = x;
			spec.position.y = y;
		};

		that.update = function() {

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

return {
	Brick: Brick,
	Piece: Piece
}

}());
