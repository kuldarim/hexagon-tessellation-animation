app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
var proj= app.newProject();

// constants
var SIZE = 50;
var TIME = 4;
var COORDINATES = [{},{},{},{}];

var myComp = proj.items.addComp("hexagon-tessellation",1280,720,1,TIME,25);
myComp.openInViewer();

drawHexagon("initial", 0, 0, 6, 0);
drawHexagonRing(0, 0, 6, 1);
drawHexagonRing(0, 0, 6, 2);
drawHexagonRing(0, 0, 6, 3);

// http://www.redblobgames.com/grids/hexagons/ 
// http://stackoverflow.com/questions/14916941/draw-a-hexagon-tessellation-animation-in-python
function drawHexagonRing(x, y, n, ringsNumber) {
  var dc = SIZE * Math.sqrt(3);
  var xc = x;
  var yc = y - ringsNumber * dc;
  var dx = -dc * Math.sqrt(3) / 2;
  var dy = dc / 2;
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < ringsNumber; j++) {
      var xc = xc + dx;
      var yc = yc + dy;
      drawHexagon(i + '_' + j, xc, yc, n, ringsNumber);
    }
    var tmpdx = dx;
    var tmpdy = dy;
    dx = Math.cos(Math.PI / 3) * tmpdx + Math.sin(Math.PI / 3) * tmpdy;
    dy = -Math.sin(Math.PI / 3) * tmpdx + Math.cos(Math.PI / 3) * tmpdy;
  }
}

function drawHexagon(name, x, y, n, ringsNumber) {
  var shapeVertices = getPolyginVertices(n, SIZE, x, y, ringsNumber);
  if (ringsNumber > 0) {
    var index = getIndexFromCoordinates(shapeVertices, ringsNumber);
    var modifiedVertices = changeOrder(shapeVertices, index);
    addShape(name, modifiedVertices, ringsNumber);
  } else {
      addShape(name, shapeVertices, ringsNumber);
  }
  
}

function changeOrder(array, index) {
  var a1 = array.slice(0, index);
  var a2 = array.slice(index);
  return [].concat(a2).concat(a1);
}

function getIndexFromCoordinates(array, ringsNumber) {
  var index = undefined;
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var x = element[0];
    var y = element[1];
    if (COORDINATES[ringsNumber - 1]['' + parseInt(x) + parseInt(y)]) {
      index = i + 1;
    }
  }

  return index;
}


// http://www.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/
// http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
function getPolyginVertices(numberOfSides, size, Xcenter, Ycenter, ringsNumber) {
  var verticesArray = [];

  for (var i = 0; i <= numberOfSides; i++) {
    var angleDeg = 60 * i;
    var angleRad = Math.PI / 180 * angleDeg;
    var x = Xcenter + size * Math.cos(angleRad);
    var y = Ycenter + size * Math.sin(angleRad);
    verticesArray.push([x, y]);
    COORDINATES[ringsNumber]['' + parseInt(x) + parseInt(y)] = true;
  }

  return verticesArray;
}