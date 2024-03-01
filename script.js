var canvas = document.getElementById("canvas1"),
    ctx = canvas.getContext("2d");

canvas.width = 671;
canvas.height = 475;

var background = new Image();
background.src = "https://flying-pikachu.com/assets/img/intro/banner_flying-pikachu_en.webp";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}