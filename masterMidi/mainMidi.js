var blue = ["#ebdcd3", "#e3c7ca","#ddb9c0","#bec7b0","#dbe2d0"];
var clicks=3;
var colorChoice;
switch (clicks) {
  case 0: colorChoice = red; break;
  case 1: colorChoice = yellow; break;
  case 2: colorChoice = green; break;
  case 3: colorChoice = blue; break;
  case 4: colorChoice = purple; break;
  default: colorChoice = '#ffffff'; break;
}

for(i=0;i<40;i++){
  if(i%5==0){
    document.getElementsByClassName("button"+i)[0].style.background=blue[0]+50;
  }else if(i%5==1){
    document.getElementsByClassName("button"+i)[0].style.background=blue[1]+50;
  }else if(i%5==2){
    document.getElementsByClassName("button"+i)[0].style.background=blue[2]+50;
  }else if(i%5==3){
    document.getElementsByClassName("button"+i)[0].style.background=blue[3]+50;
  }else if(i%5==4){
    document.getElementsByClassName("button"+i)[0].style.background=blue[4]+50;
  }
}

function changeColor(val) {
  send(val);
  currentvalue = document.getElementById('button'+val).value;
  if(currentvalue == "Off"){
    document.getElementById("button"+val).value="On";
    document.getElementById("button"+val).style.background=blue[0];
  }else{
    document.getElementById("button"+val).value="Off";
    document.getElementById("button"+val).style.background=blue[0]+50;
  }
}

function play_btn(){
  currentvalue = document.getElementById('play_btn').value;
  if(currentvalue == "Off"){
    send('on');
    document.getElementById('play_btn').value="On";
    document.getElementById('play_btn').style.opacity = "100%"; 
  }
  else{
    send('off');
    document.getElementById('play_btn').value="Off";
    document.getElementById('play_btn').style.opacity = "40%";
  }
}

var slider = document.getElementById("speedRange");

slider.oninput = function() {
  send("speed "+this.value.toString());
}