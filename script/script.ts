var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;
var rect: DOMRect;

const background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    createCanvas();
    rect = canvas.getBoundingClientRect(); //To calculate offset
}

//The most important thing on this file!
interface Hotspot {
    id: number;
    type: string;
    coordinates: number[];
    color: string;
    radius?: number;
}

function Hotspot(id, type, coordinates, color, radius) {
    this.id = id;
    this.type = type;
    this.coordinates = coordinates;
    this.color = color;
    this.radius = radius;
 }

var hotspots = [];
// END

const CIRCLE = "circle";
const POLYGON = "polygon";
const RECTANGLE = "rectangle";

var id = 0;

function createCanvas(){
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = background.width;
    canvas.height = background.height;
    canvas.id = "canvas-1"
    document.getElementById("canvas-here").appendChild(canvas);
    this.ctx.drawImage(background,0,0);   
}

/* Create Hotspot Functions  ----------------------------------------------------------- */

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
function createCircle(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    canvas.addEventListener("dblclick", (e) => {
        var radius = random_radius();
        var color = random_rgb();
        var coordinates = offsetCoordinates(e.clientX, e.clientY);
        var coords = {"x": coordinates.x, "y":coordinates.y};
        drawCircle(coords, color, radius);
        addSimpleHotspot(id++, CIRCLE, coords, color, radius); 
    });
}

//Draws correct position :)
function drawMyPath(){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    var coordinates = [];
    var color = random_rgb();
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
        //addPolygonHotspot(newCoordinates);
        addSimpleHotspot(id++, POLYGON, coordinates, color, undefined);
      });
}

/* Draw Hotspots Functions ------------------------------------------------------------ */

function readHotspots(){
    for(let a=0; a<hotspots.length; a++){
        console.log(hotspots[a]);
    }
}

//hotspots.push({"type": CIRCLE, "coordinates": coordinates, "color": color, "radius": option});
function drawOneHotspot(index){
    var spot = hotspots[index]; //Instead of this it should be lookup by id but it works for now
    if(spot.type == CIRCLE){
        drawCircle(spot.coordinates, spot.color, spot.radius);
    } else if (spot.type == RECTANGLE){
        console.log(RECTANGLE);
    } else if (spot.type == POLYGON){
        console.log(POLYGON);
    }
}

function drawAllHotspots(){

}

function drawCircle (coordinates, color, radius){
    const canvas = <HTMLCanvasElement>document.getElementById("canvas-1");
    console.log(color);
    var x = coordinates.x;
    var y = coordinates.y;
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        console.log(x, y, radius, color);
    }
}

function resetCanvas(id){
    const canvas = <HTMLCanvasElement>document.getElementById(id);
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background,0,0);   
    }
}

/* Helper Functions ------------------------------------------------------------------- */

function storeCoordinate(xVal, yVal, array){
    array.push({"x": xVal, "y": yVal});
}

function createButton(hotspotId){
    var element = document.createElement("input");
    element.value = hotspotId;
    element.type = "button";
    element.setAttribute('onclick', "drawOneHotspot('"+hotspotId+"')");
    document.getElementById("buttons-here").appendChild(element);
}

function saveHotspot(hotspot){
    var element = document.createElement("input");
    element.value = "Show";
    element.type = "button";
    element.setAttribute('onclick', "drawOneHotspot('"+hotspot.id+"')");
    document.getElementById("buttons-here").appendChild(element);

    var table = document.getElementById("saved-hotspots");
    var newRow = document.createElement("tr");

    for (var i = 0; i <= 5; i++) {
        newRow.appendChild( document.createElement('td') );
    }

    newRow.cells[0].innerHTML = hotspot.id;
    newRow.cells[1].innerHTML = hotspot.type;
    newRow.cells[2].innerHTML = "x:" + hotspot.coordinates.x + ", y:" + hotspot.coordinates.y;
    newRow.cells[3].innerHTML = hotspot.color; //TODO: For fun paint this in the color
    newRow.cells[4].innerHTML = hotspot.radius;
    newRow.cells[5].appendChild(element);
    //TODO: Add delete hotspot button

    table.appendChild(newRow);


}

function getCoordinatesOnClick(event){
    var coord = offsetCoordinates(event.clientX, event.clientY);
    storeCoordinate(coord.x, coord.y, this);
}

function offsetCoordinates(xVal, yVal){
    var x = xVal - rect.left;
    var y = yVal - rect.top;
    return{x, y};
}

/* Remove the first click (button press), the last two clicks (double click to end) and add the first coordinate to the end */
function fixCoordinatesArray(array){
    var newCoordinates = [];
    for(let a = 1; a<=array.length-2; a++){
        newCoordinates.push({"x": array[a].x, "y": array[a].y});
    }
    newCoordinates.push({"x": array[1].x, "y": array[1].y}); //Back to starting point
    return newCoordinates;
}

function addSimpleHotspot(id, type, coordinates, color, radius){
    var hotspot: Hotspot;
    if(type==CIRCLE){
        hotspot = new Hotspot(id, CIRCLE, coordinates, color, radius);
    } else if (type==RECTANGLE){
        //TO DO: rectangle
    } else if (type=POLYGON){
        hotspot = new Hotspot(id, POLYGON, coordinates, random_rgb(), undefined);
    }
    hotspots.push(hotspot);
    saveHotspot(hotspot);
    //createButton(id);
}


/* Fun Functions ---------------------------------------------------------------------- */

function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return "rgb(" + o(r()*s) + " " + o(r()*s) + " " + o(r()*s) + " / 35%)";
}

function random_radius(){
    var o = Math.round, r = Math.random, s = 150;
    return o(r()*s);
}