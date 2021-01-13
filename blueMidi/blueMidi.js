var blue = ["#a9e8fc","#9ae4fc","#8ae2ff","#77dbfc","#66d9ff","#54d5ff","#3dcfff","#14c4ff"];
var green= ["#a9fcd5","#9dfccf","#8bfcc7","#79fcbe","#62fcb3","#4efca9","#3dfca0","#19ff93"];
var orange=["#ffb09e","#fca490","#fc9983","#ff8e75","#ff8469","#fc7253","#ff6340","#ff542e"];
var pink=["#ff99c4","#ff8fbe","#ff80b5","#ff70ac","#ff61a3","#ff549c","#ff4291","#ff3086"];
var purple=["#c982fa","#c36ffc","#bc61fa","#b853fc","#b240ff","#a626fc","#9e14fa","#9700fc"]

var button=["button0","button1","button2","button3","button4","button5","button6","button7"]

var colorChoice;

function midi_init(clicks){
  switch (clicks) {
    case 0: colorChoice = blue; break;
    case 1: colorChoice = green; break;
    case 2: colorChoice = orange; break;
    case 3: colorChoice = pink; break;
    case 4: colorChoice = purple; break;
    default: colorChoice = '#ffffff'; break;
  }
  for(i=0;i<8;i++){
    document.getElementsByClassName("button"+i)[0].style.background="gray";
  }
}


function changeColor(idx){
  if(document.getElementById("button"+idx).value == "Off"){
    document.getElementById("button"+idx).value="On";
    document.getElementById("button"+idx).style.background=colorChoice[idx];
  }else{
    document.getElementById("button"+idx).value="Off";
    document.getElementById("button"+idx).style.background="gray";
  }
}
function changeColor_bystate(idx,state){
  if(state==true){
    document.getElementById("button"+idx).value="On";
    document.getElementById("button"+idx).style.background=colorChoice[idx];
  }else{
    document.getElementById("button"+idx).value="Off";
    document.getElementById("button"+idx).style.background="gray";
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