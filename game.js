let coins = 0;
let timeLeft = 60;
let gameOver = false;

const child = document.getElementById("child");
const berry = document.getElementById("berry");
const monster = document.getElementById("monster");
const timerDisplay = document.getElementById("timer");
const coinsDisplay = document.getElementById("coins");
const gameOverText = document.getElementById("game-over");
const finalCoins = document.getElementById("final-coins");
const area = document.getElementById("mineArea");

let childX = 0;
let childY = 0;
let childSpeed = 20;

let berryX = 100;
let berryY = 100;
let berryDX = 2;
let berryDY = 2;

let monsterX = 200;
let monsterY = 200;
let monsterDX = 2;
let monsterDY = 2;

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  const maxX = area.clientWidth - child.offsetWidth;
  const maxY = area.clientHeight - child.offsetHeight;

  switch (e.key) {
    case "ArrowUp":
      childY -= childSpeed;
      break;
    case "ArrowDown":
      childY += childSpeed;
      break;
    case "ArrowLeft":
      childX -= childSpeed;
      break;
    case "ArrowRight":
      childX += childSpeed;
      break;
  }

  // 邊界反彈效果
  if (childX < 0) {
    childX = 0;
    childSpeed = -childSpeed;
  } else if (childX > maxX) {
    childX = maxX;
    childSpeed = -childSpeed;
  }

  if (childY < 0) {
    childY = 0;
    childSpeed = -childSpeed;
  } else if (childY > maxY) {
    childY = maxY;
    childSpeed = -childSpeed;
  }

  child.style.left = childX + "px";
  child.style.top = childY + "px";

  checkCollision();
});

function checkCollision() {
  const childRect = child.getBoundingClientRect();
  const berryRect = berry.getBoundingClientRect();
  const monsterRect = monster.getBoundingClientRect();

  const dx = childRect.left - berryRect.left;
  const dy = childRect.top - berryRect.top;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const mdx = childRect.left - monsterRect.left;
  const mdy = childRect.top - monsterRect.top;
  const mdistance = Math.sqrt(mdx * mdx + mdy * mdy);

  if (distance < 60) {
    coins++;
    coinsDisplay.textContent = coins;
    moveBerryRandom();
  }

  if (mdistance < 60) {
    coins=coins-3;
    coinsDisplay.textContent = coins;
    moveMonsterRandom();
  }

}

function moveBerryRandom() {
  const maxX = area.clientWidth - berry.offsetWidth;
  const maxY = area.clientHeight - berry.offsetHeight;
  berryX = Math.floor(Math.random() * maxX);
  berryY = Math.floor(Math.random() * maxY);
  berry.style.left = berryX + "px";
  berry.style.top = berryY + "px";
}

function moveMonsterRandom() {
  const maxX = area.clientWidth - monster.offsetWidth;
  const maxY = area.clientHeight - monster.offsetHeight;
  monsterX = Math.floor(Math.random() * maxX);
  monsterY = Math.floor(Math.random() * maxY);
  monster.style.left = monsterX + "px";
  monster.style.top = monsterY + "px";
}

// 巴西莓自動移動並反彈
function moveBerryBouncing() {
  const maxX = area.clientWidth - berry.offsetWidth;
  const maxY = area.clientHeight - berry.offsetHeight;

  berryX += berryDX;
  berryY += berryDY;

  if (berryX <= 0 || berryX >= maxX) berryDX *= -1;
  if (berryY <= 0 || berryY >= maxY) berryDY *= -1;

  berry.style.left = berryX + "px";
  berry.style.top = berryY + "px";

  if (!gameOver) {
    requestAnimationFrame(moveBerryBouncing);
  }
}

function moveMonsterBouncing() {
  const maxX = area.clientWidth - monster.offsetWidth;
  const maxY = area.clientHeight - monster.offsetHeight;

  monsterX += monsterDX;
  monsterY += monsterDY;

  if (monsterX <= 0 || monsterX >= maxX) monsterDX *= -1;
  if (monsterY <= 0 || monsterY >= maxY) monsterDY *= -1;

  monster.style.left = monsterX + "px";
  monster.style.top = monsterY + "px";

  if (!gameOver) {
    requestAnimationFrame(moveMonsterBouncing);
  }
}

// 初始化
moveBerryRandom();
moveMonsterRandom();
moveBerryBouncing();
moveMonsterBouncing();

// 倒數計時
const countdown = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    gameOver = true;
    finalCoins.textContent = coins;
    gameOverText.classList.remove("hidden");
  }
}, 1000);
