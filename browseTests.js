var mazeContainer=document.getElementById('maze-container');
var body=document.getElementsByTagName('body')
var globalSize=87;
var isStart=false;
var startVal=0;
var isGoal=false;
var goalVal=0;
var result;
var blankMap={
  impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cY,cX],[cY,cX]....]
  size: [globalSize, globalSize],
  // size is the size of the two dimensional array, formatted [sY,sX]
  goal:[globalSize-1,globalSize-1],
  // goal is the end point of the maze, formated [gY, gX]
  start:[0,0]
  // start is the starting point of the maze, formatted [sY, sX]
};
var currentMapSpecs=blankMap;
displayBlankMaze(globalSize);
$(document).on('click', '.maze-square', changeBlockState);
$(document).on('dblclick', '.maze-square', createWall);

// $(document).on('hover', '.maze-square', hoverHandler);
$("#solve-button").click(function(){

  if(quickValCheck()){
  currentMapSpecs=blankMap;
  parseDomToMapSpecs();
  logShit();
  mazeContainer.innerHTML="";
  displaySolvedMaze(new MapObj(currentMapSpecs));
  }
  else{
    console.log("not valid");
  }
})
$("#browse-button").click(function(){
  getMazes();

})
$("#submit-button").click(function(){
  var name=prompt("please enter a name for the maze", "My Maze");
  if (name != null) {
    submitMaze(name);

  }
})
$('#generate-button').click(function(){
  mazeContainer.innerHTML="";

  currentMapSpecs=generateMaze([globalSize,globalSize], {}, $('#gen-type').val())
  isStart=true;
  isGoal=true;

  displaySolvedMaze(new MapObj(currentMapSpecs))
  logShit();
    currentMapSpecs=blankMap;
})
$('#clear-button').click(function(){
  mazeContainer.innerHTML="";

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
  displayBlankMaze(globalSize);

})
$("#log-button").click(function(){
  logShit();
})
function logShit(){
  // console.log("******currentMapSpecs");
  // console.log(currentMapSpecs);
  // console.log("******startVal");
  // console.log(startVal);
  // console.log("******isStart")
  // console.log(isStart);
  // console.log("******goalVal");
  // console.log(goalVal);
  // console.log("******isGoal")
  // console.log(isGoal);
  // var test=currentMapSpecs;
  // console.log("****morestuff");
  // console.log(test.start);
  // console.log(startVal);
  // console.log("****");
  // console.log(calcValFrom2DCor(test.start));
  // console.log(calc2DCorFromVal(startVal));
  // console.log("****");
  // console.log(test.goal);
  // console.log(goalVal);
  // console.log("****");
  // console.log(calcValFrom2DCor(test.goal));
  // console.log(calc2DCorFromVal(goalVal));
  // console.log(test);
  // parseDomToMapSpecs();
  // console.log(currentMapSpecs);
  // console.log(new MapObj(currentMapSpecs));
}
