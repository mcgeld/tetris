MyGame.classes = (function() {


	//
	//Piece Object
	function Piece(spec) {
		var that = {};


		that.rotate = function() {

		};

		that.moveLeft = function() {

		};

		that.moveRight = function() {

		};

		that.hardDrop = function() {

		};

		that.softDrop = function() {

		};

		that.draw = function() {
			context.save();
			context.translate(spec.center.x, spec.center.y);
			context.rotate(spec.angle * Math.PI / 180);
			context.translate(-spec.center.x, -spec.center.y);

			context.drawImage(
				spec.image,
				spec.center.x - spec.w/2,
				spec.center.y - spec.h/2,
				spec.w, spec.h);

			context.restore();
		};


	}


}());