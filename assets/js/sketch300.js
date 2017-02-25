//too slow on webgl?

// var trees = [];
//
// function setup(){
//   var canvas = createCanvas(windowWidth/2, windowHeight/2,WEBGL);
//
//   // Move the canvas so it's inside our <div id="sketch-holder">.
//   canvas.parent('sketch-holder');
//
//   for(var i = 0; i< 100; i++){
//     trees[i] = new Tree();
//   }
//
// }
//
// function draw(){
//   for(var i = 0 ; i < trees.length; i++){
//     trees[i].update();
//     trees[i].show();
//   }
// }
//
// function Tree(){
//   this.location = createVector(random(width*1.5),random(height*1.5),-200);
//   this.velocity = createVector(0,10,0);
//   this.size = random(30,50);
//   this.c = color(0,50+random(100),random(20));
//
//
//   this.update=function(){
//     this.location.add(this.velocity);
//     if(this.location.y>height+200){
//       this.size = random(30,50);
//     this.c = color(0,50+random(100),random(20));
//       this.location.set(random(width*1.5)-100,-200-(random(20)));
//     }
//   }
//   this.show=function(){
//
//     push();
//     // ambientLight(50);
//     fill(this.c);
//     translate(this.location.x,this.location.y,this.location.z);
//     rotateX(radians(270));
//     rotateY(this.size);
//     this.drawCylinder(0,this.size,this.size*3,3);
//     pop();
//   }
//
//
//   this.drawCylinder=function( topRadius,  bottomRadius,  tall,  sides) {
//   var angle = 0;
//   var angleIncrement = TWO_PI / sides;
//   // beginShape(QUAD_STRIP);
//   beginShape();
//
//   for (var i = 0; i < sides + 1; ++i) {
//     vertex(topRadius*cos(angle), 0, topRadius*sin(angle));
//     vertex(bottomRadius*cos(angle), tall, bottomRadius*sin(angle));
//     angle += angleIncrement;
//   }
//   endShape();
//
//   // If it is not a cone, draw the circular top cap
//   if (topRadius != 0) {
//     angle = 0;
//     beginShape(TRIANGLE_FAN);
//
//     // Center point
//     vertex(0, 0, 0);
//     for (var i = 0; i < sides + 1; i++) {
//       vertex(topRadius * cos(angle), 0, topRadius * sin(angle));
//       angle += angleIncrement;
//     }
//     endShape();
//   }
//
//   // If it is not a cone, draw the circular bottom cap
//   if (bottomRadius != 0) {
//     angle = 0;
//     beginShape(TRIANGLE_FAN);
//
//     // Center point
//     vertex(0, tall, 0);
//     for (var i = 0; i < sides + 1; i++) {
//       vertex(bottomRadius * cos(angle), tall, bottomRadius * sin(angle));
//       angle += angleIncrement;
//     }
//     endShape();
//   }
//   }
// }
