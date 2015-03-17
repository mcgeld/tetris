MyGame.newGame = function(){
	//SET SIZE VARIABLES
	MyGame.bucketHeight = MyGame.context.canvas.height - 100;
	MyGame.bucketWidth = MyGame.context.canvas.width * (1 / 3);
	MyGame.cellWidth = MyGame.bucketWidth / 10;
	MyGame.bucketBorder = (MyGame.context.canvas.height - (MyGame.cellWidth * 15)) / 2
	
	//DRAW BACKGROUND
	MyGame.context.drawImage(MyGame.images['images/backgroundMoon.jpg'], 0, 0, MyGame.context.canvas.width, MyGame.context.canvas.height);

	//DRAW GRID IN BUCKET THING
	for(var i = 0; i <= 10; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketWidth + (MyGame.cellWidth * i), MyGame.bucketBorder);
		MyGame.context.lineTo(MyGame.bucketWidth + (MyGame.cellWidth * i), MyGame.context.canvas.height - MyGame.bucketBorder);
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = '#ffffff';
		MyGame.context.stroke();
	}
	
	for(var i = 0; i <= 15; i++)
	{
		MyGame.context.beginPath();
		MyGame.context.moveTo(MyGame.bucketWidth, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineTo(MyGame.bucketWidth * 2, MyGame.bucketBorder + (MyGame.cellWidth * i));
		MyGame.context.lineWidth = 1;
		MyGame.context.strokeStyle = '#ffffff';
		MyGame.context.stroke();
	}

	//DRAW BUCKET THING
	MyGame.context.beginPath();
	MyGame.context.moveTo(MyGame.context.canvas.width * (1 / 3), MyGame.bucketBorder);
	MyGame.context.lineTo(MyGame.context.canvas.width * (1 / 3), MyGame.context.canvas.height - MyGame.bucketBorder);
	MyGame.context.lineTo(MyGame.context.canvas.width * (2 / 3), MyGame.context.canvas.height - MyGame.bucketBorder);
	MyGame.context.lineTo(MyGame.context.canvas.width * (2 / 3), MyGame.bucketBorder);
	MyGame.context.lineWidth = 5;
	MyGame.context.strokeStyle = '#ffffff';
	MyGame.context.stroke();
}