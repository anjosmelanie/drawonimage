var canvas;
var ctx;
var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
    createCanvas();
};
//The most important thing on this file!
var hotspots = [];
function createCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1";
    document.getElementById("canvas-here").appendChild(canvas);
    this.ctx.drawImage(background, 0, 0);
}
function drawRectangle() {
    var canvas = document.getElementById("canvas-1");
    if (canvas.getContext) {
        var ctx_1 = canvas.getContext("2d");
        ctx_1.fillRect(25, 25, 100, 100);
        ctx_1.clearRect(45, 45, 60, 60);
        ctx_1.strokeRect(50, 50, 50, 50);
    }
}
//Works with double click
//TODO: Find the radius with click and drag.
function drawCircle() {
    var canvas = document.getElementById("canvas-1");
    canvas.addEventListener("dblclick", function (e) {
        var x = e.clientX;
        var y = e.clientY;
        var radius = random_radius();
        if (canvas.getContext) {
            var ctx_2 = canvas.getContext("2d");
            ctx_2.fillStyle = random_rgb();
            ctx_2.beginPath();
            ctx_2.arc(x, y, radius, 0, 2 * Math.PI);
            ctx_2.stroke();
            ctx_2.fill();
        }
        addSimpleHotspot("circle", x, y, radius);
    });
}
function drawPath() {
    var canvas = document.getElementById("canvas-1");
    if (canvas.getContext) {
        var ctx_3 = canvas.getContext("2d");
        ctx_3.fillStyle = "rgb(255 165 0 / 25%)";
        ctx_3.beginPath();
        ctx_3.moveTo(275, 50);
        ctx_3.lineTo(300, 75);
        ctx_3.lineTo(400, 25);
        ctx_3.lineTo(275, 50);
        ctx_3.fill(); //fill: filled, stroke: only outline
    }
}
function drawMyPath() {
    var _this = this;
    var canvas = document.getElementById("canvas-1");
    var coordinates = [];
    canvas.addEventListener("click", getCoordinatesOnClick.bind(coordinates));
    canvas.addEventListener("dblclick", function (e) {
        var newCoordinates = fixCoordinatesArray(coordinates);
        coordinates = [];
        if (canvas.getContext) {
            var ctx_4 = canvas.getContext("2d");
            ctx_4.fillStyle = random_rgb();
            _this.ctx.beginPath();
            //console.log("Coords:" + newCoordinates[0].x + "," + newCoordinates[0].y);
            ctx_4.moveTo(newCoordinates[0].x, newCoordinates[0].y); //First step
            for (var a = 1; a < newCoordinates.length; a++) {
                ctx_4.stroke();
                //console.log("Coords:" + newCoordinates[a].x + "," + newCoordinates[a].y);
                ctx_4.lineTo(newCoordinates[a].x, newCoordinates[a].y);
            }
            ctx_4.stroke();
            ctx_4.fill();
        }
        addPolygonHotspot(newCoordinates);
    });
}
//var coords = [];
/*
moveTo(x, y)
Moves the pen to the coordinates specified by x and y.

lineTo(x, y)
Draws a line from the current drawing position to the position specified by x and y.

arc(x, y, radius, startAngle, endAngle, counterclockwise)
Draws an arc which is centered at (x, y) position with radius r starting at startAngle and ending at endAngle going in the given direction indicated by counterclockwise (defaulting to clockwise).

arcTo(x1, y1, x2, y2, radius)
Draws an arc with the given control points and radius, connected to the previous point by a straight line. */
function storeCoordinate(xVal, yVal, array) {
    array.push({ "x": xVal, "y": yVal });
}
function getCoordinatesOnClick(event) {
    //console.log("Mouse: " + event.clientX, ", " + event.clientY);
    storeCoordinate(event.clientX, event.clientY, this); //this is the bound coordinate array
}
/* Remove the first click (button press), the last two clicks (double click to end) and add the first coordinate to the end */
//TODO: Offset X, Offset Y
function fixCoordinatesArray(array) {
    var newCoordinates = [];
    for (var a = 1; a <= array.length - 2; a++) {
        newCoordinates.push({ "x": array[a].x, "y": array[a].y });
    }
    newCoordinates.push({ "x": array[1].x, "y": array[1].y }); //Back to starting point
    return newCoordinates;
}
//TODO: Reset canvas
function drawOneHotspot(index) {
    var canvas = document.getElementById("canvas-1");
    if (canvas.getContext) {
        var hotspot = hotspots[index].coordinates;
        var ctx_5 = canvas.getContext("2d");
        ctx_5.fillStyle = random_rgb();
        this.ctx.beginPath();
        ctx_5.moveTo(hotspot[0].x, hotspot[0].y); //First step
        for (var a = 1; a < hotspot.length; a++) {
            ctx_5.lineTo(hotspot[a].x, hotspot[a].y);
        }
        ctx_5.stroke();
        ctx_5.fill();
    }
}
;
function addSimpleHotspot(type, coordX, coordY, option) {
    var coordinates = [];
    coordinates.push({ "x": coordX, "y": coordY });
    if (type == "circle") {
        hotspots.push({ "type": type, "coordinates": coordinates, "radius": option, "color": random_rgb() });
    }
}
function addPolygonHotspot(coordinates) {
    hotspots.push({ "type": "polygon", "coordinates": coordinates, "color": random_rgb() });
}
function readHotspots() {
    for (var a = 0; a < hotspots.length; a++) {
        console.log(hotspots[a]);
    }
}
// For fun!
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return "rgb(" + o(r() * s) + " " + o(r() * s) + " " + o(r() * s) + " / 35%)";
}
function random_radius() {
    var o = Math.round, r = Math.random, s = 150;
    return o(r() * s);
}
