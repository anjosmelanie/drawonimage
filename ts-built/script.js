var canvas;
var ctx;
var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";
// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
    createCanvas();
};
function createCanvas() {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext("2d");
    canvas.width = 671;
    canvas.height = 475;
    canvas.id = "canvas-1";
    document.body.appendChild(canvas);
    ctx.drawImage(background, 0, 0);
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
