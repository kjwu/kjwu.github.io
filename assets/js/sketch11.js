// BasicWave[] bws = new BasicWave[15];
// ComplexWave[] cws = new ComplexWave[2];
var bws = [];
var count =16;
var cws = [];
function setup() {
  var canvas = createCanvas(windowWidth/2, windowHeight/2);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  for(var i=0;i<count;i++){
    bws[i] = new BasicWave(50,random(0.05,0.1),random(0.1,0.5));
  }
  for(var j = 0;j<count/4;j++){
    cws[j] = new ComplexWave(50,random(0.05,0.1),random(0.1,0.5));
  }
}

function draw() {
  background('#ffffff');
   for(var i=0;i<count;i++){
    bws[i].update();
    bws[i].display();
  }
  for(var j = 0;j<count/4;j++){
    cws[j].update();
    cws[j].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function BasicWave( ln,  sp, pd){
  this.location = createVector(random(width),random(height));
  this.velocity = createVector(1,0);
  this.speed= sp;
  this.period= pd;
  this.waveLength= ln;
  this.startAngle = 0;
  this.amplitude = 50;
  this.brightness = random(100);


  this.update = function(){
    this.startAngle+=this.speed;
    this.location.add(this.velocity);
    if(this.location.x>width+50){
      this.location.x = 0;
    }else if(this.location.x<0){
      this.location.x = width;
    }

    if(this.location.y>height){
      this.location.y = 0;
    }else if(this.location.y<0){
      this.location.y = height;
    }
  };

  this.display = function(){
    push();
    //noFill();

    //stroke(brightness);

    translate(this.location.x,this.location.y);
    rotate(this.startAngle/10);
    this.angle = this.startAngle;

    for(var i = 0; i<this.waveLength; i++){
      var y = map(sin(this.angle),-1,1,-this.amplitude/2,this.amplitude/2);
      noStroke();
      fill(this.brightness);
      ellipse(-i*5,y,8/(i+1),8/(i+1));
      this.angle-=this.period;
    }
    pop();

  }
}



function ComplexWave(ln, sp, pd){
  this.location = createVector(random(width),random(height));
  this.velocity = createVector(1,0);
  this.speed= sp;
  this.period= pd;
  this.waveLength= ln;
  this.startAngle = 0;
  this.amplitude = 50;

  this.update=function(){
    this.startAngle+=this.speed;
    this.location.add(this.velocity);
    if(this.location.x>width+200){
      this.location.x = 0;
    }else if(this.location.x<0){
      this.location.x = width;
    }

    if(this.location.y>height){
      this.location.y = 0;
    }else if(this.location.y<0){
      this.location.y = height;
    }
  };

  this.display=function(){
    //noFill();
    push();
    noStroke();
    translate(this.location.x,this.location.y);
    var angle = this.startAngle;

    for(var i = 0; i<this.waveLength; i++){

      fill(232, 110, 44	,255/i*10);
      var y = map(sin(angle)+2*cos(angle/3),-1,1,-this.amplitude/2,this.amplitude/2);
      ellipse(-i*5,y,8,8);
      angle-=this.period;
    }
    pop();
  }
};
