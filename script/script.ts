var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    createCanvas();
}

function createCanvas(){
    this.canvas = document.createElement('canvas');
    this.ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1"
    document.body.appendChild(canvas);
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
    document.addEventListener("click", getCoordinatesOnClick.bind(coordinates));
    document.addEventListener("dblclick", (e) => { //Double click to stop counting points
        console.log(coordinates); //TODO: Remove
        if (canvas.getContext) {
            var init = false;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgb(255 165 0 / 35%)";
            this.ctx.beginPath();
            ctx.moveTo(coordinates[1].x, coordinates[1].y);
            ctx.lineTo(coordinates[2].x, coordinates[2].y);
            ctx.lineTo(coordinates[3].x, coordinates[3].y);
            ctx.lineTo(coordinates[4].x, coordinates[4].y);
            ctx.lineTo(coordinates[1].x, coordinates[1].y);
            ctx.fill(); //fill: filled, stroke: only outline
            ctx.stroke();
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

function storeCoordinate(xVal, yVal, array){
    array.push({"x": xVal, "y": yVal});
    //TODO: Aqui la logica de cuando se cierra el array?
}

function getCoordinatesOnClick(event){
    console.log("Mouse: " + event.clientX, ", " + event.clientY);
    storeCoordinate(event.clientX, event.clientY, this); //this es el array de coordenadas que esta bound
}
