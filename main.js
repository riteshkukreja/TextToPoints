
// Get canvas object with id "can" and get 2D context
var canvas = document.getElementById("can"),
	context = canvas.getContext("2d");		

// Array to hold all the ball objects
var balls = [];

// Object of MouseTracker to latch the mouse position and shift its location by -250 and -200 in X and Y coordinates
// Hack to align it in center for photo
var mousePosTracker = new MouseTracker(-250, -200);

// Dummy text to show
var data = "LIVE LONG AND PROSPER!";

// Time period for each word to show
var timeframes = 3000;

// Current word position in data
var str_pos = 0;

/**
 *	Update method
 *	Increment and update values for the next word in data to show
 */
var update = function() {
	// first disperse all the balls for dramatix effect
	for(var i = 0; i < balls.length; i++) {
		balls[i].target = RandomVector();
	}

	// Give dispersion effect some time to show
	setTimeout(function() {

		// Split the text by spaces
		var str = data.split(" ");

		// is empty string, then skip update
		if(str.length == 0) return;

		// keep the str_pos inside the number of words
		if(str.length <= str_pos) str_pos = 0;

		// get current word to show
		str = str[str_pos];

		// update the position
		str_pos++;

		// Get points array containing pixel vector objects
		var points = TextToPoints(str);

		// if balls are less then points, then create balls with random target
		// otherwise if balls are larger than points and remove balls
		if(balls.length < points.length) {
			while(balls.length < points.length) {
				balls.push(new Ball(RandomVector(), mousePosTracker));
			}
		} else if(balls.length > points.length) {
			balls.splice(points.length-1, balls.length - points.length);
		}

		// Update targets of all balls
		for(var i = 0; i < balls.length; i++) {
			balls[i].target = points[i];
		}
	}, 100);

	// Update words each timeframes milliseconds
	setTimeout(update, timeframes);
};

/**
 *	draw method
 *	Draw and update all the balls onto the canvas
 */
var draw = function() {

	// Let the browser decide the frame rate
	requestAnimationFrame(draw);

	// Fill the canvas with black color
	clear(context, "#212121");

	// Loop through all the balls and update them
	for(var i = 0; i < balls.length; i++) {
		balls[i].update();

		// Draw the ball by shifting it with 250, 200 in X and Y coordinates
		balls[i].draw(250, 200);
	}
};

// Set width and height equal to screen
dimension(canvas, window.innerWidth, window.innerHeight);

// Call Update and Draw methods
update();
draw();