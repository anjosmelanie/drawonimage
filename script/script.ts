var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D | null;

var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

function createCanvas(){
    var canvas2 = document.createElement('canvas');
    ctx = canvas2.getContext("2d");
    canvas2.width = 671;
    canvas2.height = 475;
    document.body.appendChild(canvas2);
    ctx!.drawImage(background,0,0);   
}

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    createCanvas();
}
