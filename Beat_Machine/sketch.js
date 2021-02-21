
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


// Visuals
var t = 10;
var l = 20;
var i;
var gridWidth, gridHeight, cellWidth, cellHeight;
var blue;
var colors = ["#ffc7ac","#fba09b","#ff7e82","#ff6a7f","#ff5970","#f2295d","#ffc7ac","#fba09b","#ff7e82","#ff6a7f","#ff5970","#f2295d"];




function setup() {
  createCanvas(480,240);
  gridWidth = 1000;
  gridHeight = 1000 - 2*t;
  cellWidth = 400;
  cellHeight = 20;
  blue =  color(255, 207, 171);

  // Sound
  Tone.Transport.start();
  
}

function onBeat(){
  var msg = {
    'content': str(currentStep),
    'type': 'send'
  };
  sendMsg(msg);
  for(var track = 0; track < nTracks; track++){
    if(midi_data[track][currentStep] == 1){
      var note = noteNames[(noteNames.length - track - 1) % noteNames.length];
      player.triggerAttack(note);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}

function draw(){
  background('#09023Faa');
  // Draw midi_data that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(midi_data[track][step] == 1){
        var notePos = nTracks - 1 - track; 
        var col = colors[notePos % 7];
        fill(col);
        rect(l+ step*(cellWidth/10), t + track*cellHeight, cellWidth/10, cellHeight);
      }
    }
  }
  
  stroke(blue);
  // Draw horizontal lines
  for(i = 0; i <= nTracks; i++){
    var y = t + i*cellHeight;
    right = 340;
    line(l, y, right, y);
    
  }
  
  // Draw vertical lines
  for(i = 0; i <= nSteps; i++){
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

  var theSpeed = floor(map(speedVal,0,100,3,15));
  if(frameCount%theSpeed == 0 && machine_open){
    onBeat();
  }
}




function machine_action(beat){
  console.log("main_midi",beat);
  melody_y = parseInt((beat-1)/5);
  melody_x = (beat-1)%5+5;
  midi_data[melody_x][melody_y] = !midi_data[melody_x][melody_y] ;
}

function machine_kill_row(idx){
  if(midi_data[idx]){
    for(let i=0;i<nSteps;i++){
      midi_data[idx][i] = 0;
    }
  }
}
