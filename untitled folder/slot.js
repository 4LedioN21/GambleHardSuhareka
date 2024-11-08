var coffeeMachine = (function() {

  var maxTime = 9000, // time measured in milliseconds
    height = 310, // height of reels
    speeds = [], // reel arry speed
    r = [], // reel arry values
    reelArry = [
      ['You', 'You', 'You'],
      ['Are', 'Are', 'Are'],
      ['Gay', 'Gay', 'Gay']
    ],
    slotReels, txt, begin;

  function init() {
    slotReels = document.querySelectorAll('.slots__reel');
    for (i = 0; i < slotReels.length; i++) {
      slotReels[i].innerHTML = '<ul class="items"><li>' + reelArry[i].join('</li><li>') + '</li></ul><ul class="items"><li>' + reelArry[i].join('</li><li>') + '</li></ul>';
      console.log(slotReels.innerHTML);
    }

    txt = document.querySelector('.txt');

    document.querySelector('#spin-cta').addEventListener('click', daMagic);
  }
  var spinSound = new Audio("sound.mp3");
  var spinSound1 = new Audio("sound1.mp3");

  function daMagic() {
    if (begin !== undefined) {
      return;
    }

    spinSound1.currentTime = 0; // reset sound to start if it's played previously
    spinSound1.play();

    for (var i = 0; i < 3; ++i) {
      speeds[i] = Math.random() + .5;
      r[i] = (Math.random() * 3 | 0) * height / 3;
    }


    txt.innerHTML = 'Spinning...';
    animate();
  }

  function animate(now) {
    if (!begin) {
      begin = now;
    }

    var t = now - begin || 0;

    for (var i = 0; i < 3; ++i) {
      slotReels[i].scrollTop = (speeds[i] / maxTime / 2 * (maxTime - t) * (maxTime - t) + r[i]) % height | 0;
      // console.log(slotReels[i]);
    }

    if (t < maxTime) {
      requestAnimationFrame(animate); // animate callback
      // console.log('animate?');
    } else {
      begin = undefined;
      checkWinner();
      // console.log('check');
    }

  }

  function checkWinner() {
    if (r[0] === r[1] && r[1] === r[2]) {
      txt.innerHTML = '<span class="winner">Congrats!!! You are officially Gay!!! !</span>';
      spinSound.currentTime = 0; // reset sound to start if it's played previously
       spinSound.play();
    } else {
      txt.innerHTML = '<span class="loser">Sille sille</span>';
    }
  }

  return {
    init: init
  }

})();

coffeeMachine.init();