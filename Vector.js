/**
 *	Vector JS
 *	Creates a constructor to hold and manipulate position in canvas
 *
 *	@Param x - x coordinate in canvas
 *	@Param y - y coordinate in canvas
 */

var Vector = function(x, y) {
	this.x = x;
	this.y = y;

	/**
	 *	Add method
	 *	Add second vector into first vector
	 *
	 *	@Param vec - second vector object
	 */
	this.add = function(vec) {
		this.x += vec.x;
		this.y += vec.y;
	};

	/**
	 *	Mult method
	 *	Multiply vector with constant
	 *
	 *	@Param offset - Given constant
	 */
	this.mult = function(offset) {
		this.x *= offset;
		this.y *= offset;
	};

	/**
	 *	Distance method
	 *	Calculate distance between two vector objects
	 *
	 *	@Param vec - second vector object
	 */
	this.distance = function(vec) {
		var delta_x = this.x - vec.x;
		var delta_y = this.y - vec.y;
		return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
	};
};

/**
 * 	RandomVector Method
 *	Returns a random vector in the given range for x and y coordinates
 */
var RandomVector = function(minX, maxX, minY, maxY) {
	minX = minX || -20;
	maxX = maxX || canvas.width;
	minY = minY || -20;
	maxY = maxY || canvas.height;

	return new Vector(random(minX, maxY), random(minY, maxY));
};