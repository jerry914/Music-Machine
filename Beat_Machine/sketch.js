var nSteps = 8;
var nTracks = 10;
var cells = [];
var currentStep = 0;
var beats = 0;
var cellWidth, cellHeight;
// Sound
var noteNames = ["C4", "D4", "E4", "F4", "G4", "A1", "B1", "C2", "D2", "E2"];
var player = new Tone.Sampler(
    {
      "C4" : "guitar1.mp3",  //piano1
      "D4" : "guitar2.mp3",  ///piano2
      "E4" : "piano3.mp3",
      "F4" : "piano4.mp3",
      "G4" : "piano5.mp3",
      
      "A1" : "beat3.mp3",  //sound1
      "B1" : "sound14.mp3",
      "C2" : "sound11.mp3",
      "D2" : "beat1.mp3",  //sound15
      "E2" : "sound6.mp3"
    }
);
player.toMaster();
Tone.Transport.scheduleRepeat(onBeat, "16n");
Tone.Transport.bpm.value = 50;

// Visuals
var t = 10;
var l = 20;
var gridWidth, gridHeight, cellWidth, cellHeight;
var blue;
var colors = ["#ffc7ac","#fba09b","#ff7e82","#ff6a7f","#ff5970","#f2295d","#ffc7ac","#fba09b","#ff7e82","#ff6a7f","#ff5970","#f2295d"];



function setup() {
  createCanvas(360,280);
  gridWidth = 1000;
  gridHeight = 1000 - 2*t;
  cellWidth = 400;
  cellHeight = 20;
  blue =  color(255, 207, 171);
  // Sound
  Tone.Transport.start();
  // Sequencer
   //Initialize all sequencer cells.ON: 1. OFF: 0.
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = 0;
    }
  }
}

function onBeat(time){
  // If the current beat is on, play it
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      var note = noteNames[(noteNames.length - track - 1) % noteNames.length];
      player.triggerAttack(note, time);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}

function draw(){
  background(20);
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        var notePos = nTracks - 1 - track; 
        var col = colors[notePos % 7];
        fill(col);
        rect(l+ step*(cellWidth/10), t + track*cellHeight, cellWidth/10, cellHeight);
      }
    }
  }
  
  stroke(blue);
  // Draw horizontal lines
  for(var i = 0; i <= nTracks; i++){
    var y = t + i*cellHeight;
    right = 340;
    line(l, y, right, y);
    
  }
  
  // Draw vertical lines
  for(var i = 0; i <= nSteps; i++){
    var x = i*(cellWidth/10);
    line(l + x, t, l + x, t + 200);
  }
  
  // Highlight current step
  if(beats > 0){
  	var highlight = (beats - 1) % nSteps;
    fill(253, 188, 180, 50);
    noStroke();
    rect(l + highlight * (cellWidth/10), t, cellWidth/10, 200)
  }
}
function mousePressed(){
  // If the mouse is within the bounds of the canvas
  if( l < mouseX && mouseX < l + (gridWidth*10) &&
      t < mouseY && mouseY < t + (gridHeight*5)){
    // Account for margins
    var x = mouseX - l;
    var y = mouseY - t;
    // Determine which cell the mouse is on
    var i = floor(y / cellHeight);
    var j = floor(x / (cellWidth/10));
    // Toggle cell on/off
    cells[i][j] = !cells[i][j];
  }
}