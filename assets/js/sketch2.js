var movers = [];
var attractor;
var count = 100;

function setup(){
  var canvas = createCanvas(windowWidth/2, windowHeight/2);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  for(var i = 0; i< count; i++){
    movers[i] = new Mover(random(width),random(height), random(0.1,1));
  }

  attractor = new Attractor();
}

function draw(){
  //background(255,1);
  push();
  noStroke();
  rectMode(CENTER);
  fill(242,242,242,40);

  rect(width/2,height/2,width,height);
  pop();
  for(var i = 0 ; i < count; i++){
    var force = attractor.attract(movers[i]);
    movers[i].applyForce(force);

    movers[i].update();
    movers[i].display();

  }

  //attractor.display();
}



function Attractor(){
    this.location = createVector(width/2,height/2);
    this.mass = 20;
    this.G = 0.4;

  this.attract = function(m) {
    var force = p5.Vector.sub(this.location,m.location);
    var distance = force.mag();
//Remember, we need to constrain the distance so that our circle doesn’t spin out of control.
    distance = constrain(distance,5.0,25.0);


    force.normalize();
    var strength = (this.G * this.mass * m.mass) / (distance * distance);
    force.mult(strength);
    return force;
  }

  this.update = function(){
    this.location.set(mouseX,mouseY);
  }

  this.display = function() {
    stroke(0);
    fill(175,200);
    ellipse(this.location.x,this.location.y,this.mass*2,this.mass*2);
  }
};



function Mover(_x,_y,_m){
    this.location = createVector(_x,_y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.mass = _m;


  this.update = function(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function(){
    push();
    //noStroke();
    //fill(127,2);
    stroke(0,80);
    ellipse(this.location.x,this.location.y,this.mass,this.mass);
  };


  this.applyForce = function(force){
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };


};
