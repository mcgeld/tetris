var MyGame = {
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
				'preload!scripts/game.js',
				
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);


yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	.status.preloadRequest += 1;

	resource.autoCallback = function(e) {
		
	
		//
		// When everything has finished preloading, go ahead and start the game
		if (MyGame.status.preloadComplete === MyGame.status.preloadRequest) {
			console.log('Preloading complete!');
			MyGame.initialize();
		}
	};
	
	return resource;
});
