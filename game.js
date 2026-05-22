let canvas;
let ctx;

let gameStarted = false;

let keys = {};

let truck = {
  x: 100,
  y: 100,
  speed: 2,
  color: "red"
};

const supplier = { x: 100, y: 100 };

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function startGame(){

  console.log("PLAY OK");

  document.getElementById("menu").style.display = "none";

  canvas = document.getElementById("game");
  canvas.style.display = "block";

  canvas.width = 800;
  canvas.height = 500;

  ctx = canvas.getContext("2d");

  gameStarted = true;

  requestAnimationFrame(loop);
}

function update(){

  if(!gameStarted) return;

  if(keys["ArrowUp"]) truck.y -= truck.speed;
  if(keys["ArrowDown"]) truck.y += truck.speed;
  if(keys["ArrowLeft"]) truck.x -= truck.speed;
  if(keys["ArrowRight"]) truck.x += truck.speed;
}

function draw(){

  if(!ctx) return;

  ctx.clearRect(0,0,800,500);

  ctx.fillStyle = "green";
  ctx.fillRect(supplier.x-20, supplier.y-20, 40,40);

  ctx.fillStyle = truck.color;
  ctx.fillRect(truck.x-10, truck.y-10, 20,20);
}

function loop(){

  update();
  draw();

  requestAnimationFrame(loop);
}
