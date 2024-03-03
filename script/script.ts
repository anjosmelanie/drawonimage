var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    createCanvas();
}

//The most important thing on this file!
var hotspots = [];

function createCanvas(){
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1"
    document.getElementById("canvas-here").appendChild(canvas);
    this.ctx.drawImage(background,0,0);   
}

function drawRectangle(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
}

//Works with double click
//TODO: Find the radius with click and drag.
function drawCircle(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    canvas.addEventListener("dblclick", (e) => {
        var x = e.clientX; 
        var y = e.clientY;
        var radius = random_radius();
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = random_rgb();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
        addSimpleHotspot("circle", x, y, radius); 
    });
}

function drawPath(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(255 165 0 / 25%)";
      ctx.beginPath();
      ctx.moveTo(275, 50); 
      ctx.lineTo(300, 75);
      ctx.lineTo(400, 25);
      ctx.lineTo(275, 50);
      ctx.fill(); //fill: filled, stroke: only outline
      
    }
}

function drawMyPath(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    var coordinates = [];
    canvas.addEventListener("click", getCoordinatesOnClick.bind(coordinates));
    canvas.addEventListener("dblclick", (e) => { //Double click to stop counting points
        const newCoordinates = fixCoordinatesArray(coordinates);
        coordinates = [];
        if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = random_rgb();
            this.ctx.beginPath();
            //console.log("Coords:" + newCoordinates[0].x + "," + newCoordinates[0].y);
            ctx.moveTo(newCoordinates[0].x, newCoordinates[0].y); //First step
            for(let a=1; a<newCoordinates.length; a++){
                ctx.stroke();
                //console.log("Coords:" + newCoordinates[a].x + "," + newCoordinates[a].y);
                ctx.lineTo(newCoordinates[a].x, newCoordinates[a].y);
            }
            ctx.stroke();
            ctx.fill();
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

function storeCoordinate(xVal, yVal, array){
    array.push({"x": xVal, "y": yVal});
}

function getCoordinatesOnClick(event){
    //console.log("Mouse: " + event.clientX, ", " + event.clientY);
    storeCoordinate(event.clientX, event.clientY, this); //this is the bound coordinate array
}

/* Remove the first click (button press), the last two clicks (double click to end) and add the first coordinate to the end */
//TODO: Offset X, Offset Y
function fixCoordinatesArray(array){
    var newCoordinates = [];
    for(let a = 1; a<=array.length-2; a++){
        newCoordinates.push({"x": array[a].x, "y": array[a].y});
    }
    newCoordinates.push({"x": array[1].x, "y": array[1].y}); //Back to starting point
    return newCoordinates;
}

//TODO: Reset canvas
function drawOneHotspot(index){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    if (canvas.getContext) {
        var hotspot = hotspots[index].coordinates;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = random_rgb();
        this.ctx.beginPath();
        ctx.moveTo(hotspot[0].x, hotspot[0].y); //First step
        for(let a=1; a<hotspot.length; a++){
            ctx.lineTo(hotspot[a].x, hotspot[a].y);
        }
        ctx.stroke();
        ctx.fill();
        
    }
};

function addSimpleHotspot(type, coordX, coordY, option){
    var coordinates = [];
    coordinates.push({"x": coordX, "y": coordY});
    if(type=="circle"){
        hotspots.push({"type": type, "coordinates": coordinates, "radius": option, "color": random_rgb()});
    }
}

function addPolygonHotspot(coordinates){
    hotspots.push({"type": "polygon", "coordinates": coordinates, "color": random_rgb()});
}

function readHotspots(){
    for(let a=0; a<hotspots.length; a++){
        console.log(hotspots[a]);
    }
}

// For fun!
function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return "rgb(" + o(r()*s) + " " + o(r()*s) + " " + o(r()*s) + " / 35%)";
}

function random_radius(){
    var o = Math.round, r = Math.random, s = 150;
    return o(r()*s);
}