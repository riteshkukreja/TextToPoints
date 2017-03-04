/**
 *	TextToPoints JS
 *	Maps a given string of text to points on the canvas
 *
 *	@Param str - String of Text
 *	@Param fill - Boolean flag to check if only edges need to be detected or entire text
 */

var TextToPoints = function(str, fill) {

	// set text if str is not defined
	str = str || "HELLO";

	// set fill if not given
	fill = fill || false;

	/**
	 *	checkPixel method
	 *	Boolean method to check if text exists in the given pixel
	 *
	 *	@Param i - The position of pixel in image data
	 *	@Param imageData - Array reprsennting the image data of canvas
	 */
	var checkPixel = function(i, imageData) {
		// if invalid pixel value then return false
		if(i < 0 || i > imageData.length) return false;

		// retrieve all the four pixel values - r, g, b, a
		var red = imageData[i];
		var green = imageData[i+1];
		var blue = imageData[i+2];
		var alpha = imageData[i+3];

		// Simple logic  to check if white text on black background
		return ((red + blue + green) / 3 > 50);
	};

	/**
	 *	scan method
	 *	Maps the image data from  text to points using checkPixel method
	 *
	 *	@Param separation - Distance between neighbour pixels, used to minimize points
	 *	@Param width - width of the canvas
	 *	@Param height - height of the canvas
	 *	@Param context - 2D context of the canvas
	 */
	var scan = function(separation, width, height, context) {

		// Retrieve the image data of the canvas
		var imageData = context.getImageData(0, 0, width, height).data;

		// Array to store all the valid points
		var points = [];

		// Object to store valid points to check for separation
		var map = {};

		// if separation not defined, set the default at 10
		separation = separation || 10;

		// Loop through image data by dividing iit based on width and height
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {

				// Get cooresponding index of the pixel on image data array
				var pos = (i*width + j) * 4;

				// check if pixel is valid and it is in edge of the text
				if(checkPixel(pos, imageData) && (
					fill ||
					i == 0 || 
					i == height-1 || 
					j == 0 || 
					j == width-1 || 
					!checkPixel(pos-4, imageData) || 
					!checkPixel(pos+4, imageData) || 
					!checkPixel(pos-width*4, imageData) || 
					!checkPixel(pos+width*4, imageData))
					) {

					// Boolean flag to check if neighbour point is allready added to list
					var alreadyAdded = false;

					// Loop through all the neighbour points
					for(var inner_i = i-separation; inner_i < i+separation; inner_i++) {
						for(var inner_j = j-separation; inner_j < j+separation; inner_j++) {

							// Skip the original pixel
							if(inner_j == j && inner_i == i) continue;

							// if point exists in map, then set alreadyAdded to true
							if(map[inner_i + "_" + inner_j]) {
								alreadyAdded = true;
								break;
							}
						}

						if(alreadyAdded) break;
					}

					// If point is already added, the skip otherwise add it to list and map
					if(!alreadyAdded) {
						points.push(new Vector(j, i));
						map[i + "_" + j] = true;
					}
				}
			}
		}

		// return the list with pixels
		return points;
	};	

	/**
	 *	getPoints method
	 *	Driver method to call scan method
	 *
	 *	@Param str - String of Text
	 */
	var getPoints = function(str) {

		// Create a dummy canvas and context
		var canvas_temp = document.createElement("canvas");
		var context_temp = canvas_temp.getContext('2d');

		// set the font
		context_temp.font = "200px Verdana";

		// create dimensions for the dummy canvas equal to the size of text
		var text_measure = context_temp.measureText(str);
			text_measure.height = 300;

		// Set canvas width and height
		dimension(canvas_temp, text_measure.width, text_measure.height);

		// Apply black background color to canvas
		clear(context_temp, "black");

		// Write text in center of canvas with white color
		text(context_temp, str, new Vector(canvas_temp.width/2, canvas_temp.height/2), "white");

		// Call scan method to retrive all the points
		var points = scan(2, canvas_temp.width, canvas_temp.height,  context_temp);

		// return the points
		return points;
	};

	// Call the get points method to return the list of pixels vectors
	return getPoints(str);
};

	