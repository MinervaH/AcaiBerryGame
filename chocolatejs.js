const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

let score = 0;
let timeLeft = 60;
let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;
const speed = 60;

function movePlayer(dx, dy) {
  playerX += dx;
  playerY += dy;

  playerX = Math.max(0, Math.min(window.innerWidth - 40, playerX));
  playerY = Math.max(0, Math.min(window.innerHeight - 40, playerY));

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
}

// 觸碰移動
let touchStartX, touchStartY;
game.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, false);

game.addEventListener("touchend", e => {
  const touch = e.changedTouches[0];
  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    movePlayer(dx > 0 ? speed : -speed, 0);
  } else {
    movePlayer(0, dy > 0 ? speed : -speed);
  }
}, false);

// 建立移動物件
function createMovingItem(type) {
  const item = document.createElement("div");
  item.classList.add("item");
  item.textContent = type === "cocoa" ? "🍫" : "🔪";
  item.dataset.type = type;

  let x = Math.random() * (window.innerWidth - 40);
  let y = Math.random() * (window.innerHeight - 40);
  let dx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 1);
  let dy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2 + 1);

  item.style.left = x + "px";
  item.style.top = y + "px";
  game.appendChild(item);

  function move() {
    x += dx;
    y += dy;

    // 邊界反彈
    if (x <= 0 || x >= window.innerWidth - 40) dx *= -1;
    if (y <= 0 || y >= window.innerHeight - 40) dy *= -1;

    item.style.left = x + "px";
    item.style.top = y + "px";

    // 檢查碰撞
    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    const isColliding = !(
      playerRect.right < itemRect.left ||
      playerRect.left > itemRect.right ||
      playerRect.bottom < itemRect.top ||
      playerRect.top > itemRect.bottom
    );

    if (isColliding) {
      if (item.dataset.type === "cocoa") {
        score += 1;
      } else {
        score -= 3;
      }
      scoreDisplay.textContent = "分數: " + score;
      item.remove();
      return;
    }

    requestAnimationFrame(move);
  }

  move();
}

// 每 6 秒產生新物件
setInterval(() => {
  createMovingItem(Math.random() > 0.4 ? "cocoa" : "machete");
}, 6000);

// 倒數計時
const countdown = setInterval(() => {
  timeLeft--;
  timerDisplay.textContent = "時間: " + timeLeft;
  if (timeLeft <= 0) {
    clearInterval(countdown);
    alert("遊戲結束！你得到 " + score + " 分");
  }
}, 1000);
