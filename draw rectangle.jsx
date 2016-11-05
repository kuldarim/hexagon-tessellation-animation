app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES)
var proj= app.newProject();
var myComp = proj.items.addComp("test2",1280,720,1,60,25);
myComp.openInViewer();
var myShape = myComp.layers.addShape();
myShape.name = ("contents");
var myShapeContent1 = myShape.property("Contents").addProperty("ADBE Vector Group");
var myShapeGroup1 = myShape.property("Contents").property("Group 1");

var myShapePath= myShapeGroup1.property("Contents").addProperty("ADBE Vector Shape - Group");
var myShapeMask = myShapePath.property("Path");
var myShapeM = myShapeMask.value;
myShapeM.vertices = getPolyginVertices(6, 50, 25, 25);
myShapeM.closed = true;
myShapeMask.setValue(myShapeM);
var myShapeFill= myShapeGroup1.property("Contents").addProperty("ADBE Vector Graphic - Fill");

var myShapeRoundCorners= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - RC");
var myShapeTrimPaths= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - Trim");
var myShapeTwist= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - Twist");
var myShapeWigglePaths= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - Roughen");
var myShapeWiggleTransform= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - Wiggler");
var myShapeZigZag= myShapeGroup1.property("Contents").addProperty("ADBE Vector Filter - Zigzag");


// http://www.storminthecastle.com/2013/07/24/how-you-can-draw-regular-polygons-with-the-html5-canvas-api/
// http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
function getPolyginVertices(numberOfSides, size, Xcenter, Ycenter) {
    var verticesArray = [];        
 
    for (var i = 0; i <= numberOfSides; i++) {
        var x = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides);
        var y = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides);
        verticesArray.push([x,y]);
    }

    return verticesArray;
}