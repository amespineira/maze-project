function makeWallsCellular(size){
  var startArr=genRandomArray(size);
  var output=[];
  for(var i=0; i<10; i++){
    startArr=calcNextStep(startArr)
  }
  startArr.forEach(function(row, rowI){
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
          if(neighbors>1&&neighbors<4){
            next[i][j]=1;
          }
        }
      }
    }
  return next;
}
