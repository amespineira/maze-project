
function generateMaze(sizein, specs){
  var wallArray=makeWallArray(sizein);
  console.log(wallArray);
  return {
    impCor: genImpCorFromWallCor(wallArray),
    // impCor: [],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function makeWallArray(size){
  var output=[]
  for(var i=0; i<numberH; i++){
    var ran=getRandomInt(0,size[0])
      output.push({
        startx:ran,
        starty:ran,
        endx:getRandomInt(0,size[0]),
        endy:ran
      })
  }
  for(var i=0; i<numberV; i++){
    var ran=getRandomInt(0,size[1])
      output.push({
        starty:ran,
        startx:ran,
        endy:getRandomInt(0,size[1]),
        endx:ran
      })
  }
  return output;
}
// var wallArray=[{
//   startx:1,
//   starty:4,
//   endx:4,
//   endy:4
// },{
//   startx:3,
//   starty:7,
//   endx:7,
//   endy:7
// },
// ]

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
