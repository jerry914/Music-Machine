var nSteps = 8;
var nTracks = 6;
var cells = [];
var users = [];
var currentStep = 0;
var beats = 0;
var cellWidth, cellHeight;
var playBtn;
var machineIsOn = 0;
// Sound
var noteNames = ["A1", "B1", "C2", "D2", "E2", "F2"];
var player;
// Visuals
var t = 10;
var l = 20;
var gridWidth, gridHeight, cellWidth, cellHeight;
var blue;
var colors = ["#ffc7ac","#fba09b","#ff7e82","#ff6a7f","#ff5970","#f2295d"];

function preLoad(){
  //bgm = loadSound('bgm2.mp3');
}


function setup() {
  createCanvas(360,140);
  gridWidth = 500;
  gridHeight = 500 - 2*t;
  cellWidth = 400;
  cellHeight = 20;
  blue =  color(255, 207, 171);

  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(startMachine);
  
  // Sequencer
   //Initialize all sequencer cells.ON: 1. OFF: 0.
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = 0;
    }
  }
}
function startMachine(){
  tone_head();
  player = new Tone.Sampler(
    {
      "A1" : "sound1.mp3",
      "B1" : "sound14.mp3",
      "C2" : "sound11.mp3",
      "D2" : "sound15.mp3",
      "E2" : "sound6.mp3",
      "F2" : "sound13.mp3"
      
    }
);
  player.toMaster();
  Tone.Transport.scheduleRepeat(onBeat, "16n");
  Tone.Transport.bpm.value = 50;
  Tone.Transport.start();
  machineIsOn = 1;
}


function onBeat(time){
  // If the current beat is on, play it
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      var note = noteNames[(noteNames.length - track - 1) % noteNames.length];
      player.triggerAttack(note, time);
      //image(cat, 10, 10, 50, 50);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}

function draw(){
  background(40,40,40);
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
    line(l + x, t, l + x, t + 120);
  }
  
  // Highlight current step
  if(beats > 0 && machineIsOn){
  	var highlight = (beats - 1) % nSteps;
    fill(253, 188, 180, 50);
    noStroke();
    rect(l + highlight * (cellWidth/10), t, cellWidth/10, 120)
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


function machine_action(user,beat){
  
  let player_idx = users.indexOf(user);
  let beat_idx = parseInt(beat);
  if(player_idx!=-1 && beat_idx>=0 && beat_idx<8){
    console.log(player_idx,beat_idx);
    cells[player_idx][beat_idx] = !cells[player_idx][beat_idx] ;
  }
}

function machine_kill_row(idx){
  if(cells[idx]){
    for(let i=0;i<nSteps;i++){
      cells[idx][i] = 0;
    }
  }
}