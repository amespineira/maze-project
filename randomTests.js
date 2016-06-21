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
var randomMapSpecs=generateMaze([globalSize,globalSize], {})
displaySolvedMaze(new MapObj(randomMapSpecs))
$(document).on('click', '.maze-square', changeBlockState);
// $(document).on('hover', '.maze-square', hoverHandler);
$(".maze-square").hover(hoverIn, hoverOut);
$("#solve-button").click(function(){
  if(quickValCheck()){
  parseDomToMapSpecs();
  mazeContainer.innerHTML="";
  displaySolvedMaze(new MapObj(currentMapSpecs));
  $(".maze-square").hover(hoverIn, hoverOut);
  currentMapSpecs.impCor=[];
  }
  else{
    console.log("not valid");
  }
})
