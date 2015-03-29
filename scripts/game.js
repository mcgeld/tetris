MyGame.newGame = function(){
	MyGame.grid = new Grid(MyGame.numCols, MyGame.numRows);

	requestAnimationFrame(MyGame.gameLoop);
}

MyGame.drawBackground = function() {
	var images = ['yellowBrick', 'blueBrick', 'purpleBrick', 'pinkBrick', 'greyBrick', 'greenBrick', 'redBrick'],
		nextType = MyGame.getNextPieceType(),
		imageType = nextType % 7,
		imageName = 'images/' + images[imageType] + 'Plain.jpg',
		x, y;


	//SET SIZE VARIABLES
	MyGame.bucketHeight = MyGame.context.canvas.height - 100;
	MyGame.bucketWidth = MyGame.context.canvas.width * (1 / 4);
	MyGame.pieceWindowWidth = MyGame.cellWidth * 6;
	MyGame.pieceWindowHeight = MyGame.cellWidth * 4;
	MyGame.windowBuffer = 30;
	MyGame.cellWidth = MyGame.bucketWidth / MyGame.numCols;
	MyGame.bucketLeft = (MyGame.context.canvas.width - MyGame.bucketWidth) / 2;
	MyGame.bucketRight = MyGame.bucketLeft + MyGame.bucketWidth;
	MyGame.bucketBorder = (MyGame.context.canvas.height - (MyGame.cellWidth * MyGame.numRows)) / 2;
	MyGame.startLocation = MyGame.bucketBorder - (MyGame.cellWidth * 2);
	
	//DRAW BACKGROUND
	MyGame.context.drawImage(MyGame.images['images/backgroundMoon.jpg'], 0, 0, MyGame.context.canvas.width, MyGame.context.canvas.height);

	//DRAW GRID IN BUCKET THING
	//DRAW VERTICAL LINES
	for(var i = 0; i <= MyGame.numCols; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketLeft + (MyGame.cellWidth * i), MyGame.bucketBorder);
		MyGame.context.lineTo(MyGame.bucketLeft + (MyGame.cellWidth * i), MyGame.context.canvas.height - MyGame.bucketBorder);
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		MyGame.context.stroke();
	}
	//DRAW HORIZONTAL LINES
	for(var i = 0; i <= MyGame.numRows; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketLeft, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineTo(MyGame.bucketRight, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		MyGame.context.stroke();
	}

	//DRAW BUCKET THING
	MyGame.context.beginPath();
	MyGame.context.moveTo(MyGame.bucketLeft - 5, MyGame.bucketBorder - 0.5);
	MyGame.context.lineTo(MyGame.bucketLeft - 5, MyGame.context.canvas.height - MyGame.bucketBorder + 5);
	MyGame.context.lineTo(MyGame.bucketRight + 5, MyGame.context.canvas.height - MyGame.bucketBorder + 5);
	MyGame.context.lineTo(MyGame.bucketRight + 5, MyGame.bucketBorder - 0.5);
	MyGame.context.lineWidth = 10;
	MyGame.context.strokeStyle = '#ffffff';
	MyGame.context.stroke();
	
	MyGame.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
	MyGame.context.fillRect(MyGame.bucketLeft, MyGame.bucketBorder, MyGame.bucketWidth, MyGame.context.canvas.height - (2 * MyGame.bucketBorder));


	//Draw Upcoming Piece Window
	MyGame.context.beginPath();
	MyGame.context.moveTo(MyGame.bucketRight + MyGame.windowBuffer, MyGame.bucketBorder + 10);
	MyGame.context.lineTo(MyGame.bucketRight + MyGame.windowBuffer + MyGame.pieceWindowWidth, MyGame.bucketBorder + 10);
	MyGame.context.lineTo(MyGame.bucketRight + MyGame.windowBuffer + MyGame.pieceWindowWidth, MyGame.bucketBorder + MyGame.pieceWindowHeight);
	MyGame.context.lineTo(MyGame.bucketRight + MyGame.windowBuffer, MyGame.bucketBorder + MyGame.pieceWindowHeight);
	MyGame.context.lineTo(MyGame.bucketRight + MyGame.windowBuffer, MyGame.bucketBorder + 5);
	MyGame.context.lineWidth = 10;
	MyGame.context.strokeStyle = '#ffffff';
	MyGame.context.stroke();
	
	MyGame.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
	MyGame.context.fillRect(MyGame.bucketRight + MyGame.windowBuffer, MyGame.bucketBorder + 10, MyGame.pieceWindowWidth, MyGame.pieceWindowHeight);
	


	//Next Piece Preview
	for(var i = 0; i < 4; i++){
		//I Piece
		if(nextType === 1){
			x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * i;
			y = MyGame.bucketBorder + MyGame.cellWidth * 2;
		}
		//J Piece
		else if(nextType === 2){
			if(i === 0){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25;
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (i - 1);
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
		}
		//L Piece
		else if(nextType === 3){
			if(i === 0){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25;
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (i - 1);
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
		}
		//O Piece
		else if(nextType === 4){
			if(i < 2){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (i + 1);
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (4 - i);
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
		}
		//S Piece
		else if(nextType === 5){
			if(i < 2){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (i + 1);
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (3 - i);
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
		}
		//Z Piece
		else if(nextType === 6){
			if(i < 2){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * i;
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (4 - i);
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
		}
		//T Piece
		else if(nextType === 7){
			if(i === 0){
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth;
				y = MyGame.bucketBorder + MyGame.cellWidth;
			}
			else{
				x = MyGame.bucketRight + MyGame.windowBuffer + 25 + MyGame.cellWidth * (3 - i);
				y = MyGame.bucketBorder + MyGame.cellWidth * 2;
			}
		}

		//Draw Next Piece Preview
		MyGame.context.save();

		MyGame.context.drawImage(
			MyGame.images[imageName],
			x,
			y,
			MyGame.cellWidth, MyGame.cellWidth);

		MyGame.context.restore();
	}

}