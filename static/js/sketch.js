// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/NCCHQwNAN6Y
var song;
var button;
var amp;

function setup() {
   canvas = createCanvas(75, 45);
   song = loadSound('./../Data/hurricane.mp3', loaded);
   amp = new p5.Amplitude();
   background(192,192,192);
   
   canvas.parent('sketch-holder')
}
function loaded() {
  btn2 = createButton('Play');
  btn2.mousePressed(togglePlaying);
  }


function draw() {
    background(128,128,128);
  
    var vol = amp.getLevel();
    var diam = map(vol, 0, 0.3, 10, 200);
  
    fill("white");
    ellipse(width / 2, height / 2, diam, diam);
  }

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    btn2.html('Pause');
  } else {
    song.stop();
    btn2.html('Play');
  }
}