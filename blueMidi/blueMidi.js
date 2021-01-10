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
    document.getElementsByClassName("button"+i)[0].style.background=colorChoice[i]+50;
  }
}


function changeColor1() {
  send(0);
  currentvalue = document.getElementById('button1').value;
  if(currentvalue == "Off"){
    document.getElementById("button1").value="On";
    document.getElementById("button1").style.background=colorChoice[0];
  }else{
    document.getElementById("button1").value="Off";
    document.getElementById("button1").style.background=colorChoice[0]+50;
  }
}
function changeColor2() {
  send(1);
  currentvalue = document.getElementById('button2').value;
  if(currentvalue == "Off"){
    document.getElementById("button2").value="On";
    document.getElementById("button2").style.background=colorChoice[1];
  }else{
    document.getElementById("button2").value="Off";
    document.getElementById("button2").style.background=colorChoice[1]+50;
  }
}
function changeColor3() {
  send(2);
  currentvalue = document.getElementById('button3').value;
  if(currentvalue == "Off"){
    document.getElementById("button3").value="On";
    document.getElementById("button3").style.background=colorChoice[2];
  }else{
    document.getElementById("button3").value="Off";
    document.getElementById("button3").style.background=colorChoice[2]+50;
  }
}
function changeColor4() {
  send(3);
  currentvalue = document.getElementById('button4').value;
  if(currentvalue == "Off"){
    document.getElementById("button4").value="On";
    document.getElementById("button4").style.background=colorChoice[3];
  }else{
    document.getElementById("button4").value="Off";
    document.getElementById("button4").style.background=colorChoice[3]+50;
  }
}
function changeColor5() {
  send(4);
  currentvalue = document.getElementById('button5').value;
  if(currentvalue == "Off"){
    document.getElementById("button5").value="On";
    document.getElementById("button5").style.background=colorChoice[4];
  }else{
    document.getElementById("button5").value="Off";
    document.getElementById("button5").style.background=colorChoice[4]+50;
  }
}
function changeColor6() {
  send(5);
  currentvalue = document.getElementById('button6').value;
  if(currentvalue == "Off"){
    document.getElementById("button6").value="On";
    document.getElementById("button6").style.background=colorChoice[5];
  }else{
    document.getElementById("button6").value="Off";
    document.getElementById("button6").style.background=colorChoice[5]+50;
  }
}
function changeColor7() {
  send(6);
  currentvalue = document.getElementById('button7').value;
  if(currentvalue == "Off"){
    document.getElementById("button7").value="On";
    document.getElementById("button7").style.background=colorChoice[6];
  }else{
    document.getElementById("button7").value="Off";
    document.getElementById("button7").style.background=colorChoice[6]+50;
  }
}
function changeColor8() {
  send(7);
  currentvalue = document.getElementById('button8').value;
  if(currentvalue == "Off"){
    document.getElementById("button8").value="On";
    document.getElementById("button8").style.background=colorChoice[7];
  }else{
    document.getElementById("button8").value="Off";
    document.getElementById("button8").style.background=colorChoice[7]+50;
  }
}
