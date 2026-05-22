
//////////////////////////////
// 🎮 VARIABLES GLOBALES
//////////////////////////////

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

let money = 100;

const supplier = { x: 100, y: 100 };
const client = { x: 650, y: 350 };

//////////////////////////////
// ⌨️ INPUT CLAVIER
//////////////////////////////

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

//////////////////////////////
// 🎨 CHOIX COULEUR
//////////////////////////////

function selectColor(color){
  truck.color = color;

  document.querySelectorAll(".colorBtn").forEach(btn => {
    btn.classList.remove("selected");
  });

  const btn = document.getElementById(color + "Btn");
  if (btn) btn.classList.add("selected");
}

//////////////////////////////
// ▶ START GAME
//////////////////////////////

function startGame(){

  console.log("PLAY CLICKED");

  document.getElementById("menu").style.display = "none";

  canvas = document.getElementById("game");
  canvas.style.display = "block";

  canvas.width = 800;
  canvas.height = 500;

  ctx = canvas.getContext("2d");

  gameStarted = true;

  loop();
}

//////////////////////////////
// 📏 DISTANCE
//////////////////////////////

function isNear(a, b){
  return Math.hypot(a.x - b.x, a.y - b.y) < 40;
}

//////////////////////////////
// 🎮 UPDATE LOGIQUE
//////////////////////////////

function update(){

  if(!gameStarted) return;

  if(keys["ArrowUp"]) truck.y -= truck.speed;
  if(keys["ArrowDown"]) truck.y += truck.speed;
  if(keys["ArrowLeft"]) truck.x -= truck.speed;
  if(keys["ArrowRight"]) truck.x += truck.speed;

  if(isNear(truck, supplier) && keys[" "]){
    money += 1;
  }

  document.getElementById("money").textContent = money;
}

//////////////////////////////
// 🎨 DRAW
//////////////////////////////

function draw(){

  if(!ctx) return;

  ctx.clearRect(0,0,800,500);

  // fond
  ctx.fillStyle = "#2b2b2b";
  ctx.fillRect(0,0,800,500);

  // fournisseur
  ctx.fillStyle = "green";
  ctx.fillRect(supplier.x-20, supplier.y-20, 40,40);

  // client
  ctx.fillStyle = "blue";
  ctx.fillRect(client.x-20, client.y-20, 40,40);

  // camion
  ctx.fillStyle = truck.color;
  ctx.fillRect(truck.x-10, truck.y-10, 20,20);
}

//////////////////////////////
// 🔁 LOOP
//////////////////////////////

function loop(){

  update();
  draw();

  requestAnimationFrame(loop);
}
