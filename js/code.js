// music
window.onload = function () {
  const audio = document.getElementById("bgMusic");
  audio.play();
};

function playMusic() {
  const audio = document.getElementById("bgMusic");
  audio.autoplay = true;
  audio.load();
  document.getElementById("musicImage").src = "..z/media/speaker.png";
}

let isMusicPlaying = false;

window.onload = function () {
  const audio = document.getElementById("bgMusic");
  const musicImage = document.getElementById("musicImage");

  if (!audio.paused) {
    musicImage.src = "../media/speaker.png";
  }
};

function toggleMusic() {
  const audio = document.getElementById("bgMusic");
  const musicImage = document.getElementById("musicImage");

  if (audio.paused) {
    audio.play();
    musicImage.src = "../media/speaker.png";
  } else {
    audio.pause();
    musicImage.src = "../media/mute.png";
  }
}


// ShowControls Screen
const click = document.getElementById("click");
function showcontrols() {
  click.currentTime = 0;
  click.play();

  const startScreen = document.getElementById("start-screen");
  startScreen.style.animation = "hide 1s forwards";
  const controlsScreen = document.getElementById("controls-screen");
  controlsScreen.style.display = "block";
  controlsScreen.style.animation = "showcontrols 1s forwards";
}

const spacebarImage = document.getElementById("spacebarimg");

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    spacebarImage.src = "../media/spacebar_pressed.png";
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    spacebarImage.src = "../media/spacebar.png";
  }
});



// show leaderboard screen
function showLeaderboard() {
  click.currentTime = 0;
  click.play();

  const startScreen = document.getElementById("start-screen");
  startScreen.style.animation = "hide 1s forwards";
  const Leaderboardscreen = document.getElementById("leaderboard");
  Leaderboardscreen.style.display = "block";
  Leaderboardscreen.style.animation = "showcontrols 1s forwards";
}


//timer
let b63oeti33e = 0;
let timerInterval = null;

function startTimer() {
  b63oeti33e = 0;
  timerInterval = setInterval(() => {
    b63oeti33e += 1000;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// function to submit your score to the leaderboard
function submitScore(event) {
   event.preventDefault();

   const playerNameInput = document.getElementById("playerName");
   const playerName = playerNameInput.value;
   const score = a6o3e;

   if (
     score > 25000) {
     alert("Cheating detected. Score submission blocked.");
     return;
  }
  if (b63oeti33e < 30000 && score > 5000) {
    alert("Cheating detected. Score submission blocked.");
    return;
  }
  if (score % 100 !== 0) {
    alert("Cheating detected. Score submission blocked.");
    return;
  }
  
  const data = {
    name: playerName,
    score: score,
  };

  fetch("../js/storeleaderboard.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then((data) => {
      console.log("Leaderboard data updated:", data);
      playerNameInput.value = "";

      updateLeaderboard();
      location.reload(true);
    })
    .catch((error) => {
      console.error("There was a problem updating leaderboard data:", error);
    });
  
}

//update the leaderboard after submitting
function updateLeaderboard() {
  fetch("../js/leaderboardData.json")
    .then((response) => response.json())
    .then((leaderboardData) => {
      const leaderboardContainer = document.querySelector(".leaderboard-data");
      leaderboardContainer.innerHTML = "";

      leaderboardData.forEach((entry, index) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("item");

        const playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add("leaditem");
        playerNameDiv.textContent = entry.name;

        const scoreDiv = document.createElement("div");
        scoreDiv.classList.add("right");
        scoreDiv.textContent = entry.score;

        playerNameDiv.appendChild(scoreDiv);
        newEntry.appendChild(playerNameDiv);

        leaderboardContainer.appendChild(newEntry);
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}

updateLeaderboard();



//render the leaderboard grom the json file onload
function renderLeaderboard() {
  fetch("../js/leaderboardData.json")
    .then((response) => response.json())
    .then((leaderboardData) => {

      leaderboardData.sort((a, b) => b.score - a.score);

      const leaderboardContainer = document.querySelector(".leaderboard-data");
      leaderboardContainer.innerHTML = "";

      leaderboardData.forEach((entry, index) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("item");

        const playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add("leaditem");
        playerNameDiv.textContent = entry.name;

        const scoreDiv = document.createElement("div");
        scoreDiv.classList.add("right");
        scoreDiv.textContent = entry.score;

        playerNameDiv.appendChild(scoreDiv);
        newEntry.appendChild(playerNameDiv);

        if (index < 3) {
          const imageSrc = `../media/crown${index + 1}.gif`;
          const img = document.createElement("img");
          img.src = imageSrc;
          img.alt = `crown ${index + 1}`;
          img.classList.add("leaderboard-image");

          const crownDiv = document.createElement("div");
          crownDiv.classList.add("crown-container");
          crownDiv.appendChild(img);

          newEntry.insertBefore(crownDiv, newEntry.firstChild);
        }

        leaderboardContainer.appendChild(newEntry);
      });
    })
    .catch((error) => {
      console.error("Error fetching leaderboard data:", error);
    });
}

renderLeaderboard();


//shows the menu screen when back is clicked inside controls screen
function showMenu() {
  click.currentTime = 0;
  click.play();
  const startScreen = document.getElementById("start-screen");
  const controlsScreen = document.getElementById("controls-screen");

  startScreen.style.display = "block";
  startScreen.style.animation = "show 1s forwards";
  controlsScreen.style.animation = "hidecontrols 1s forwards";

  controlsScreen.addEventListener(
    "animationend",
    () => {
      controlsScreen.style.display = "none";
    },
    { once: true }
  );
}

//shows the menu screen when back is clicked inside leaderboard screen
function showMenu2() {
  click.currentTime = 0;
  click.play();
  const startScreen = document.getElementById("start-screen");
  const Leaderboardscreen = document.getElementById("leaderboard");

  startScreen.style.display = "block";
  startScreen.style.animation = "show 1s forwards";
  Leaderboardscreen.style.animation = "hidecontrols 1s forwards";

  Leaderboardscreen.addEventListener(
    "animationend",
    () => {
      Leaderboardscreen.style.display = "none";
    },
    { once: true }
  );
}
//some variables for the game
let isGameOver = false;
let a6o3e = 0;
let player = document.getElementById("player");
let gameContainer = document.getElementById("game-container");
let enemies = [];

//this creates the enemies
function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");

  let isEnemy2 = false;
  let isEnemy3 = false;
  let isEnemy4 = false;
  let isEnemy5 = false;
  let isEnemy6 = false;
//when score is above x introduce a new enemy.
  if (a6o3e > 1000) {
    isEnemy2 = Math.random() < 0.5;
  }
  if (a6o3e > 4000) {
    isEnemy3 = Math.random() < 0.5;
  }
  if (a6o3e > 7000) {
    isEnemy4 = Math.random() < 0.5;
  }
  if (a6o3e > 10000) {
    isEnemy5 = Math.random() < 0.5;
  }
  if (a6o3e > 13000) {
    isEnemy6 = Math.random() < 0.5;
  }
  if (a6o3e > 16000) {
    isEnemy7 = Math.random() < 0.5;
  }
//if enemy is 1-6 change the amount of hit oints accordingly
  if (isEnemy6) {
    enemy.classList.add("enemy6");
    enemy.health = 6;
  } else if (isEnemy5) {
    enemy.classList.add("enemy5");
    enemy.health = 5;
  } else if (isEnemy4) {
    enemy.classList.add("enemy4");
    enemy.health = 4;
  } else if (isEnemy3) {
    enemy.classList.add("enemy3");
    enemy.health = 3;
  } else if (isEnemy2) {
    enemy.classList.add("enemy2");
    enemy.health = 2;
  } else {
    enemy.health = 1;
  }
//this makes sure the enemies get summoned in a random position between 1150px
  enemy.style.top = "-100px";
  enemy.style.left = `${Math.random() * 1150}px`;
  gameContainer.appendChild(enemy);
  enemies.push(enemy);
}

//this is for indecating the damage to an enemy
function showDamageIndicator(enemy, damage) {
  const damageIndicator = document.createElement("div");
  damageIndicator.classList.add("damage-indicator");
  damageIndicator.textContent = damage;

  damageIndicator.style.position = "absolute";

  const damageX = enemy.offsetLeft + enemy.offsetWidth / 2;
  const damageY = enemy.offsetTop - 20;

  damageIndicator.style.left = `${damageX}px`;
  damageIndicator.style.top = `${damageY}px`;

  gameContainer.appendChild(damageIndicator);

  setTimeout(() => {
    damageIndicator.remove();
  }, 500);
}

let enemytimer = 1000;
let interval = 4;
let intervalId;

//this is for moving the enemies to a max of 800px and when enemy is below 800 game over will trigger
function moveEnemies() {
  intervalId = setInterval(() => {
    if (!isGameOver) {
      enemies.forEach((enemy, index) => {
        const enemyBottom = parseInt(enemy.style.top);
        enemy.style.top = `${enemyBottom + interval}px`;

        if (enemyBottom >= 800) {
          gameOver();
        }
      });
      //this is for the scaling of the difficulty so enemies will fall faster the longer the game goes on
      if (a6o3e > 500 && a6o3e <= 1000) {
        interval = 3;
        enemytimer = 900;
      } else if (a6o3e > 1000 && a6o3e <= 4000) {
        interval = 4;
        enemytimer = 800;
      } else if (a6o3e > 4000 && a6o3e <= 10000) {
        interval = 5;
        enemytimer = 700;
      } else if (a6o3e > 10000 && a6o3e <= 15000) {
        interval = 6;
        enemytimer = 600;
      } else if (a6o3e > 15000 && a6o3e <= 20000) {
        interval = 7;
        enemytimer = 500;
      } else if (a6o3e > 20000 && a6o3e <= 25000) {
        interval = 8;
        enemytimer = 500;
      } else if (a6o3e > 25000 && a6o3e <= 30000) {
        interval = 9;
        enemytimer = 500;
      } else if (a6o3e > 30000 && a6o3e <= 35000) {
        interval = 10;
        enemytimer = 500;
      }
      else if (a6o3e > 35000) {
        interval = 11;
      }
      
    }
  }, 30);
}

let shootInterval;
let isShooting = false;
const shootSound = document.getElementById("shootSound");

// this is for sshooting
function shoot() {
  if (isGameStarted && !isShooting && !isGameOver) {
    isShooting = true;
    shootInterval = setInterval(() => {
      const bullet = document.createElement("div");
      bullet.classList.add("bullet");
      const playerPosition = parseInt(
        window.getComputedStyle(player).getPropertyValue("left")
      );
      const bulletPosition = playerPosition - 5.5;
      bullet.style.left = `${bulletPosition}px`;
      bullet.style.bottom = "70px";
      gameContainer.appendChild(bullet);

      moveBullet(bullet);

      if (!isGameOver) {
        shootSound.currentTime = 0;
        shootSound.play();
      }
    }, 100);
  }
}

function stopShoot() {
  clearInterval(shootInterval);
  isShooting = false;
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    shoot();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    stopShoot();
  }
});

//this is the logic for moving the bullets
function moveBullet(bullet) {
  const bulletInterval = setInterval(() => {
    if (!isGameOver) {
      const bulletBottom = parseInt(bullet.style.bottom);
      bullet.style.bottom = `${bulletBottom + 10}px`;

      if (bulletBottom >= 800) {
        clearInterval(bulletInterval);
        gameContainer.removeChild(bullet);
      }

      enemies.forEach((enemy, enemyIndex) => {
        if (checkCollision(bullet, enemy)) {
          clearInterval(bulletInterval);
          gameContainer.removeChild(bullet);

          enemy.health -= 1;

          const enemyRect = enemy.getBoundingClientRect();
          showDamageIndicator(enemy, "-1");

          if (enemy.health <= 0) {
            enemy.style.animation = "enemydeath 1s forwards";

            setTimeout(() => {
              enemy.remove();
            }, 1000); 
            enemies.splice(enemyIndex, 1);
            a6o3e += 100;
            document.getElementById("current-score").textContent = a6o3e;
          }
        }
      });
    } else {
      clearInterval(bulletInterval);
    }
  }, 8);
}


//collision detection
function checkCollision(bullet, enemy) {
  const bulletRect = bullet.getBoundingClientRect();
  const enemyRect = enemy.getBoundingClientRect();

  return (
    bulletRect.bottom >= enemyRect.top &&
    bulletRect.top <= enemyRect.bottom &&
    bulletRect.right >= enemyRect.left &&
    bulletRect.left <= enemyRect.right
  );
}

const startgame = document.getElementById("startgame");


let gameStartTime;
//when start is pressed this function will play which will start the game.
function gameStart() {
  a6o3e = 0;
  isGameStarted = true;
  gamestartTime = new Date().getTime(); // Record the game start time
  startgame.currentTime = 0;
  startgame.play();
  startTimer();

  const startScreen = document.getElementById("start-screen");
  const gameContainer = document.getElementById("game-container");
  startScreen.style.animation = "hide 1s forwards";
  startScreen.addEventListener(
    "animationend",
    () => {
      startScreen.style.display = "none";
    },
    { once: true }
  );

  gameContainer.style.animation = "Showgame 1s forwards";

  document.getElementById("start-screen").style.display = "none";

  gameContainer.style.display = "block";

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      shoot();
    }
  });
//makes sure the ship moves with the cursor
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const gameContainerRect = gameContainer.getBoundingClientRect();
    const containerLeft = gameContainerRect.left;
    const containerWidth = gameContainerRect.width;

    let newPosition = mouseX - containerLeft - player.offsetWidth / 2;
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > containerWidth - player.offsetWidth) {
      newPosition = containerWidth - player.offsetWidth;
    }

    player.style.left = `${newPosition}px`;
  });

  moveEnemies();
  setInterval(createEnemy, 700);
}

//gameover function
function gameOver() {
  isGameOver = true;
  document.body.style.cursor = "default";
  isShooting = false;
  stopTimer();

  const endScreen = document.getElementById("end-screen");
  const gameContainer = document.getElementById("game-container");

  endScreen.style.animation = "show 1s forwards";
  endScreen.addEventListener(
    "animationend",
    () => {
      endScreen.style.display = "block";
    },
    { once: true }
  );

  gameContainer.style.animation = "Hidegame 1s forwards";

  document.getElementById("start-screen").style.display = "none";
  document.body.style.cursor = "none";

  gameContainer.style.display = "block";

  endScreen.style.display = "block";
  document.getElementById("score").textContent = a6o3e;

  const tryAgainBtn = document.getElementById("try-again-btn");
  tryAgainBtn.addEventListener("click", () => {
    location.reload(true);

    gameContainer.style.display = "block";

    endScreen.style.display = "none";

    gameStart();
  });

  const deathSound = document.getElementById("deathSound");
  deathSound.currentTime = 0;
  deathSound.play();
}


//choosing your ship in the home screen
function choose(event, shipImage) {
  const clickedShip = event.currentTarget;
  const shipChosenImg = document.querySelector(".shipchosenimg");
  const shipChosen = document.querySelector(".shipchosen");

  shipChosen.classList.add("animate-out");

  const previouslyChosen = document.querySelector(".ship.grey");
  if (previouslyChosen) {
    previouslyChosen.classList.remove("grey");
    shipChosen.classList.add("animate-out");
  }

  click.currentTime = 0;
  click.play();

  clickedShip.classList.add("grey");
  clickedShip.classList.add("ship");
  shipChosen.classList.add("chosen");

  const icon = document.getElementById("icon");
  icon.href = `${shipImage}`;

  const player = document.getElementById("player");
  player.style.backgroundImage = `url('${shipImage}')`;

  setTimeout(() => {
    shipChosen.classList.remove("animate-out");
    shipChosen.classList.add("chosen");
    shipChosenImg.src = shipImage;
  }, 350);
}


//MOBILE
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  const touchX = event.touches[0].clientX;
  const deltaX = touchX - touchStartX;

  if (deltaX > 10) {
    player.moveRight();
  } else if (deltaX < -10) {
    player.moveLeft();
  }
}

function handleTouchEnd(event) {
 shoot();
}

gameContainer.addEventListener("touchstart", handleTouchStart);
gameContainer.addEventListener("touchmove", handleTouchMove);
gameContainer.addEventListener("touchend", handleTouchEnd);

if ("ontouchstart" in window) {
  setInterval(() => {
    shoot();
  }, 100);
}


