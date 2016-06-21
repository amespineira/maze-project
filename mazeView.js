
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
{
  startx:20,
  starty:50,
  endx:40,
  endy:50,
},{
  startx:70,
  starty:30,
  endx:70,
  endy:50,
},
]
var testSpecs={
  impCor: genImpCorFromWallCor(wallArray),
  // impCor: [],
  // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
  size: [87,87],
  // size is the size of the two dimensional array, formatted [sX,sY]
  goal:[70,70],
  // goal is the end point of the maze, formated [gX, gY]
  start:[0,40]
  // start is the starting point of the maze, formatted [sX, sY]
}
var testMap=new MapObj(testSpecs)
var randomSpecs=generateMaze([87,87], {
  numberH:20,
  numberV:20
})
var randomMaze=new MapObj(randomSpecs)
displaySolvedMaze(randomMaze)
