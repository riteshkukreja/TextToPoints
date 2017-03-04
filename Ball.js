/**
 *	Ball JS
 *	Defines a Ball Constructor to allow a point in canvas to draw and update itself.
 *
 *	@Param target - Vector object defining the target position
 *	@Param mousePosTracker - MouseTracker object which updates the mouse current position as a Vector object
 */

var Ball = function(target, mousePosTracker, config) {

	// initialize config if not present
	config = config || {};

	// Current position of the ball, Starting with a random position vector
	this.pos = config.position || RandomVector();

	// current velocity of the ball, starting with zero vector
	this.velocity = config.velocity || new Vector(0, 0);

	// target position of the ball, in case of undefined values initialize it to empty vector
	this.target = target || new Vector(0, 0);

	// Color of the ball
	this.color = config.color || "#3498db";

	// Radius of the ball
	this.radius = config.radius || 2;

	// Maximum force that can be accumulated to the ball speed
	this.maxForce = config.maxForce || 5;

	// Maximum repel frce a ball can experience with mouse position
	this.repelForce = config.repelForce || random(30, 50);

	// Minimum distance from  the mouse position for the ball
	this.offset = config.offset || random(80, 100);

	// distance from the final position to the ball position under which the speed slows down to 0
	this.delta_shift = config.delta_shift || 100;

	/**
	 *	Update method
	 *	updates the ball position
	 */
	this.update = function() {

		// update the ball position with adding velocity
		this.pos.add(this.velocity);

		// Remove all force from the system
		this.velocity.mult(0);

		// Force to be set as velocity for the next frame
		var f = new Vector(
			map(Math.abs(this.pos.x - this.target.x), 0, this.delta_shift, 0, this.maxForce),
			map(Math.abs(this.pos.y - this.target.y), 0, this.delta_shift, 0, this.maxForce)
			);

		// Update the direction of force to go towards the target
		if(this.pos.x - this.target.x > 0) f.x = -f.x;
		if(this.pos.y - this.target.y > 0) f.y = -f.y;

		// apply the  force
		this.force(f);

		// check if mouse is close enough for repel force
		this.repel();
	};

	/**
	 *	Repel method
	 *	Apply the repel force to the ball if the mouse if close enough to the ball
	 */
	this.repel = function() {

		// Checks if offset is larger than distance between mouse and ball
		if(this.offset > this.pos.distance(mousePosTracker.pos)) {

			// repel force to be applied to velocity based on the distance from the ball
			var f = new Vector(
				map(Math.abs(this.pos.x - mousePosTracker.pos.x), 0, this.offset, 0, this.repelForce),
				map(Math.abs(this.pos.y - mousePosTracker.pos.y), 0, this.offset, 0, this.repelForce)
				);

			// update direction to go against the moouse position
			if(this.pos.x - mousePosTracker.pos.x < 0) f.x = -f.x;
			if(this.pos.y - mousePosTracker.pos.y < 0) f.y = -f.y;

			// Apply repel force
			this.force(f); 

			// Now, to make sure that the ball finds a alternate path to its target, give it a random force in random direction
			this.force(RandomVector(-10, 10, -10, 10));
		}
	};

	/**
	 *	Draw method
	 *	draw the ball on to the canvas
	 *
	 *	@Param offsetX - translate the ball position by given offset in X direction
	 *	@Param offsetY - translate the ball position by given offset in Y direction
	 */
	this.draw = function(offsetX, offsetY) {
		// Initialize offsets if not present
		offsetX = offsetX || 0;
		offsetY = offsetY || 0;

		// Apply color
		context.fillStyle = this.color;

		// Draw an filled circle at the ball position
		context.beginPath();
		context.arc(this.pos.x + offsetX, this.pos.y + offsetY, this.radius, 0, 2*Math.PI);
		context.fill();
	};

	/**
	 *	Force method
	 *	Apply given force to the velocity of the ball
	 *
	 *	@Param vec - Vector object defining the force
	 */
	this.force = function(vec) {
		this.velocity.add(vec);
	};
};