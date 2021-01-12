var blue = ["#e6eff0", "#c8e3ef","#a7cade","#94abc9","#8097b4","#96a4c4","#aab8d8","#ccd1e4"];
var green= ["#deeade","#c2dac0","#94b79b","#78a188","#648c74","#8bafb3","#aec5cc","#d5dce3"];
var red=["#e6d9d8","#e6c4c0","#f2acae","#ed9197","#e3686e","#f09988","#f2b7ac","#f5dcd7"];
var yellow=["#efeadc","#f4e9af","#f5d888","#f2c173","#f2b555","#f2cd55","#f2db94","#f7edcd"];
var purple=["#dbe3f4","#d6cff4","#b9badd","#a7a8d1","#9179b0","#ab8caf","#e4c5ed","#e6d8eb"]

var button=["button0","button1","button2","button3","button4","button5","button6","button7"]


var colorChoice;

function midi_init(clicks){
  switch (clicks) {
    case 0: colorChoice = blue; break;
    case 1: colorChoice = green; break;
    case 2: colorChoice = yellow; break;
    case 3: colorChoice = red; break;
    case 4: colorChoice = purple; break;
    default: colorChoice = '#ffffff'; break;
  }
  
  for(i=0;i<8;i++){
    document.getElementsByClassName("button"+i)[0].style.background=colorChoice[i]+"50";
  }
}

function changeColor(idx){
  if(document.getElementById("button"+idx).value == "Off"){
    document.getElementById("button"+idx).value="On";
    document.getElementById("button"+idx).style.background=colorChoice[0];
  }else{
    document.getElementById("button"+idx).value="Off";
    document.getElementById("button"+idx).style.background=colorChoice[0]+"50";
  }
}
function changeColor_bystate(idx,state){
  if(state==true){
    document.getElementById("button"+idx).value="On";
    document.getElementById("button"+idx).style.background=colorChoice[0];
  }else{
    document.getElementById("button"+idx).value="Off";
    document.getElementById("button"+idx).style.background=colorChoice[0]+"50";
  }
}

function push_midi(idx){
  if(midi_data[idx]==0){
    midi_data[idx]=1;
  }
  else{
    midi_data[idx]=0;
  }
  send(idx,midi_data[idx]);
}