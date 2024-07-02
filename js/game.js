class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over");
    this.gameVictoryScreen = document.querySelector("#game-victory");
    this.timeStat = document.querySelector("#stats__time");
    this.laneElements = [];
    this.player = new Player(
      this.gameContainer,
      800,
      800,
      100,
      100,
      "./assets/Froggo/Gifs/Idle.gif"
    );
    this.height = 800;
    this.width = 800;
    this.lanes = [];
    this.timeRemaining = 60;
    this.playerHasWon = false;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  makeLanes() {
    const types = ["road", "water", "bike", "grass", "pavement"];
    for (let i = 6; i > 0; i--) {
      let type = types[Math.floor(Math.random() * types.length)];
      const lane = new Lane(i, type);
      const laneElement = document.querySelector(`#lane-${i}`);
      laneElement.style.backgroundImage = `url("./assets/PNG/${lane.texture()}")`;
      this.lanes.push(lane);
      this.gameScreen.appendChild(laneElement);
    }
  }

  start() {
    const startAudio = document.createElement("audio");
    startAudio.src = "./assets/Sounds/game-start-6104.mp3";
    this.gameContainer.style.width = this.width + "px";
    this.gameContainer.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.makeLanes();
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    startAudio.play();
  }

  gameLoop() {
    this.timeStat.textContent = Math.floor(this.timeRemaining);
    if (this.lives <= 0 || this.timeRemaining <= 0) {
      this.endGame();
    } else if (this.player.top <= 125) {
      this.victory();
    } else {
      this.update();
      this.timeRemaining -= 1 / 60;
    }
  }

  update() {
    this.player.move();
    this.lanes.forEach((lane) => {
      if (lane.enemies.length === 0) {
        lane.addEnemy();
      }
      lane.enemies.forEach((enemy) => {
        if (this.player.didCollide(enemy)) {
          this.player.top = 800;
          this.player.left = 400;
        } else if (enemy.markForRemoval) {
          lane.removeEnemy(enemy);
        }
        enemy.move();
      });
    });
  }

  victory() {
    this.playerHasWon = true;
    this.gameContainer.style.display = "none";
    this.gameVictoryScreen.style.display = "flex";
    this.player.element.remove();
    clearInterval(this.gameIntervalId);
  }

  endGame() {
    this.gameIsOver = true;
    this.gameContainer.style.display = "none";
    this.gameOverScreen.style.display = "flex";
    this.player.element.remove();
    clearInterval(this.gameIntervalId);
  }

  restartGame() {
    this.player = new Player(
      this.gameContainer,
      800,
      800,
      100,
      100,
      "./assets/Froggo/Gifs/Idle.gif"
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
