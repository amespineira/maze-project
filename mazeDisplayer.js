var mazeContainer=document.getElementById('maze-container');
var body=document.getElementsByTagName('body')
var hex="ABCDEF1234567890";
var hexarray=hex.split("");
function displayUnsolvedMaze(mapObj){
  mapObj.map.forEach(function(value){
    value.forEach(function(block, i){
      var size="1%";
      var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // if(length===i){
      // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
      // }
      switch(block){
        case "x":
          style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "_":
          style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case "s":
          style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
        case 1:
          style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
          break;
      }
        createBlock(i, style)
    })
    })
}
function displaySolvedMaze(mapObj){
    var count=0;
    mapObj.solved.forEach(function(value){
      value.forEach(function(block, i){
        var size="1%";
        var style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // if(length===i){
        // var style="background-color:grey; width: "+size+"%; height: "+size+"%; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
        // }
        switch(block){
          case "p":
            style="background-color:#5ad0dc; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "x":
            style="background-color:white; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "_":
            style="background-color:black; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case "s":
            style="background-color:green; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
          case 1:
            style="background-color:red; width: "+size+"; height: "+size+"; float: left; padding-bottom: 1%; margin: 0; padding-top:0;  border-style: solid; border-width:1px;";
            break;
        }
          createBlockWithVal(count, style, block)
          count++
      })
      })

}
function createBlock(i, style){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  block.setAttribute('value', i+" x")
  mazeContainer.appendChild(block)
}
function createBlockWithVal(i, style,val){
  var block=document.createElement('div');
  block.setAttribute('style',style)
  block.setAttribute("class", "maze-square");
  if(val==="p"){
    block.setAttribute("class", "maze-square path");
    val="x";
  }
  block.setAttribute('value', i+" "+val)
  mazeContainer.appendChild(block)
}
function randomHex(){
  var out="#";
  for(var i=0; i<6; i++){
    out+=hexarray[getRandomInt(0,hex.length)]
  }
  return out;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
