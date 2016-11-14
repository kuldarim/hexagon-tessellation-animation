app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
var proj= app.newProject();

// constants
var TIME = 7;
var COORDINATES = [];

var SIZE = prompt("Iveskite apskritimo ploti", 100);

var myComp = proj.items.addComp("hexagon-tessellation", 600, 400, 1, TIME, 25);
myComp.openInViewer();

var x = myComp.width / 2;
var y = myComp.height / 2;
var TOP_LEFT = [-x, y];
var TOP_RIGHT = [x, y];
var BOTTOM_LEFT = [-x, -y];
var BOTTOM_RIGHT = [x, -y];

draw(myComp);

function draw(composition) {
  var positionX = 200;
  var positionY = 0;

  // Draw center hexagon
  drawHexagon("initial", positionX, positionY, 6, 0);

  // Draw a ring of hexagons
  for (var i = 1; i <= 2; i++) {
    var isInBoundaries = drawHexagonRing(positionX, positionY, 6, i);
  }

  
  isInBoundaries = true;
  var i = 1;
  while (isInBoundaries) {
    isInBoundaries = drawHexagonRing(positionX, positionY, 6, i);
    alert(i);
    if (i > 20) {
     isInBoundaries = false;
    }
    i++;
  }
}

// http://www.redblobgames.com/grids/hexagons/ 
// http://stackoverflow.com/questions/14916941/draw-a-hexagon-tessellation-animation-in-python
function drawHexagonRing(x, y, n, ringsNumber) {
  var dc = SIZE * Math.sqrt(3);
  var xc = x;
  var yc = y - ringsNumber * dc;
  var dx = -dc * Math.sqrt(3) / 2;
  var dy = dc / 2;
  var allHexagonsAreInBoundaries = [];
  for (var i = 0; i < 6; i++) {
    var isHexagonInBoundaries = [];
    for (var j = 0; j < ringsNumber; j++) {
      var xc = xc + dx;
      var yc = yc + dy;
      // alert (xc + ' ' + yc);
      drawHexagon(ringsNumber + '_' + i + '_' + j, xc, yc, n, ringsNumber);
      isHexagonInBoundaries.push(isInBoundaries(xc, yc));
    }
    if (isHexagonInBoundaries.length > 0) {
    	allHexagonsAreInBoundaries.push(allAreTrue(isHexagonInBoundaries));
    }
    var tmpdx = dx;
    var tmpdy = dy;
    dx = Math.cos(Math.PI / 3) * tmpdx + Math.sin(Math.PI / 3) * tmpdy;
    dy = -Math.sin(Math.PI / 3) * tmpdx + Math.cos(Math.PI / 3) * tmpdy;
  }

  return allAreTrue(allHexagonsAreInBoundaries);
}

function isInBoundaries(x, y) {
  var inX = x > BOTTOM_LEFT[0] && x < TOP_RIGHT[0];
  var inY = y > BOTTOM_LEFT[1] && y < TOP_RIGHT[1];

  return inX && inY;
}

function allAreTrue(array) {
  var yes = false;
  for(var i = 0; i < array.length; i++) {
    yes = yes || array[i];
  }

  return yes;
}

function drawHexagon(name, x, y, n, ringsNumber) {
  COORDINATES.push({});
  var shapeVertices = getPolyginVertices(n, SIZE, x, y, ringsNumber);
  var shapePosition = [];
  if (ringsNumber > 0) {
    var index = getIndexFromCoordinates(shapeVertices, ringsNumber);
    var modifiedVertices = changeOrder(shapeVertices, index);
    shapePosition = addShape(name, modifiedVertices, ringsNumber);
  } else {
    shapePosition = addShape(name, shapeVertices, ringsNumber);
  }
  //alert()
  return shapePosition;
}

function addShape(name, vertices, ringsNumber) {
    var myShape = myComp.layers.addShape();
    myShape.name = (name);
    var myShapeContent1 = myShape.property("Contents").addProperty("ADBE Vector Group");
    var myShapeGroup1 = myShape.property("Contents").property("Group 1");

    var myShapePath= myShapeGroup1.property("Contents").addProperty("ADBE Vector Shape - Group");
    var myShapeMask = myShapePath.property("Path");
    var myShapeM = myShapeMask.value;
    myShapeM.vertices = vertices;
    myShapeMask.setValue(myShapeM);

    myShapeGroup1.property("Contents")
        .addProperty("ADBE Vector Graphic - Stroke")
        .property("Color").setValue([0, 0, 0]);

    var trim = myShape.property("Contents")
        .addProperty("ADBE Vector Filter - Trim");

    // add animation keyframes

    trim.property("End").setValueAtTime(ringsNumber, 0);
    trim.property("End").setValueAtTime(ringsNumber + 1, 100);

    return myShape.property("Position").value;

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

// Helper functions

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
      index = i;
    }
  }

  return index;
}

/*
* returns biggest boundary
*/
function findBiggestBoundary(compositionX, compositionY, centerX, centerY) {
  var boundary1 = centerX;
  var boundary2 = centerY;
  var boundary3 = compositionX/2 - centerX;
  var boundary4 = compositionY/2 - centerX;

  return Math.max(boundary1, boundary2, boundary3, boundary4);
}