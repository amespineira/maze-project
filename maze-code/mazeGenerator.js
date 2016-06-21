
function generateMaze(sizein, specs){
  return {
    impCor: makeWallsCelular(sizein),
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
function makeWallsCelular(size){
  var startArr=genRandomArray(size);
  var output=[];
  for(var i=0; i<10; i++){
    startArr=calcNextStep(startArr)
  }
  startArr.forEach(function(row, rowI){
    console.log(row);
    row.forEach(function(value,colI){
      if(value==="1"){
        output.push([rowI,colI])
      }
    })
  })

  return output;
}
function calcNextStep(arr){
  var next=arr;
  for(var i=0; i<arr.length; i++)
    {
      for(var j=0; j<arr[i].length; j++){
        var neighbors=returnNumberOfNeighbors(arr,[i,j])
        if(arr[i][j]===0){
          if(neighbors===3){
            next[i][j]=1;
          }
        }
        else{
          if(neighbors>1&&neighbors<5){
            next[i][j]=1;
          }
        }

      }
    }
  return next;
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
      var ran=getRandomInt(0,2)
      if(ran===0){
        output[i].push("0");
      }
      else{
        output[i].push("1");

      }
    }
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
