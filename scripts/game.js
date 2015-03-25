MyGame.newGame = function(){
	MyGame.grid = new Grid(MyGame.numCols, MyGame.numRows);

	requestAnimationFrame(MyGame.gameLoop);
}

MyGame.drawBackground = function() {
	var images = ['redBrick', 'yellowBrick', 'greenBrick', 'greyBrick', 'pinkBrick', 'purpleBrick', 'blueBrick'];
	//SET SIZE VARIABLES
	MyGame.bucketHeight = MyGame.context.canvas.height - 100;
	MyGame.bucketWidth = MyGame.context.canvas.width * (1 / 4);
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

}