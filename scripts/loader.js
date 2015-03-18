var MyGame = {
	images : {},
	
	status : {
		preloadRequest : 0,
		preloadComplete : 0
	}
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
	console.log('Loading resources...');
	Modernizr.load([
		{
			load : [
				'preload!scripts/input.js',
				'preload!scripts/script.js',
				'preload!scripts/game.js',
				'preload!images/backgroundMoon.jpg',
				'preload!images/redBrick.jpg',
				'preload!images/yellowBrick.jpg',
				'preload!images/greenBrick.jpg',
				'preload!images/greyBrick.jpg',
				'preload!images/pinkBrick.jpg',
				'preload!images/purpleBrick.jpg',
				'preload!images/blueBrick.jpg'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);


yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	MyGame.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			MyGame.images[resource.url] = image;
		}
		MyGame.status.preloadComplete += 1;
		//
		// When everything has finished preloading, go ahead and start the game
		if (MyGame.status.preloadComplete === MyGame.status.preloadRequest) {
			console.log('Preloading complete!');
			MyGame.initialize();
		}
	};
	
	return resource;
});
