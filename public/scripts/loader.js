var MyGame = {
	images : {},
	sounds : {},
	
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

	MyGame.audioExt = '';
	//
	// Find out which kind of audio support we have
	if (Modernizr.audio.mp3 === 'probably') {
		console.log('Go for MP3s!');
		MyGame.audioExt = 'mp3';
	}
	else if (Modernizr.audio.wav === 'probably') {
		console.log('WAVs are go!');
		MyGame.audioExt = 'wav';
	}


	console.log('Loading resources...');
	Modernizr.load([
		{
			load : [
				'preload!styles/style.css',
				'preload!scripts/index.js',
				'preload!scripts/input.js',
				'preload!scripts/script.js',
				'preload!scripts/game.js',
				'preload!scripts/classes.js',
				'preload!images/backgroundMoon.jpg',
				'preload!images/redBrickPlain.jpg',
				'preload!images/yellowBrickPlain.jpg',
				'preload!images/greenBrickPlain.jpg',
				'preload!images/greyBrickPlain.jpg',
				'preload!images/pinkBrickPlain.jpg',
				'preload!images/purpleBrickPlain.jpg',
				'preload!images/blueBrickPlain.jpg',
				'preload!audio/tick.' + MyGame.audioExt,
				'preload!audio/clear-line.' + MyGame.audioExt,
				'preload!audio/soft-drop.' + MyGame.audioExt,
				'preload!audio/gameLoop.' + MyGame.audioExt,
				'preload!audio/bloop_x.' + MyGame.audioExt
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
	//resource.noexec = isImage;

	var isSound = /.+\.(mp3|wav)$/i.test(resource.url);

	if(isSound)
		resource.noexec = isSound;
	else if(isImage)
		resource.noexec = isImage;

	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			MyGame.images[resource.url] = image;
		}
		else if(isSound) {
			var sound = new Audio(resource.url);
			console.log(resource.url);
			MyGame.sounds[resource.url] = sound;
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
