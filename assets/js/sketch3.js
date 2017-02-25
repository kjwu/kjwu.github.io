var bugs = [];
var attractor;
var count = 100;

function setup(){
  var canvas = createCanvas(windowWidth/2, windowHeight/2);
  noCursor();
  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  for(var i = 0; i< count; i++){
    bugs[i] = new Bug(width/2+random(-20,20),height/2+random(-20,20));
  }

  attractor = new Attractor();
}

function draw(){
  //background(255,1);
  background(242,242,242);


  attractor.update();
  attractor.display();

  for(var i = 0 ; i < count; i++){
    var attracting = attractor.attract(bugs[i]);
    bugs[i].applyForce(attracting);
    bugs[i].update();
    bugs[i].display();

  }
}



function Attractor(){
    this.location = createVector(random(width),random(height));
    this.mass = 10;
    this.G = 0.4;

    this.attract = function(m) {
      var force = p5.Vector.sub(this.location,m.location);
      var distance = force.mag();
  //Remember, we need to constrain the distance so that our circle doesn’t spin out of control.
      distance = constrain(distance,5.0,500.0);


      force.normalize();
      var strength = (this.G * this.mass * m.mass) / (distance * distance);
      force.mult(strength);
      if(distance<50){
        force.mult(-1);
      }
      return force;
    }

  this.update = function(){
    this.location.set(mouseX,mouseY);
  }

  this.display = function() {
    fill(100);
    ellipse(this.location.x,this.location.y, this.mass*4,this.mass*4);

    fill(150);
    ellipse(this.location.x,this.location.y, this.mass*3,this.mass*3);

    fill(200);
    ellipse(this.location.x,this.location.y, this.mass*2,this.mass*2);

  }
};



function Bug(_x,_y){
    this.location = createVector(_x,_y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.mass = 10;
    this.energyLoss = 0.99;
    this.flys = [];
    this.flysCount = 10;
    for(var i = 0; i < this.flysCount; i++){
      this.flys[i] = new Flys(this.location,20);
    }


  this.update = function(){
    for(var i = 0; i < this.flysCount; i++){
      this.flys[i].update();
    }
    this.velocity.mult(this.energyLoss);
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);

    if(this.location.x<0||this.location.x>width){
      this.velocity.x*=-1;
    }

     if(this.location.y<0||this.location.y>width){
      this.velocity.y*=-1;
    }
  };

  this.display = function(){
    fill(100);

    ellipse(this.location.x,this.location.y,this.mass,this.mass);
    for(var i = 0; i < this.flysCount; i++){
      this.flys[i].display();
    }
  };


  this.applyForce = function(force){
    // var f = p5.Vector.div(force,this.mass);
    var f = force;
    this.acceleration.add(f);
  };


};




function Flys(a,l){

  this.mass = 3;
  this.damping = 0.98;
  this.k = 0.1;
  this.anchor = a;
  this.len = l;
  this.loc = createVector(this.anchor.x+random(10),this.anchor.y+random(10));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.angle = 0;
  this.aVel = random(-3,3);
  this.oppositeForce = createVector(0,0);
  this.minlen = random(3);
  this.maxlen = random(10,40);
  this.showLine = false;

  this.update = function(){
    this.angle+=this.aVel;
    var force = p5.Vector.sub(this.loc,this.anchor);
    var d = force.mag();
    var stretch = d-this.len;
    force.normalize();
    force.mult(-1*this.k*stretch);
    this.oppositeForce = force;

    force.div(this.mass);
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.loc.add(this.vel);
    this.loc.add(cos(radians(this.angle)),sin(radians(this.angle)));
    this.acc.mult(0);

    var dir = p5.Vector.sub(this.loc, this.anchor);
    distance = dir.mag();
    if(distance<this.minlen){
      dir.normalize();
      dir.mult(this.minlen);
      this.loc = p5.Vector.add(this.anchor, dir);
      this.vel.mult(0);
    }else if(distance>this.maxlen){
      dir.normalize();
      dir.mult(this.maxlen);
      this.loc = p5.Vector.add(this.anchor, dir);
      this.vel.mult(0);
    }
  };

  this.getForce = function(){
    return this.oppositeForce;
  }

  this.display = function() {
    push();
      rectMode(CENTER);
      noStroke();
      fill(20);
      rect(this.anchor.x,this.anchor.y,3,3);
      ellipse(this.loc.x,this.loc.y,3,3);

    pop();
  }
};
