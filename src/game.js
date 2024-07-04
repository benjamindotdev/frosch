class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over");
    this.gameVictoryScreen = document.querySelector("#game-victory");
    this.timeStat = document.querySelector("#stats__time");
    this.levelStat = document.querySelector("#stats__level");
    this.player = new Player(
      this.gameScreen,
      400,
      750,
      42,
      24,
      "./assets/images/player/Idle.gif"
    );
    this.player.element.classList.add("player");
    this.height = 800;
    this.width = 800;
    this.lanes = [];
    this.timeRemaining = 60;
    this.level = 1;
    this.playerHasWon = false;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
    this.enemyLoopFrequency = Math.round(1000 / 1);
    this.startSound = new Audio("../public/assets/sounds/game-start.mp3");
    this.gameSong = new Audio("../public/assets/sounds/game-play.mp3");
    this.victorySong = new Audio("../public/assets/sounds/victory.mp3");
    this.gameOverSong = new Audio("../public/assets/sounds/game-over.mp3");
    this.hitSound = new Audio("../public/assets/sounds/hit.mp3");
    this.highScore = 0;
  }

  makeLanes() {
    const types = ["road", "bike", "grass", "pavement"];
    for (let i = 6; i > 0; i--) {
      let type = types[Math.floor(Math.random() * types.length)];
      const lane = new Lane(i, type);
      const laneElement = document.querySelector(`#lane-${i}`);
      laneElement.style.backgroundImage = `url("./assets/images/lanes/${lane.type}.png")`;
      this.lanes.push(lane);
      this.gameScreen.appendChild(laneElement);
    }
  }

  start() {
    this.startSound.play();
    this.gameSong.play();
    this.gameContainer.style.width = this.width + "px";
    this.gameContainer.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.makeLanes();
    this.levelStat.textContent = this.level;
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.enemyInterval = setInterval(() => {
      this.enemyLoop();
    }, this.enemyLoopFrequency);
    this.gameSong.play();
  }

  gameLoop() {
    if (this.timeRemaining <= 0) {
      this.endGame();
    } else if (this.player.top <= 125) {
      this.victory();
    } else {
      this.timeStat.textContent = Math.floor(this.timeRemaining);
      this.update();
      this.timeRemaining -= 1 / 60;
    }
  }

  enemyLoop() {
    this.lanes.forEach((lane) => {
      if (lane.enemies.length < this.level) {
        lane.addEnemy();
      }
    });
  }

  update() {
    this.player.move();
    this.lanes.forEach((lane) => {
      lane.removeEnemies();
      lane.enemies.forEach((enemy) => {
        if (this.player.didCollide(enemy)) {
          this.hitSound.play();
          this.player.top = 800;
          this.player.left = 400;
        } else {
          enemy.move();
        }
      });
    });
  }

  victory() {
    this.gameSong.pause();
    this.victorySong.play();
    this.gameSong.play();
    this.playerHasWon = true;
    this.gameContainer.style.display = "none";
    this.gameVictoryScreen.style.display = "flex";
    this.player.element.remove();
    this.lanes.forEach((lane) => {
      lane.enemies.forEach((enemy) => {
        enemy.element.remove();
      });
      this.lanes = [];
      console.log(this.lanes.length);
    });
    this.level += 1;
    this.levelStat.textContent = this.level;
    clearInterval(this.gameIntervalId);
  }

  endGame() {
    this.gameSong.pause();
    this.gameSong.currentTime = 0;
    this.gameOverSong.play();
    this.gameIsOver = true;
    this.gameContainer.style.display = "none";
    this.gameOverScreen.style.display = "flex";
    this.player.element.remove();
    this.level > this.highScore ? (this.highScore = this.level) : null;
    this.level = 1;
    this.lanes.forEach((lane) => {
      lane.enemies.forEach((enemy) => {
        enemy.element.remove();
      });
      this.lanes = [];
    });
    clearInterval(this.gameIntervalId);
  }

  restartGame() {
    this.startSound.play();
    this.gameSong.play();
    this.player = new Player(
      this.gameContainer,
      450,
      750,
      42,
      24,
      "./assets/images/player/Idle.gif"
    );
    this.gameOverScreen.style.display = "none";
    this.gameVictoryScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.timeRemaining = 60;
    this.gameIsOver = false;
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.makeLanes();
  }
}
