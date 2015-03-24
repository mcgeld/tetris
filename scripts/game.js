MyGame.newGame = function(){
	MyGame.grid = new Grid(MyGame.numCols, MyGame.numRows);
	requestAnimationFrame(MyGame.gameLoop);
}

MyGame.drawBackground = function() {
	var images = ['redBrick', 'yellowBrick', 'greenBrick', 'greyBrick', 'pinkBrick', 'purpleBrick', 'blueBrick'];
	//SET SIZE VARIABLES
	MyGame.bucketHeight = MyGame.context.canvas.height - 100;
	MyGame.bucketWidth = MyGame.context.canvas.width * (1 / 3);
	MyGame.cellWidth = MyGame.bucketWidth / MyGame.numCols;
	MyGame.bucketBorder = (MyGame.context.canvas.height - (MyGame.cellWidth * MyGame.numRows)) / 2;
	
	//DRAW BACKGROUND
	MyGame.context.drawImage(MyGame.images['images/backgroundMoon.jpg'], 0, 0, MyGame.context.canvas.width, MyGame.context.canvas.height);

	//DRAW GRID IN BUCKET THING
	//DRAW VERTICAL LINES
	for(var i = 0; i <= MyGame.numCols; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketWidth + (MyGame.cellWidth * i), MyGame.bucketBorder);
		MyGame.context.lineTo(MyGame.bucketWidth + (MyGame.cellWidth * i), MyGame.context.canvas.height - MyGame.bucketBorder);
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		MyGame.context.stroke();
	}
	//DRAW HORIZONTAL LINES
	for(var i = 0; i <= MyGame.numRows; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketWidth, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineTo(MyGame.bucketWidth * 2, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		MyGame.context.stroke();
	}

		//DRAW BUCKET THING
	MyGame.context.beginPath();
	MyGame.context.moveTo(MyGame.bucketWidth - 5, MyGame.bucketBorder - 0.5);
	MyGame.context.lineTo(MyGame.bucketWidth - 5, MyGame.context.canvas.height - MyGame.bucketBorder + 5);
	MyGame.context.lineTo((MyGame.bucketWidth * 2) + 5, MyGame.context.canvas.height - MyGame.bucketBorder + 5);
	MyGame.context.lineTo((MyGame.bucketWidth * 2) + 5, MyGame.bucketBorder - 0.5);
	MyGame.context.lineWidth = 10;
	MyGame.context.strokeStyle = '#ffffff';
	MyGame.context.stroke();
	
	MyGame.context.fillStyle = 'rgba(255, 255, 255, 0.1)';
	MyGame.context.fillRect(MyGame.bucketWidth, MyGame.bucketBorder, MyGame.bucketWidth, MyGame.context.canvas.height - (2 * MyGame.bucketBorder));

}