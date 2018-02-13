let canvas;

let width = 400;
let height = 400;

let fontSize;
let fontWidth;
let textX, textY;
let font;

let hours;
let minutes;
let seconds;

let str;
let vehicles = [];
let pivot;

let gravity;


function preload() {
  font = loadFont('../font/AvenirNextLTPro-Demi.otf');
}

function setup() {
	canvas = createCanvas(width, height);
	centerCanvas();
	canvas.parent('desktop-clock-holder');
	fontSize = min(width, height) * 0.3;
	textX = width / 2;
	textY = height / 2 + fontSize / 4;
	textSize(fontSize);

	for(let i = 0; i < 350; i++) {
		vehicles.push(new Vehicle(random(width), random(height), random(width), random(height)));
	}

	gravity = createVector(0, 0.1);
}

function draw() {
	background(51, 51, 51);
	stroke(255);
	fill(255);

	hours = hour();
	minutes = minute();
	seconds = second();

	str = to2Digits(hours) + ":" + to2Digits(minutes); //+ ":" + to2Digits(seconds);
	fontWidth = textWidth(str);

//	console.log(seconds);

	let points = font.textToPoints(str, textX - fontWidth / 2, textY, fontSize, {
    sampleFactor: 0.1
  });

	for(let i = 0; i < points.length; i++) {
		if(!vehicles[i].showed) {
			vehicles[i].pos = createVector(vehicles[i].pos.x, 0);
		}
		vehicles[i].setShowed(true);
		vehicles[i].setTarget(points[i].x, points[i].y);
	}

	for(let j = points.length; j < vehicles.length; j++) {
		var v = vehicles[j];
		v.setShowed(false);
	}

	// strokeWeight(10);
	// stroke(255, 0, 0);
	// point(textX, textY);

	// strokeWeight(1);
	// line(textX - fontWidth / 2, textY, textX + fontWidth / 2, textY);
	// line(textX - fontWidth / 2, textY, textX - fontWidth / 2, textY - fontSize * 3 / 4);
	// line(textX - fontWidth / 2, textY - fontSize * 3 / 4, textX + fontWidth / 2, textY);
	// line(textX - fontWidth / 2, textY, textX + fontWidth / 2, textY - fontSize * 3 / 4);

	noStroke();
	for(let i = 0; i < vehicles.length; i++) {
		var v = vehicles[i];
		v.applyForce(gravity);
    v.behaviors();
    v.update();
    v.show();
	}
	// if(frameCount == 200) {
	//  noLoop();
	//  stroke(255,0,0);
	//  for(let  i = 0; i < vehicles.length; i++) {
	// 	 if(vehicles[i].showed){
	// 	 point(vehicles[i].pos.x,vehicles[i].pos.y);
	//  }
	//  }
 // }
}

function to2Digits(num) {
	if(num < 10) {
		return "0" + num;
	}
	return "" + num;
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}
