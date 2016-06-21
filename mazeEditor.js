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
  // impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
  size: [globalSize, globalSize],
  // size is the size of the two dimensional array, formatted [sX,sY]
  goal:[globalSize-1,globalSize-1],
  // goal is the end point of the maze, formated [gX, gY]
  start:[0,0]
  // start is the starting point of the maze, formatted [sX, sY]
};
displayBlankMaze(globalSize);
$(document).on('click', '.maze-square', changeBlockState);


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
      // var row=document.createElement('div')
      // row.setAttribute("class", "row")
      // row.value=i;
      // for(var j=0; j<mazeSize; j++)
      var style="background-color:white; width: "+blockSize+"; height: "+blockSize+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      createBlock(i, style)
      // mazeContainer.appendChild(row);
  }
//   var origcollor;
//   $('.maze-square').hover(function(){
//     origcollor=$(this).css('background-color')
//     $(this).css("background-color", "#81a8d8");
//     }, function(){
//     $(this).css("background-color", origcollor);
// });
}
function displayUnsolvedMaze(mapObj){
  mapObj.map.forEach(function(value){
    value.forEach(function(block, i){
      var size="1%";
      var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // if(length===i){
      // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // }
      switch(block){
        case "x":
          style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "_":
          style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "s":
          style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case 1:
          style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
      }
        createBlock(i, style)
    })
    })
}
function displaySolvedMaze(mapObj){
    mapObj.solved.forEach(function(value){
      value.forEach(function(block, i){
        var size=1;
        var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // if(length===i){
        // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // }
        switch(block){
          case "p":
            style="background-color:blue; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "x":
            style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "_":
            style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "s":
            style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case 1:
            style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
        }
          createBlock(i, style)
      })
      })

}
function createBlock(i, style){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  block.setAttribute('value', i+" x")
  mazeContainer.appendChild(block)

}
function randomHex(){
  var out="#";
  for(var i=0; i<6; i++){
    out+=hexarray[getRandomInt(0,hex.length)]
  }
  return out;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
