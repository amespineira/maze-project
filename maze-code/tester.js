var MapObj= require('./mapObj.js');

console.log(MapObj);
var testSpecs={
  impCor: [[0,3],[4,4],[4,3],[4,2],[4,1],[6,3]],
  // impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
  size: [10,10],
  // size is the size of the two dimensional array, formatted [sX,sY]
  goal:[9,4],
  // goal is the end point of the maze, formated [gX, gY]
  start:[0,2]
  // start is the starting point of the maze, formatted [sX, sY]
}
var testMap=new MapObj(testSpecs)
console.log(testMap);

var otherTestSpecs={
  impCor: [[0,3],[4,4],[6,3]],
  // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
  size: [100,100],
  // size is the size of the two dimensional array, formatted [sX,sY]
  goal:[50,50],
  // goal is the end point of the maze, formated [gX, gY]
  start:[90,91]
  // start is the starting point of the maze, formatted [sX, sY]
}
var otherTestMap=new MapObj(otherTestSpecs)
console.log(otherTestMap);
otherTestMap.solved.forEach(function(value){
  console.log(value.toString());
})
