var r = 15;
var theta = 0;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);

  // Move the canvas so it's inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background('#f2f2f2');
}

function draw(){
  var x = r*cos(theta);
  var y = r*sin(theta);

  noStroke();
  fill(r*0.5);
  ellipse(width*0.75+x,height/2+y, 16,16);
  theta+=0.02;
  r+=0.1;
}
