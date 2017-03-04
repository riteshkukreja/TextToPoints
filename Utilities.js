/**
 *	Utilities JS
 *	Holds multiple methods to support project
 */

/**
 * 	Clear Method
 *	Fills the canvas with the given color by using the given context object
 */
var clear = function(context, color) {
	context.fillStyle = color;
	context.fillRect(0, 0, canvas.width, canvas.height);
};	

/**
 * 	Random Method
 *	Returns a random integer value in range(min, max)
 */
var random = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

/**
 * 	Dimension Method
 *	Set the width and heigth of the given canvas object
 */
var dimension = function(canvas, width, height) {
	canvas.width = width;
	canvas.height = height;
};

/**
 * 	Text Method
 *	Write given text string on to the canvas with the given color at the given position
 */
var text = function(context, str, pos, color) {
	context.fillStyle = color;
	context.font = "200px Verdana";
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillText(str, pos.x, pos.y);
};

/**
 * 	Circle Method
 *	Creates a circle on the given position with given radius and color
 */
var circle = function(pos, radius, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(pos.x, pos.y, radius, 0, 2*Math.PI);
	context.fill();
};

/**
 * 	Map Method
 *	Maps a given value from one given dimension to another, distance to force
 */
var map = function(val, minDist, maxDist, minForce, maxForce) {
	return ((val - minDist) / (maxDist - minDist)) * (maxForce - minForce) + minForce;
};	

/**
 * 	MouseTracker Constructor
 *	Latches the mouse position
 */
var MouseTracker = function(offsetX, offsetY) {
	// Initialize the position outside the canvas
	this.pos = new Vector(-200, -200);

	// Translate the position in X coordinates by the given value
	this.offsetX = offsetX || 0;

	// Translate the position in Y coordinates by the given value
	this.offsetY = offsetY || 0;

	var self = this;

	// Attach listener to mousemove event and copy the values by shifting by given offsets
	canvas.addEventListener("mousemove", function(e) {
		self.pos.x = e.clientX + self.offsetX;
		self.pos.y = e.clientY + self.offsetY;
	});
};