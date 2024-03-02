var canvas;
var ctx;
var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
    createCanvas();
};
function createCanvas() {
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1";
    document.body.appendChild(canvas);
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
function drawPath() {
    var canvas = document.getElementById("canvas-1");
    if (canvas.getContext) {
        var ctx_2 = canvas.getContext("2d");
        ctx_2.fillStyle = "rgb(255 165 0 / 25%)";
        ctx_2.beginPath();
        ctx_2.moveTo(275, 50);
        ctx_2.lineTo(300, 75);
        ctx_2.lineTo(400, 25);
        ctx_2.lineTo(275, 50);
        ctx_2.fill(); //fill: filled, stroke: only outline
    }
}
function drawMyPath() {
    var _this = this;
    var canvas = document.getElementById("canvas-1");
    var coordinates = [];
    document.addEventListener("click", getCoordinatesOnClick.bind(coordinates));
    document.addEventListener("dblclick", function (e) {
        console.log(coordinates); //TODO: Remove
        if (canvas.getContext) {
            var init = false;
            var ctx_3 = canvas.getContext("2d");
            ctx_3.fillStyle = "rgb(255 165 0 / 35%)";
            _this.ctx.beginPath();
            ctx_3.moveTo(coordinates[1].x, coordinates[1].y);
            ctx_3.lineTo(coordinates[2].x, coordinates[2].y);
            ctx_3.lineTo(coordinates[3].x, coordinates[3].y);
            ctx_3.lineTo(coordinates[4].x, coordinates[4].y);
            ctx_3.lineTo(coordinates[1].x, coordinates[1].y);
            ctx_3.fill(); //fill: filled, stroke: only outline
            ctx_3.stroke();
        }
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
    //TODO: Aqui la logica de cuando se cierra el array?
}
function getCoordinatesOnClick(event) {
    console.log("Mouse: " + event.clientX, ", " + event.clientY);
    storeCoordinate(event.clientX, event.clientY, this); //this es el array de coordenadas que esta bound
}
