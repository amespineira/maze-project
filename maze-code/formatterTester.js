var MapObj= require('./mapObj.js');
var mazeFormatter=require('./mazeFormatter.js')
console.log(MapObj);
var wallArray=[{
  startx:1,
  starty:4,
  endx:4,
  endy:4
},{
  startx:3,
  starty:7,
  endx:7,
  endy:7
},
]
var testSpecs={
  impCor: mazeFormatter.genImpCorFromWallCor(wallArray),
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
