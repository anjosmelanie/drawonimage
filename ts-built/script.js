var canvas;
var ctx;
var rect;
var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
    createCanvas();
    rect = canvas.getBoundingClientRect(); //To calculate offset
};
function Hotspot(id, type, coordinates, color, radius) {
    this.id = id;
    this.type = type;
    this.coordinates = coordinates;
    this.color = color;
    this.radius = radius;
}
var hotspots = [];
// END
var CIRCLE = "circle";
var POLYGON = "polygon";
var RECTANGLE = "rectangle";
var id = 0;
function createCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = background.width;
    canvas.height = background.height;
    canvas.id = "canvas-1";
    document.getElementById("canvas-here").appendChild(canvas);
    this.ctx.drawImage(background, 0, 0);
}
/* Create Hotspot Functions  ----------------------------------------------------------- */
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
function createCircle() {
    var canvas = document.getElementById("canvas-1");
    canvas.addEventListener("dblclick", function (e) {
        var radius = random_radius();
        var color = random_rgb();
        var coordinates = offsetCoordinates(e.clientX, e.clientY);
        var coords = { "x": coordinates.x, "y": coordinates.y };
        drawCircle(coords, color, radius);
        addSimpleHotspot(id++, CIRCLE, coords, color, radius);
    });
}
//Draws correct position :)
function drawMyPath() {
    var _this = this;
    var canvas = document.getElementById("canvas-1");
    var coordinates = [];
    var color = random_rgb();
    canvas.addEventListener("click", getCoordinatesOnClick.bind(coordinates));
    canvas.addEventListener("dblclick", function (e) {
        var newCoordinates = fixCoordinatesArray(coordinates);
        coordinates = [];
        if (canvas.getContext) {
            var ctx_2 = canvas.getContext("2d");
            ctx_2.fillStyle = random_rgb();
            _this.ctx.beginPath();
            //console.log("Coords:" + newCoordinates[0].x + "," + newCoordinates[0].y);
            ctx_2.moveTo(newCoordinates[0].x, newCoordinates[0].y); //First step
            for (var a = 1; a < newCoordinates.length; a++) {
                ctx_2.stroke();
                //console.log("Coords:" + newCoordinates[a].x + "," + newCoordinates[a].y);
                ctx_2.lineTo(newCoordinates[a].x, newCoordinates[a].y);
            }
            ctx_2.stroke();
            ctx_2.fill();
        }
        //addPolygonHotspot(newCoordinates);
        addSimpleHotspot(id++, POLYGON, coordinates, color, undefined);
    });
}
/* Draw Hotspots Functions ------------------------------------------------------------ */
function readHotspots() {
    for (var a = 0; a < hotspots.length; a++) {
        console.log(hotspots[a]);
    }
}
//hotspots.push({"type": CIRCLE, "coordinates": coordinates, "color": color, "radius": option});
function drawOneHotspot(index) {
    var spot = hotspots[index]; //Instead of this it should be lookup by id but it works for now
    if (spot.type == CIRCLE) {
        drawCircle(spot.coordinates, spot.color, spot.radius);
    }
    else if (spot.type == RECTANGLE) {
        console.log(RECTANGLE);
    }
    else if (spot.type == POLYGON) {
        console.log(POLYGON);
    }
}
function drawAllHotspots() {
}
function drawCircle(coordinates, color, radius) {
    var canvas = document.getElementById("canvas-1");
    console.log(color);
    var x = coordinates.x;
    var y = coordinates.y;
    if (canvas.getContext) {
        var ctx_3 = canvas.getContext("2d");
        ctx_3.fillStyle = color;
        ctx_3.beginPath();
        ctx_3.arc(x, y, radius, 0, 2 * Math.PI);
        ctx_3.stroke();
        ctx_3.fill();
        console.log(x, y, radius, color);
    }
}
function resetCanvas(id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx_4 = canvas.getContext("2d");
        ctx_4.clearRect(0, 0, canvas.width, canvas.height);
        ctx_4.drawImage(background, 0, 0);
    }
}
/* Helper Functions ------------------------------------------------------------------- */
function storeCoordinate(xVal, yVal, array) {
    array.push({ "x": xVal, "y": yVal });
}
function createButton(hotspotId) {
    var element = document.createElement("input");
    element.value = hotspotId;
    element.type = "button";
    element.setAttribute('onclick', "drawOneHotspot('" + hotspotId + "')");
    document.getElementById("hotspots-here").appendChild(element);
}
function getCoordinatesOnClick(event) {
    var coord = offsetCoordinates(event.clientX, event.clientY);
    storeCoordinate(coord.x, coord.y, this);
}
function offsetCoordinates(xVal, yVal) {
    var x = xVal - rect.left;
    var y = yVal - rect.top;
    return { x: x, y: y };
}
/* Remove the first click (button press), the last two clicks (double click to end) and add the first coordinate to the end */
function fixCoordinatesArray(array) {
    var newCoordinates = [];
    for (var a = 1; a <= array.length - 2; a++) {
        newCoordinates.push({ "x": array[a].x, "y": array[a].y });
    }
    newCoordinates.push({ "x": array[1].x, "y": array[1].y }); //Back to starting point
    return newCoordinates;
}
function addSimpleHotspot(id, type, coordinates, color, radius) {
    if (type == CIRCLE) {
        hotspots.push(new Hotspot(id, CIRCLE, coordinates, color, radius));
    }
    else if (type == RECTANGLE) {
        //TO DO: rectangle
    }
    else if (type = POLYGON) {
        hotspots.push(new Hotspot(id, POLYGON, coordinates, random_rgb(), undefined));
    }
    createButton(id);
}
/* Fun Functions ---------------------------------------------------------------------- */
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return "rgb(" + o(r() * s) + " " + o(r() * s) + " " + o(r() * s) + " / 35%)";
}
function random_radius() {
    var o = Math.round, r = Math.random, s = 150;
    return o(r() * s);
}
