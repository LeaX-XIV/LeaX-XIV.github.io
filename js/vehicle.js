function Vehicle(x, y, tarX, tarY) {
  this.pos = createVector(x, y);
  this.r = 8;
  this.speed = createVector();
  this.acc = createVector();

  this.maxspeed = 10;
  this.maxforce = 1;

  this.target = new p5.Vector(tarX, tarY);

  this.showed = false;
}

Vehicle.prototype.behaviors = function() {
  if(!this.showed) {
    if(this.pos.x < 0 - this.r || this.pos.x > width + this.r || this.pos.y < 0 - this.r || this.pos.y > height + this.r) {
      this.speed.mult(0);
    }
  }

  if(this.showed) {
    var arrive = this.arrive(this.target);
    arrive.mult(2);
    this.applyForce(arrive);
  }
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);


  flee.mult(10);


  this.applyForce(flee);
}

Vehicle.prototype.setTarget = function(x, y) {
  this.target.set(x, y);
}

Vehicle.prototype.setShowed = function(s) {
  this.showed = s;
}

Vehicle.prototype.show = function() {
    stroke(255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}

Vehicle.prototype.applyForce = function(force) {
  this.acc.add(force);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.speed);
  this.speed.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.arrive = function(target) {
  if(target == undefined) {
    return createVector(0, 0);
  }
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.speed);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}
