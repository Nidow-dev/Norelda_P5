const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// 🚚 camion
let truck = {
  x: 100,
  y: 100,
  speed: 2,
  color: "red"
};

let money = 100;

// 🏪 points
const supplier = { x: 100, y: 100 };
const depot = { x: 400, y: 250 };
const client = { x: 650, y: 350 };

// 🎨 choix couleur
function selectColor(color){
  truck.color = color;

  document.querySelectorAll(".colorBtn")
    .forEach(b => b.classList.remove("selected"));

  document.getElementById(color + "Btn")
    ?.classList.add("selected");
}

// ▶ start game
function startGame(){
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  loop();
}

// 🔁 update UI
function updateUI(){
  document.getElementById("money").textContent = money;
}

// 📏 distance
function isNear(a,b){
  return Math.hypot(a.x-b.x, a.y-b.y) < 40;
}

// 🎮 update
function update(){

  if(keys["ArrowUp"]) truck.y -= truck.speed;
  if(keys["ArrowDown"]) truck.y += truck.speed;
  if(keys["ArrowLeft"]) truck.x -= truck.speed;
  if(keys["ArrowRight"]) truck.x += truck.speed;

  if(isNear(truck, supplier) && keys[" "]){
    money += 1;
  }

  updateUI();
}

// 🎨 draw
function draw(){
  ctx.clearRect(0,0,800,500);

  ctx.fillStyle = "green";
  ctx.fillRect(supplier.x-20, supplier.y-20, 40,40);

  ctx.fillStyle = "blue";
  ctx.fillRect(client.x-20, client.y-20, 40,40);

  ctx.fillStyle = truck.color;
  ctx.fillRect(truck.x-10, truck.y-10, 20,20);
}

// 🔁 loop
function loop(){
  update();
  draw();
  requestAnimationFrame(loop);
}
