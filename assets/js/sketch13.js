var beams = [];
var fireworks = [];
var portals = [];
var currentFireworkAngle = 0;
var count = 100;
var circleSize = 100;
var portalX,portalY,palse,shift;
var speed = 1;
var degree = 0;
var hueColor = 200;
var initialSize = circleSize;
var randomCenter = false;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

}

function draw(){
  background(0);
  // background('#ffffff');
  //
  // push();
  // noStroke();
  // rectMode(CENTER);
  //
  // fill(0,0,0,40);
  // rect(width/2,height/2,width,height);
  // pop();
  // colorMode(RGB);
  //update and show portals
  if(degree>360) {
    degree = 0;
  }
  degree += speed*10;
  palse=map(sin(radians(degree)),-1,1,-circleSize*0.2,circleSize*0.2);

  if(hueColor>360) {
    hueColor = 0;
  }
  hueColor += 0.1;

    if(frameCount%10 == 0){
    if(randomCenter){
      portalX = width/2+map(noise(noiseFactor),0,1,-20,20);
      portalY = height/2+map(noise(noiseFactor+100),0,1,-20,20);
    }else{
      portalX = width/2;
      portalY = height/2;
    }
    portals.push(new Portal(portalX,portalY,initialSize,hueColor,speed/10));
  }

  for(var i = 0 ; i < portals.length; i++){
    portals[i].update();
    portals[i].display();
  }
  if(portals.length>30){
    portals.splice(0,1);
  }

  beat();


  //update and show fireworks

  if(frameCount%5 == 0){
    if(currentFireworkAngle>360){
     currentFireworkAngle=0;
   }else {
     currentFireworkAngle+=5;
   }

    fireworks.push(new Firework(circleSize*cos(radians(currentFireworkAngle)),circleSize*sin(radians(currentFireworkAngle))));
  }

  if(fireworks.length>0){
    for(var i = 0 ; i < fireworks.length; i++){
      fireworks[i].update();
      push();
      translate(width/2,height/2);
      fireworks[i].display();
      pop();
      if(fireworks[i].location.mag()>width){
        fireworks.splice(i,1);
      }
    }
  }
  //update and show beams

  if(random(100)>80){
    beams.push(new Beam());
  }

  if(beams.length>0){
    for(var i = 0 ; i < beams.length; i++){
      beams[i].update();
      beams[i].display();
      if(beams[i].location.mag()>2*width){
        beams.splice(i,1);
      }
    }
  }
}

function beat(){
  noStroke();

  for(var i = 0; i < 5; i++){
    push();
    translate(portalX,portalY);
    colorMode(HSB);
    let c = color(hueColor,100,100,0.3);
    fill(c);

    ellipse(0,0,(circleSize+palse)-i*7,(circleSize+palse)-i*7);
    // ellipse(0,0,(circleSize+palse+shift)-i*7,(circleSize+palse+shift)-i*7);

    // ellipse(0,0,(circleSize)-i*7,(circleSize)-i*7);
    pop();

  }
}

function Beam(){
    this.location = createVector(width/2,height/2);
    this.angle = random(2*PI);
    this.velocity = createVector(cos(this.angle),sin(this.angle));
    this.acceleration = createVector(0,0);
    this.beamLength = random(1.5,10);
    this.beamWidth = random(0.1,1);
    this.cc = color(random(255),random(255),random(255));

  this.update = function(){
     this.acceleration = p5.Vector.sub(this.location,createVector(width/2,height/2));
     this.acceleration.normalize();
     this.acceleration.mult(3);

     this.location.add(this.velocity);
     this.velocity.add(this.acceleration);
     this.velocity.limit(20);
     this.acceleration.mult(0);
 };

  this.display = function(){
    push();
    noStroke();
    colorMode(RGB);
    fill(this.cc);
    translate(this.location.x, this.location.y);
    rotate(this.angle-PI/2);
      var distance = dist(this.location.x,this.location.y,width/2,height/2);
    scale(map(distance,0,width/2,1,15));
    beginShape();
    vertex(-this.beamWidth,-this.beamLength);
    vertex(-this.beamWidth*1.5,this.beamLength);
    vertex(this.beamWidth*1.5,this.beamLength);
    vertex(this.beamWidth,-this.beamLength);
    //curveVertex(-50,50);
    endShape(CLOSE);
    pop();
  };
};




function Firework(_x,_y){

  this.location = createVector(_x,_y);
  this.speed = 5;

  this.update = function(){
    //speed = map(location.mag(),0,width/2,10,0.01);
    this.speed = map(this.location.mag(),0,width/2,0.01,10);

    var increment = createVector(this.location.x,this.location.y);
    increment.normalize();
    increment.mult(this.speed);
    this.location.add(increment);
    //location.mult(0.02);
  };


   this.display = function(){
    push();
    colorMode(RGB);

    fill(255,255,255);

    //fill(100,255,200);

    translate(this.location.x,this.location.y);
    rotate(this.location.heading()+PI/2);

    //ellipse(0,0, 100/speed,speed*2);

    ellipse(0,0, this.speed,this.speed*4);

    //strokeWeight(2);
    //stroke(255);

    //line(0,0,location.x,location.y);
    pop();
  };
};



function Portal(x,y,s,c,sd){

  this.state = false;


  this.posX = x;
  this.posY = y;
  this.size = s;
  this.age = 0;
  this.initialColor = c;
  this.growSpeed = sd;


  this.display = function(){

    push();
      translate(this.posX,this.posY);
        colorMode(HSB, 360, 100, 100);
        strokeWeight(2);
        //fill(age*10+initialColor,60,80,2);
        //noFill();
        stroke((this.age*10+this.initialColor)%360,60,100);
        fill((this.age*10+this.initialColor)%360,60,100,0.005);

        ellipse(0,0,this.size,this.size);
        //rectMode(CENTER);
        //rect(0,0,size,size);

          noStroke();
          fill(this.age*4+this.initialColor,30,100);
          for(var i = 0; i < 360; i +=15){
            var shift = random(-5,5);
            ellipse(this.size*cos(radians(i+this.shift))/2,this.size*sin(radians(i+this.shift))/2, 5,5);
          } 

      pop();
  };

  this.update = function(){
    this.age+=this.growSpeed;
    this.size+=this.age;
  };
};
