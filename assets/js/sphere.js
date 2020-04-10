
var strokeOne = 'rgba(75,165,205,1)';
var strokeTwo = 'rgba(80,80,80,.35)';

//When a dev element is clicked
$('.dev').click(function(){
  let stroke = "dev";
  sphereEvent(stroke);
});
//When a des element is clicked
$('.des').click(function(){
  let stroke = "des";
  sphereEvent(stroke);
});
//Default; for both des and dev
$('.both').click(function(){
  let stroke = "both";
  sphereEvent(stroke);
});

function sphereEvent(stroke){
  console.log("sphere event");
  if (stroke === "dev"){
    strokeOne = 'rgba(255,45,65,1)';
  }
}

//Fit to parent elem, resizes with window
function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, {scale: 1});
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
    }
    resize();
    window.addEventListener('resize', resize);
}
  
var logged = false;
var sphereAnimation = (function() {
  
    var sphereEl = document.querySelector('.sphere-animation');
    var spherePathEls = sphereEl.querySelectorAll('.sphere path');
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var animations = [];
  
    fitElementToParent(sphereEl);
  
    var breathAnimation = anime({
      begin: function() {
        for (var i = 0; i < pathLength; i++) {
          animations.push(anime({ //ANIMATION
            targets: spherePathEls[i],
            stroke: {value: [strokeOne, strokeTwo], duration: 1000},
            translateX: [2, -4],
            translateY: [2, -4],
            easing: 'easeOutQuad',
            autoplay: false
          }));
        }
      },
      update: function(ins) {
        animations.forEach(function(animation, i) { //SPHERE WOBBLE
          var percent = (1 - Math.sin((i * .35) + (.0019 * ins.currentTime))) / 2;
          animation.seek(animation.duration * percent);
          if(!logged){ //Log animation object once
            console.log(animations);
            logged = true;
          }
        });
      },
      duration: Infinity,
      autoplay: false
    });
  
    var introAnimation = anime.timeline({
      autoplay: false
    })
    .add({ //NEON LINES
      targets: spherePathEls,
      strokeDashoffset: {
        value: [anime.setDashoffset, 0],
        duration: 3900,
        easing: 'easeInOutCirc',
        delay: anime.stagger(190, {direction: 'reverse'})
      },
      duration: 5000,
      delay: anime.stagger(60, {direction: 'reverse'}),
      easing: 'linear'
    }, 0);
  
    //SHADOW
    var shadowAnimation = anime({
        targets: '#sphereGradient',
        x1: '25%',
        x2: '25%',
        y1: '0%',
        y2: '75%',
        duration: 30000,
        easing: 'easeOutQuint',
        autoplay: false
      }, 0);
  
    function init() {
      introAnimation.play();
      breathAnimation.play();
      shadowAnimation.play();
    }
    
    init();
  
})();