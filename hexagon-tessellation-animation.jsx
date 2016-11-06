app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
var proj= app.newProject();

// constants
var SIZE = 50;
var TIME = 4;

var myComp = proj.items.addComp("hexagon-tessellation",1280,720,1,TIME,25);
myComp.openInViewer();

drawHexagon("initial", 0, 0, 6, 0);
drawHexagonRing(0,0,6,1);
drawHexagonRing(0,0,6,2);
drawHexagonRing(0,0,6,3);

// http://www.redblobgames.com/grids/hexagons/ 
// http://stackoverflow.com/questions/14916941/draw-a-hexagon-tessellation-animation-in-python
function drawHexagonRing(x, y, n, ringsNumber) {
    var dc = SIZE * Math.sqrt(3);
    var xc = x;
    var yc = y-ringsNumber*dc;
    var dx = -dc* Math.sqrt(3)/2;
    var dy = dc/2;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < ringsNumber; j++) {
            var xc = xc + dx;
            var yc = yc + dy;
            drawHexagon(i+'_'+j, xc, yc, n, ringsNumber);
        }
        var tmpdx = dx;
        var tmpdy = dy;
        dx = Math.cos(Math.PI/3)*tmpdx+Math.sin(Math.PI/3)*tmpdy;
        dy = -Math.sin(Math.PI/3)*tmpdx+Math.cos(Math.PI/3)*tmpdy;
    }
}

function drawHexagon(name, x, y, n, ringsNumber) {
    var shapeVertices = getPolyginVertices(n, SIZE, x, y);
    addShape(name, shapeVertices, ringsNumber);
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

}


// http://www.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/
// http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
function getPolyginVertices(numberOfSides, size, Xcenter, Ycenter) {
    var verticesArray = [];
 
    for (var i = 0; i <= numberOfSides; i++) {
        var angleDeg = 60 * i;
        var angleRad = Math.PI / 180 * angleDeg;
        var x = Xcenter + size * Math.cos(angleRad);
        var y = Ycenter + size * Math.sin(angleRad);
        verticesArray.push([x,y]);
    }

    return verticesArray;
}