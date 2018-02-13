let canvas;

let fps = 30;
let w = 640;
let h = 360;
let clockOutline;

let seconds;
let minutes;
let hours;

// To limit analogic drift.
let prevSc;
let framesPerMinute;

let startAngleSc;
let startAngleMn;
let startAngleHr;

let speedAngleSc = 360 / 60;	// 2 seconds to complete round.
let speedAngleMn = 360 / 120;	// 4 seconds to complete round.
let speedAngleHr = 360 / 180;	// 6 seconds to complete round.

let backgroundColor = 51;
let strokeW = 10;

function setup() {
	canvas = createCanvas(w, h);
	centerCanvas();
	canvas.parent('mobile-clock-holder')
	clockOutline = min(w, h) * 0.75;
	frameRate(fps);
	angleMode(DEGREES);

	prevSc = second();
	framesPerMinute = prevSc * fps;

	startAngleSc = -90;
	startAngleMn = -90;
	startAngleHr = -90

	noFill();
	strokeWeight(strokeW);
}

function draw() {
	background(backgroundColor);

	seconds = second();
	minutes = minute();
	hours = hour();

	if(seconds != prevSc) {	// Seconds just changed
		// Correcting drift.
		framesPerMinute = seconds * fps;
		prevSc = seconds;
	} else {
		// Every frame.
		framesPerMinute += 1;
	}

	secondsPerHour = minutes * 60 + seconds;
	minutesPerHalfDay = (hours % 12) * 60 + minutes;

	var endAngleSec = map(framesPerMinute, 0, 60 * fps, -90, 270, true);
	var endAngleMin = map(secondsPerHour, 0, 60 * 60, -90, 270, true);
	var endAngleHour = map(minutesPerHalfDay, 0, 60 * 12, -89.997, 270, true);

	if(seconds == 59 || startAngleSc != -90) {
		startAngleSc =	(((startAngleSc + 90) + speedAngleSc)) % 360 - 90;
	}
	if(minutes == 59 && seconds == 59 || startAngleMn != -90) {
		startAngleMn =	(((startAngleMn + 90) + speedAngleMn)) % 360 - 90;
	}
	if(hours == 11 && minutes == 59 && seconds == 59 || startAngleHr != -90) {
		startAngleHr =	(((startAngleHr + 90) + speedAngleHr)) % 360 - 90;
	}

	stroke(255, 0, 255);
	arc(w/2, h/2, clockOutline, clockOutline, startAngleSc, endAngleSec);

	stroke(0, 255, 255);
	arc(w/2, h/2, clockOutline - strokeW * 2, clockOutline - strokeW * 2, startAngleMn, endAngleMin);

	stroke(255, 255, 0);
	arc(w/2, h/2, clockOutline - strokeW * 4, clockOutline - strokeW * 4, startAngleHr, endAngleHour);

}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}
