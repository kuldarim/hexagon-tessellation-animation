app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
var proj= app.newProject();

// constants
var SIZE = 50;

var myComp = proj.items.addComp("test2",1280,720,1,60,25);
myComp.openInViewer();

drawHexagon("initial", 0, 0, 6);

drawHexagonRing(0,0,6,1);
drawHexagonRing(0,0,6,2);
drawHexagonRing(0,0,6,3);

// http://www.redblobgames.com/grids/hexagons/
function drawHexagonRing(x, y, n, r) {
    var dc = SIZE * Math.sqrt(3);
    var xc = x;
    var yc = y-r*dc;
    var dx = -dc* Math.sqrt(3)/2;
    var dy = dc/2;
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < r; j++) {
            var xc = xc + dx;
            var yc = yc + dy;
            drawHexagon(i+'_'+j, xc, yc, n);
        }
        var tmpdx = dx;
        var tmpdy = dy;
        dx = Math.cos(Math.PI/3)*tmpdx+Math.sin(Math.PI/3)*tmpdy;
        dy = -Math.sin(Math.PI/3)*tmpdx+Math.cos(Math.PI/3)*tmpdy;
    }
}

function drawHexagon(name, x, y, n) {
    var shapeVertices = getPolyginVertices(n, SIZE, x, y);
    addShape(name, shapeVertices);
}

function addShape(name, vertices) {
    var myShape = myComp.layers.addShape();
    myShape.name = (name);
    var myShapeContent1 = myShape.property("Contents").addProperty("ADBE Vector Group");
    var myShapeGroup1 = myShape.property("Contents").property("Group 1");

    var myShapePath= myShapeGroup1.property("Contents").addProperty("ADBE Vector Shape - Group");
    var myShapeMask = myShapePath.property("Path");
    var myShapeM = myShapeMask.value;
    myShapeM.vertices = vertices;
    myShapeM.closed = true;
    myShapeMask.setValue(myShapeM);
    var myShapeFill= myShapeGroup1.property("Contents").addProperty("ADBE Vector Graphic - Fill");
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