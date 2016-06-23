
function generateMaze(sizein, specs, type){
  console.log("genning...");
  console.log(type);
  switch(type){
    case 'cellular':
    return generateCellular(sizein, specs)
      break;
    case 'depth-first':
      return generateDepthFirst(sizein, specs)
      break;
    default:
    return generateDepthFirst(sizein, specs)
  }
}
function generateDepthFirst(sizein ,specs){
  return {
    impCor: generateWallsDepthFirst(sizein),
    // impCor: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[86,86],[85,85],[84,84],[83,83],[82,82],[81,81],[80,80]],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[1,1]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function generateCellular(sizein, specs){
  return {
    impCor: makeWallsCellular(sizein),
    // impCor: [[0,0],[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],[86,86],[85,85],[84,84],[83,83],[82,82],[81,81],[80,80]],
    // impCor is an array of impassable coordinates, formatted [[cX,cY],[cX,cY]....]
    size: sizein,
    // size is the size of the two dimensional array, formatted [sX,sY]
    goal:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])],
    // goal is the end point of the maze, formated [gX, gY]
    start:[getRandomInt(0,sizein[0]),getRandomInt(0,sizein[1])]
    // start is the starting point of the maze, formatted [sX, sY]
  }
}
function returnNumberOfNeighbors(arr, currentCor){
  var neighbors=0;
  var left=currentCor[0]-1;
  var right=currentCor[0]+1;
  var center=currentCor[0];
  var up=currentCor[1]+1;
  var down=currentCor[1]-1;
  if(isValid([arr.length,arr[0].length],[left,center]))
  {
    if(arr[left][center]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[left,up]))
  {
    if(arr[left][up]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[left,down]))
  {
    if(arr[left][down]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[center,up]))
  {
    if(arr[center][up]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[center,down]))
  {
    if(arr[center][down]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[right,center]))
  {
    if(arr[right][center]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[right,up]))
  {
    if(arr[right][up]===1){
      neighbors++;
    }
  }
  if(isValid([arr.length,arr[0].length],[right,down]))
  {
    if(arr[right][down]===1){
      neighbors++;
    }
  }
  return neighbors;

}
function genRandomArray(size){
  var output=[]
  for(var i=0; i<size[0]; i++){
    output.push([])
    for(var j=0; j<size[1]; j++){
      var ran=getRandomInt(0,3)
      if(ran===0){
        output[i].push("1");
      }
      else{
        output[i].push("0");

      }
    }
  }
  return output;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
