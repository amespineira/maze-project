var apiUrl="https://localhost:3000/"
function getMazes(){
  var httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
      if(httpRequest.status < 400) {
     result=JSON.parse(httpRequest.responseText);
     displayMazeList();
    }
  }
  }
  var url="https://localhost:3000/mazes/"
  httpRequest.open('GET', url);
  httpRequest.send();
};
function displayMazeList(){
  mazeContainer.innerHTML="";
  console.log(result);
  for(var i=0; i<result.length; i++){
    var button=document.createElement("button")
    button.setAttribute("class", "maze-file");
    button.value=i;
    button.innerHTML=result[i].name;
    mazeContainer.appendChild(button);
  }
  $('.maze-file').click(function(){
    console.log(this);
    currentMapSpecs=result[this.value].specs;
    isStart=true;
    isGoal=true;
    mazeContainer.innerHTML="";
    displaySolvedMaze(new MapObj(currentMapSpecs))
    currentMapSpecs=blankMap;

  })
}
function submitMaze(nameIn){
  console.log(parseDomToMapSpecs())
  var data={
    name:nameIn,
    specs:parseDomToMapSpecs()
  }
  var settings = {
    "url": apiUrl+"mazes/",
    "method": "POST",
    "data": data
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}
