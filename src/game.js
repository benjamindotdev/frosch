class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over");
    this.gameVictoryScreen = document.querySelector("#game-victory");
    this.timeStat = document.querySelector("#stats__time");
    this.levelStat = document.querySelector("#stats__level");
    this.laneElements = [];
    this.player = new Player(
      this.gameContainer,
      800,
      800,
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
    this.enemyLoopFrequency = Math.round(1000 / 10);
    this.gameSong = new Audio("../public/assets/sounds/game-play.mp3");
    this.victorySong = new Audio("../public/assets/sounds/victory.mp3");
    this.gameOverSong = new Audio("../public/assets/sounds/game-over.mp3");
    this.hitSound = new Audio("../public/assets/sounds/hit.mp3");
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
    const startAudio = document.createElement("audio");
    startAudio.src = "../public/assets/Sounds/game-start.mp3";
    this.gameContainer.style.width = this.width + "px";
    this.gameContainer.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.makeLanes();
    this.levelStat.textContent = this.level;
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.enemyLoopFrequency = setInterval(() => {
      this.enemyLoop();
    }, this.enemyLoopFrequency);
    startAudio.play();
    this.gameSong.play();
  }

  gameLoop() {
    this.timeStat.textContent = Math.floor(this.timeRemaining);
    if (this.timeRemaining <= 0) {
      this.endGame();
    } else if (this.player.top <= 125) {
      this.victory();
    } else {
      this.update();
      this.timeRemaining -= 1 / 60;
    }
  }

  enemyLoop() {
    this.lanes.forEach((lane) => {
      while (lane.enemies.length < this.level) {
        lane.addEnemy(lane.enemies.length === 1 ? true : false);
      }
      lane.enemies.forEach((enemy) => {
        if (this.player.didCollide(enemy)) {
          this.hitSound.play();
          this.player.top = 800;
          this.player.left = 400;
        }
        if (enemy.markForRemoval) {
          lane.removeEnemy(enemy);
        }
      });
    });
  }

  update() {
    this.player.move();
    this.lanes.forEach((lane) => {
      lane.enemies.forEach((enemy) => {
        enemy.move();
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
      this.laneElements = [];
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
    this.lanes.forEach((lane) => {
      lane.enemies.forEach((enemy) => {
        enemy.element.remove();
      });
      this.lanes = [];
      this.laneElements = [];
    });
    clearInterval(this.gameIntervalId);
  }

  restartGame() {
    this.gameSong.play();
    this.player = new Player(
      this.gameContainer,
      800,
      800,
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
