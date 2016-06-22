var mazeContainer=document.getElementById('maze-container');
var body=document.getElementsByTagName('body')
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
var random=genRandomArray([87,87]);
console.log(random);
displayCells(random)

  random=calcNextStep(random)
  displayCells(random);

function displayCells(arr){
  mazeContainer.innerHTML=""
  var count=0;
  for(var i=0; i<arr.length; i++){
    for(var j=0; j<arr[0].length; j++){
      var size=(1395/globalSize);
      size+="px";
      size="1%"
      var style;
      switch(arr[i][j]){
        case "0":
          style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "1":
          style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
      }
        createBlock(count, style)
        count++;
    }

  }
}
function createBlock(i, style){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  block.setAttribute('value', i+" x")
  mazeContainer.appendChild(block)
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
