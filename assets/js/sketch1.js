var os = []
function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  for(var i = 0; i < 5; i++){
    os[i] = new Oscillator();
  }
}

function draw(){
  push();
  // fill(255,3);
  noStroke();
  fill(242,242,242,50);

  rect(0,0,width,height);
  pop();
  for(var i = 0; i < 5; i++){
    os[i].update();
    os[i].display();

  }
}


function Oscillator(){

  this.angle = createVector(0,20);
  //aVelocity = new PVector(random(-0.05,0.05),random(-0.05,0.05));
  this.aVelocity = createVector(random(-0.05,0.05),0);
  this.amplitude = createVector(random(width/2),random(height/2));
  this.aAcceleration = createVector(0,0.0001);

  this.update = function(){
    this.angle.add(this.aVelocity);
    this.aVelocity.add(this.aAcceleration);
  }

  this.display = function(){

    var x = sin(this.angle.x)*this.amplitude.x;
    var y = sin(this.angle.y)*this.amplitude.y;
    push();
    translate(width*0.75,height/2);
    stroke(0);
    fill(175);
//Drawing the Oscillator as a line connecting a circle
    line(0,0,x,y);
    ellipse(x,y,16,16);
    pop();
  }
};
