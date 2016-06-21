var mazeContainer=document.getElementById('maze-container');
var body=document.getElementsByTagName('body')
var hex="ABCDEF1234567890";
var hexarray=hex.split("");
var globalSize=87;
var isStart=false;
var startVal=0;
var isGoal=false;
var goalVal=0;
var currentMapSpecs={
  impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
  size: [globalSize, globalSize],
  // size is the size of the two dimensional array, formatted [sY,sX]
  goal:[globalSize-1,globalSize-1],
  // goal is the end point of the maze, formated [gY, gX]
  start:[0,0]
  // start is the starting point of the maze, formatted [sY, sX]
};
displayBlankMaze(globalSize);
$(document).on('click', '.maze-square', changeBlockState);
$("#solve-button").click(function(){
  if(quickValCheck()){
  parseDomToMapSpecs();
  mazeContainer.innerHTML="";
  displaySolvedMaze(new MapObj(currentMapSpecs));
  }
  else{
    console.log("not valid");
  }
})
function parseDomToMapSpecs(){

  currentMapSpecs.start=calc2DCorFromVal(startVal);
  currentMapSpecs.goal=calc2DCorFromVal(goalVal);
  console.log(currentMapSpecs);
}
function calc2DCorFromVal(val){
  var row=0;
  while(((row+1)*globalSize)<val){
    row++;
  }
  var col=val-((row)*globalSize);
  return [row, col]
}
function quickValCheck(){
  return (isGoal&&isStart)
}
function changeBlockState(event){

  var value=this.getAttribute('value').split(' ');
  switch($('#edit-selector').val()){
    case 'start':
      changeBlock(this, "s")
      break;
    case 'end':
      changeBlock(this, "1")
      break;
    case 'wall':
      changeBlock(this, "_")
      break;
    case 'clear':
      changeBlock(this, "x")
      break;
    }
  updateBlock(this)

}
function changeBlock(block, switchTo){
  var value=block.getAttribute('value').split(' ')
  var switchFrom=value[1];

  switch(switchFrom){
    case "x":
      switch(switchTo){
        case "x":
          break;
        case "_":
          block.setAttribute('value', value[0]+" _")
          break;
        case "s":
          clearStart();
          block.setAttribute('value', value[0]+" s")
          isStart=true;
          startVal=value[0];
          break;
        case "1":
          clearGoal();
          block.setAttribute('value', value[0]+" 1")
          isGoal=true;
          goalVal=value[0];
          break;
      }
      break;
    case "_":
      switch(switchTo){
        case "x":
          block.setAttribute('value', value[0]+" x")
          break;
        case "_":
          block.setAttribute('value', value[0]+" x")
          break;
        case "s":
          clearStart();
          block.setAttribute('value', value[0]+" s")
          isStart=true;
          startVal=value[0];
          break;
        case "1":
          clearGoal();
          block.setAttribute('value', value[0]+" 1")
          isGoal=true;
          goalVal=value[0];
          break;
      }
      break;
    case "s":
      switch(switchTo){
        case "x":
          clearStart();
          isStart=false;
          block.setAttribute('value', value[0]+" x")
          break;
        case "_":
          clearStart();
          isStart=false;
          block.setAttribute('value', value[0]+" _")
          break;
        case "s":
          clearStart();
          isStart=false;
          startVal=value[0];
          break;
        case "1":
          clearStart();
          isStart=false;
          clearGoal();
          block.setAttribute('value', value[0]+" 1")
          isGoal=true;
          goalVal=value[0];
          break;
      }
      break;
    case "1":
      switch(switchTo){
        case "x":
          clearGoal();
          isGoal=false;
          block.setAttribute('value', value[0]+" x")
          break;
        case "_":
          clearGoal();
          isGoal=false;
          block.setAttribute('value', value[0]+" _")
          break;
        case "s":
          clearGoal();
          isGoal=false;
          clearStart();
          block.setAttribute('value', value[0]+" s")
          isStart=true;
          startVal=value[0];
          break;
        case "1":
          clearGoal();
          isGoal=false;
          goalVal=value[0];
          break;
      }
      break;
  }
}
function clearStart(){
  if(isStart){
    $("[value="+"'"+startVal+" s']").css('background-color','white')
    $("[value="+"'"+startVal+" s']").attr('value',startVal+" x")
  }
}
function clearGoal(){
  if(isGoal){
    $("[value="+"'"+goalVal+" 1']").css('background-color','white')
    $("[value="+"'"+goalVal+" 1']").attr('value',goalVal+" x")
  }
}
function clearPath(){

}
function updateBlock(block){
  var type=block.getAttribute('value').split(' ')[1];
  var size=(1395/globalSize);
  size+="px";
  size="1%"
  var style;
  switch(type){
    case "x":
      style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      break;
    case "_":
      style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      break;
    case "s":
      style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      break;
    case "1":
      style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      break;
  }
  block.setAttribute('style',style)
}
function displayBlankMaze(mazeSize){
  var blockSize=(1395/mazeSize);

  blockSize+="px";
  blockSize="1%"
  for(var i=0; i<mazeSize*mazeSize; i++){
      var style="background-color:white; width: "+blockSize+"; height: "+blockSize+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      createBlock(i, style)
  }

}
