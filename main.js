// setup canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var sound = new Audio('mariocoin.ogg').play();
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// Ball constructor function:
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
  // this.orientation = orientation;
  // this.isIncrement = isIncrement;
}

// Drawing the ball:
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}


Ball.prototype.update = function() {
  // check for the boundaries! 
  // right edge
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
  // left edge
  if((this.x - this.size) <=0) {
    this.velX = -(this.velX);
  }
  // bottom
  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
  // top
  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  // the ball is moved each time this method is called
  this.x += this.velX;
  this.y += this.velY;
  // if(this.isIncrement === true && this.orientation < 1.9) {
  //   this.orientation += 0.1;
  // } else if (this.isIncrement === true && this.orientation > 1.9) {
  //   this.orientation -= 0.1;
  //   this.isIncrement = false;
  // } else if (this.isIncrement === false && this.orientation > .10) {
  //   this.orientation -= 0.1;
  // } else if (this.isIncrement === false && this.orientation < .10) {
  //   this.orientation += 0.1;
  //   this.isIncrement = true;
  // }
}

Ball.prototype.collisionDetect = function() {
  for(var i = 0; i < balls.length; i++) {
    if(!(this === balls[i])) {
      var dx = this.x - balls[i].x;
      var dy = this.y - balls[i].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.size + balls[i].size) {
        new Audio('mariocoin.ogg').play();
        balls[i].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 50) {
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10, 20),
      random(0, 2),
      true
    );
    balls.push(ball)
  }
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop)
}

loop();