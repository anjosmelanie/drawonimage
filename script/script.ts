var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    createCanvas();
}

function createCanvas(){
    const canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1"
    document.body.appendChild(canvas);
    ctx!.drawImage(background,0,0);   
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