let coins = 0;
let timeLeft = 60;
let gameOver = false;
var gameStatus = false;

const child = document.getElementById("child");
const berry = document.getElementById("berry");
const monster = document.getElementById("monster");
const timerDisplay = document.getElementById("timer");
const coinsDisplay = document.getElementById("coins");
const gameOverText = document.getElementById("game-over");
const finalCoins = document.getElementById("final-coins");
const area = document.getElementById("mineArea");
const startButton = document.getElementById("start");

const leftButton = document.getElementById("left");
const upButton = document.getElementById("up");
const rightButton = document.getElementById("right");
const downButton = document.getElementById("down");

let childX = 0;
let childY = 0;
let childSpeed = 20;

let berryX = 100;
let berryY = 100;
let berryDX = 1.5;
let berryDY = 1.5;

let monsterX = 200;
let monsterY = 200;
let monsterDX = -1.5;
let monsterDY = 1.5;

startButton.addEventListener("click", (e) => {
    if (gameStatus==false) {
        berryX = Math.floor(Math.random() * 150);
        berryY = Math.floor(Math.random() * 150);
        berry.style.left = berryX + "px";
        berry.style.top = berryY + "px";

        monsterX = Math.floor(Math.random() * 250);
        monsterY = Math.floor(Math.random() * 250);
        monster.style.left = monsterX + "px";
        monster.style.top = monsterY + "px";        

        berry.style.display="block";
        monster.style.display="block";

        const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            clearInterval(gameAnimation);
            gameOver = true;
            finalCoins.textContent = coins;
            gameOverText.style.display="block";
        }
        }, 1000);

        const gameAnimation = setInterval(()=>{
            moveBerryBouncing() 
            moveMonsterBouncing() 
            checkCollision();
        },10);
        gameStatus=true;
    }
    else{

    }
});


leftButton.addEventListener("click", (e) => {
    if (gameOver) return;

    childX -= childSpeed;
    if (childX < 0) {
        childX = 0;
    }  
    child.style.left = childX + "px";

});

upButton.addEventListener("click", (e) => {
    if (gameOver) return;

    childY -= childSpeed;
    if (childY < 0) {
        childY = 0;
    }
    child.style.top = childY + "px";

});

rightButton.addEventListener("click", (e) => {
    if (gameOver) return;
    const maxX = area.clientWidth - child.offsetWidth;
    childX += childSpeed;
    if (childX > maxX) {
        childX = maxX;
    }
    child.style.left = childX + "px";

});

downButton.addEventListener("click", (e) => {
    if (gameOver) return;
    const maxY = area.clientHeight - child.offsetHeight;
    childY += childSpeed;
    if (childY > maxY) {
        childY = maxY;
    }

    child.style.top = childY + "px";    

});

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
  } else if (childX > maxX) {
    childX = maxX;
  }

  if (childY < 0) {
    childY = 0;
  } else if (childY > maxY) {
    childY = maxY;
  }

  child.style.left = childX + "px";
  child.style.top = childY + "px";

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
    //requestAnimationFrame(moveBerryBouncing);
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
    //requestAnimationFrame(moveMonsterBouncing);
  }
}

