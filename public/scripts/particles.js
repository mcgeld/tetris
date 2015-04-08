function Emitter(spec){
	var
		count = spec.count,
		totalCreated = 0,
		creationRate = spec.creationRate,
		timeSinceLastCreate = 0,
		particle = spec.particle,
		location = {
					x: spec.location.x,
					y: spec.location.y
				   },
		particles = [],
		update = function(elapsedTime){
			for(var i = 0; i < particles.length; i++)
			{
				if(particles[i].updateLocation(elapsedTime) === false)
				{
					particles.splice(i, 1);
					i--;
				}
			}
			timeSinceLastCreate += elapsedTime;
			if(Math.floor(timeSinceLastCreate / creationRate) >= 1 && (count === 0 || totalCreated < count))
			{
				var numToCreate = Math.floor(timeSinceLastCreate / creationRate);
				for(var i = 0; i < numToCreate && particles.length <= count; i++)
				{
					particle.angle = (Math.random() * (spec.angle.min - spec.angle.max)) + spec.angle.min;
					particles.push(new Particle(particle, location));
					totalCreated++;
				}
				timeSinceLastCreate %= creationRate;
			}
			if(particles.length === 0 && totalCreated >= count)
			{
				return false;
			}
			else
			{
				return true;
			}
		},
		draw = function(){
			for(var i = 0; i < particles.length; i++)
			{
				particles[i].draw();
			}
		};
		
		return {
				update: update,
				draw: draw
		};
}

function Particle(spec, location){
	var
		myContext = spec.myContext,
		image = spec.image,
		size = MyGame.random(spec.size.mean, spec.size.stdev, spec.size.max, spec.size.min),
		lifetime = MyGame.random(spec.lifetime.mean, spec.lifetime.stdev, spec.lifetime.max, spec.lifetime.min),
		rotationRate = MyGame.random(spec.rotation.mean, spec.rotation.stdev, spec.rotation.max, spec.rotation.min),
		speed = MyGame.random(spec.speed.mean, spec.speed.stdev, spec.speed.max, spec.speed.min),
		currentRotation = rotationRate,
		totalLife = 0,
		direction = {
						x: Math.cos(spec.angle * (Math.PI / 180)),
						y: Math.sin(spec.angle * (Math.PI / 180))
					},
		center = {
					x: location.x,
					y: location.y
				   },
		updateLocation = function(elapsedTime){
			totalLife += elapsedTime;
			if(totalLife >= lifetime)
			{
				return false;
			}
			else
			{
				center.x += (direction.x * speed) * (elapsedTime / MyGame.timeMod);
				center.y += (direction.y * speed) * (elapsedTime / MyGame.timeMod);
				currentRotation += rotationRate;// * (elapsedTime / MyGame.timeMod);
				currentRotation %= 360; 
				return true;
			}
		},
		draw = function(){
			myContext.save();
			myContext.translate(center.x, center.y);
			myContext.rotate(currentRotation * (Math.PI / 180));
			myContext.translate(-center.x, -center.y);
            myContext.drawImage(
                image, 
                center.x - size/2, 
                center.y - size/2,
                size, size);
			myContext.restore();
		};
		
		return {
				updateLocation: updateLocation,
				draw: draw
		};
}