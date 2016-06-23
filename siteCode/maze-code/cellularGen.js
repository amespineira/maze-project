function makeWallsCellular(size){
  var startArr=genRandomArray(size);
  var output=[];
  for(var i=0; i<10; i++){
    startArr=calcNextStep(startArr)
  }
  startArr.forEach(function(row, rowI){
    row.forEach(function(value,colI){
      if(value===1){
        output.push([rowI,colI])
      }
    })
  })
  return output;
}
function generateCellularAlgorithmDemo(size){
  var startArr=genRandomArray(size);
  var output=[];
  for(var i=0; i<10; i++){
    output.push([]);
    startArr.forEach(function(value, ind){
      output[i].push([]);
      for(var j=0; j<value.length; j++){
      (value[j]===1)? output[i][ind].push(1): output[i][ind].push(0);
      }
    })
    startArr=calcNextStep(startArr)
    console.log(startArr);
  }
startArr="it's this now!";
console.log(output);
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
          if(neighbors>1&&neighbors<4){
            next[i][j]=1;
          }
          else{
            next[i][j]=0;
          }
        }
      }
    }
  return next;
}
