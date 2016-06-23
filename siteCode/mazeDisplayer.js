var mazeContainer=document.getElementById('maze-container');
var body=document.getElementsByTagName('body')
var hex="ABCDEF1234567890";
var hexarray=hex.split("");
function hoverIn(){
  $(this).css('border-color','#82ffcb')
}
function hoverOut(){
  $(this).css('border-color','black')
  // updateAllBlocks();
}
function updateAllBlocks(){
  for(var i=0; i<globalSize*globalSize; i++){
    updateBlock($("[value~='"+i+"']"))
  }
}
function parseDomToMapSpecs(){
  currentMapSpecs={
   impCor: [],
   // impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
   size: [globalSize, globalSize],
   // size is the size of the two dimensional array, formatted [sY,sX]
   goal:[globalSize-1,globalSize-1],
   // goal is the end point of the maze, formated [gY, gX]
   start:[0,0]
   // start is the starting point of the maze, formatted [sY, sX]
 };
  currentMapSpecs.start=calc2DCorFromVal(startVal);
  currentMapSpecs.goal=calc2DCorFromVal(goalVal);
  currentMapSpecs.impCor=[];
  var walls=$("[value~='_']");
  for(var i=0; i<walls.length; i++){
    currentMapSpecs.impCor.push(calc2DCorFromVal(walls[i].attributes[2].nodeValue.split(" ")[0]))
  }
  return currentMapSpecs

}
function calc2DCorFromVal(val){
  var row=0;
  while(((row+1)*globalSize)<=val){
    row++;
  }
  var col=val-((row)*globalSize);
  return [row, col]
}
function calcValFrom2DCor(corIn){
  return (corIn[0]*globalSize+corIn[1])
}
function quickValCheck(){
  return (isGoal&&isStart)
}
function changeBlockState(event){
  clearPath();
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
  $(".path").css('background-color','white')
  $('.path').removeClass('path')
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
  $(".maze-square").hover(hoverIn, hoverOut);

}
function displayBlankMaze(mazeSize){

  currentMapSpecs.impCor=[];

  var blockSize=(1395/mazeSize);
  blockSize+="px";
  blockSize="1%"
  for(var i=0; i<mazeSize*mazeSize; i++){
      var style="background-color:white; width: "+blockSize+"; height: "+blockSize+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      createBlock(i, style)
  }
  $(".maze-square").hover(hoverIn, hoverOut);

}
function displaySolvedMaze(mapObj){
    currentMapSpecs.impCor=[];

    var count=0;
    mapObj.solved.forEach(function(value){
      value.forEach(function(block, i){
        var size="1%";
        var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // if(length===i){
        // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // }
        switch(block){
          case "p":
            style="background-color:#5ad0dc; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
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
          createBlockWithValG(count, style, block)
          count++
      })
      })
      $(".maze-square").hover(hoverIn, hoverOut);

}
function displayUnsolvedMaze(mapObj){
  currentMapSpecs.impCor=[];

  var count=0;
  mapObj.solved.forEach(function(value){
    value.forEach(function(block, i){
      var size="1%";
      var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // if(length===i){
      // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // }
      switch(block){
        case "p":
          style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
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
        createBlockWithVal(count, style, block)
        count++
    })
    })
    $(".maze-square").hover(hoverIn, hoverOut);


}
function displayRelativeArray(mapObj){
  console.log(mapObj.relativeMap);
  var count=0;
  mapObj.relativeMap.forEach(function(value){
    value.forEach(function(block, i){
      var size="1%";
      var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // if(length===i){
      // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // }
      switch(block){
        case "_":
          style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "s":
          style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case 1:
          style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        default:
          style="background-color:rgb("+format(block)+"); width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      }
        createBlockWithValOverRel(count, style, block)
        count++
    })
    })
    $(".maze-square").hover(hoverIn, hoverOut);
}
function format(input){
  // input=input+100;
  input=625-input
  var output=[0,0,0]
  if(input>510){
    output[0]=input-510;
    output[1]=255;
    output[2]=255;
  }
  else if(input>255){
      output[0]=0;
      output[1]=input-255;
      output[2]=255;
  }
  else{
    output[0]=0;
    output[1]=0;
    output[2]=input;
  }
  return output[0]+","+output[1]+","+output[2];
}
function createBlock(i, style){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  block.setAttribute('value', i+" x")
  mazeContainer.appendChild(block)
}
function createBlockWithValOverRel(i, style, val){
  var block=document.createElement('div');
  block.setAttribute("class", "maze-square");
  if(val==="p"){
    block.setAttribute("class", "maze-square path");
    style+="border-color:pink;"
    val="x";
  }
  if(val==="s"){
    startVal=i;
  }
  if(val===1){
    goalVal=i;
  }
  if(val!=1&&Number(val)){
    val="x"
  }
  block.setAttribute('style',style)
  block.setAttribute('value', i+" "+val)
  mazeContainer.appendChild(block)
}
function createBlockWithVal(i, style,val){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  if(val==="p"){
    block.setAttribute("class", "maze-square path");
    val="x";
  }
  if(val==="s"){
    startVal=i;
  }
  if(val===1){
    goalVal=i;
  }
  if(val!=1&&Number(val)){
    val="x"
  }
  block.setAttribute('value', i+" "+val)
  mazeContainer.appendChild(block)
}
function createBlockWithValG(i, style,val){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  if(val==="p"){
    block.setAttribute("class", "maze-square path");
    val="x";
  }
  if(val==="s"){
    startVal=i;
  }
  if(val===1){
    goalVal=i;
  }
  block.setAttribute('value', i+" "+val)
  mazeContainer.appendChild(block)
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function createWall(event){
  clearPath();
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
function displayDepthGen(genArray){
  console.log(genArray);
  var count=0;
  var size="1%";
  genArray.forEach(function(value){
    value.forEach(function(block, i){
      var style="background-color:grey; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";

      if(block!=0){
      style="background-color:rgb("+formatD(block)+"); width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      }
      // if(length===i){

      createBlockWithValOverRel(count, style, block)
      count++
    })
    })
    $(".maze-square").hover(hoverIn, hoverOut);
}
function displayCellGen(genArray){
  console.log(genArray);
  // var count=0;
  // var size="1%";
  // genArray.forEach(function(value){
  //   value.forEach(function(block, i){
  //     var style="background-color:grey; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
  //
  //     if(block!=0){
  //     style="background-color:rgb("+formatD(block)+"); width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
  //     }
  //     // if(length===i){
  //
  //     createBlockWithValOverRel(count, style, block)
  //     count++
  //   })
  //   })
  //   $(".maze-square").hover(hoverIn, hoverOut);
}
function formatD(input){
  // input=input+100;
  input=Math.floor(625-(input/10))
  var output=[0,0,0]
  if(input>510){
    output[0]=input-510;
    output[1]=255;
    output[2]=255;
  }
  else if(input>255){
      output[0]=0;
      output[1]=input-255;
      output[2]=255;
  }
  else{
    output[0]=0;
    output[1]=0;
    output[2]=input;
  }
  return output[0]+","+output[1]+","+output[2];
}
