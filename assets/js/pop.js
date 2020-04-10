var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
var cH;
var cW;
var bgColor = "#323232";
var animations = [];
var circles = [];

let des = "#FFFFFF";
let dev = "#000000";
let both = "#323232";
var current = bgColor;

// var colorPicker = (function() {
//   var colors = ["#000000", "#323232", "#FFFFFF"];

//   var index = 0;
//   function next() {
//     index = index++ < colors.length-1 ? index : 0;
//     return colors[index];
//   }
//   function current() {
//     return colors[index]
//   }
//   return {
//     next: next,
//     current: current
//   }
// })();

function removeAnimation(animation) {
  var index = animations.indexOf(animation);
  if (index > -1) animations.splice(index, 1);
}

//When a dev element is clicked
$('.dev').click(function(){
  handleEvent(current, dev);
});
//When a des element is clicked
$('.des').click(function(){
  handleEvent(current, des);
});
//Default; for both des and dev
$('.both').click(function(){
  handleEvent(current, both);
});

//=======================MOST OF THE COLOR PICKING WORK IS DONE ABOVE HERE
//--WHILE BELOW IS EVENT WORK============================================

//This is the actual event itself
function handleEvent(col, chosen) {
    event.preventDefault();
    // if (e.touches) { 
    //   e = e.touches[0];
    //   console.log("e:", e);
    //   console.log(e.touches[0]);
    // }
    var currentColor = col;
    var nextColor = chosen;
    var targetR = calcPageFillRadius(event.pageX, event.pageY);
    var rippleSize = Math.min(200, (cW * .4));
    var minCoverDuration = 750;
    
    var pageFill = new Circle({
      x: event.pageX,
      y: event.pageY,
      r: 0,
      fill: nextColor //Color filled DURING anim [!]
    });
    var fillAnimation = anime({
      targets: pageFill,
      r: targetR,
      duration:  Math.max(targetR / 2 , minCoverDuration ),
      easing: "easeOutQuart",
      complete: function(){
        bgColor = pageFill.fill; //Color filled AFTER anim
        removeAnimation(fillAnimation);
      }
    });
    
    var ripple = new Circle({
      x: event.pageX,
      y: event.pageY,
      r: 0,
      fill: currentColor, //Radial boom color
      stroke: {
        width: 3,
        color: currentColor //Radial boom stroke color
      },
      opacity: 1
    });
    var rippleAnimation = anime({
      targets: ripple,
      r: rippleSize,
      opacity: 0,
      easing: "easeOutExpo",
      duration: 900,
      complete: removeAnimation
    });
    
    var particles = [];
    for (var i=0; i<18; i++) {
      var particle = new Circle({
        x: event.pageX,
        y: event.pageY,
        fill: currentColor, //Particle color
        r: anime.random(24, 48)
      })
      particles.push(particle);
    }
    var particlesAnimation = anime({
      targets: particles,
      x: function(particle){
        return particle.x + anime.random(rippleSize, -rippleSize);
      },
      y: function(particle){
        return particle.y + anime.random(rippleSize * 1.15, -rippleSize * 1.15);
      },
      r: 0,
      easing: "easeOutExpo",
      duration: anime.random(1000,1300),
      complete: removeAnimation
    });
    animations.push(fillAnimation, rippleAnimation, particlesAnimation);
    current = chosen;
}

//Page fill for anim===============//
function calcPageFillRadius(x, y) {
  var l = Math.max(x - 0, cW - x);
  var h = Math.max(y - 0, cH - y);
  return Math.sqrt(Math.pow(l, 2) + Math.pow(h, 2));
}

//Circle Object to draw============//
var Circle = function(opts) {
  extend(this, opts);
}

function extend(a, b){
  for(var key in b) {
    if(b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
}

Circle.prototype.draw = function() {
  ctx.globalAlpha = this.opacity || 1;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  if (this.stroke) {
    ctx.strokeStyle = this.stroke.color;
    ctx.lineWidth = this.stroke.width;
    ctx.stroke();
  }
  if (this.fill) {
    ctx.fillStyle = this.fill; //Actual fill color [!]
    ctx.fill();
  }
  ctx.closePath();
  ctx.globalAlpha = 1;
}

//Actual animation=================//
var animate = anime({
  duration: Infinity,
  update: function() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, cW, cH);
    animations.forEach(function(anim) {
      anim.animatables.forEach(function(animatable) {
        animatable.target.draw();
      });
    });
  }
});

//Canvas resize to page==============//
var resizeCanvas = function() {
  cW = window.innerWidth;
  cH = window.innerHeight;
  c.width = cW * devicePixelRatio;
  c.height = cH * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);
};

(function init() {
  resizeCanvas();
  if (window.CP) {
    // CodePen's loop detection was causin' problems
    // and I have no idea why, so...
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 6000; 
  }
  window.addEventListener("resize", resizeCanvas);
})();