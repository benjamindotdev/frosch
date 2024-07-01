class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameOverScreen = document.querySelector("#game-over");
    this.gameVictoryScreen = document.querySelector("#game-victory");
    this.timeStat = document.querySelector("#stats__time");
    this.scoreStat = document.querySelector("#stats__score");
    this.livesStat = document.querySelector("#stats__lives");
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
    this.enemies = [];
    this.items = [];
    this.obstacles = [];
    this.score = 0;
    this.timeRemaining = 60;
    this.lives = 5;
    this.playerHasWon = false;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  makeLanes() {
    const types = ["road", "water", "bike", "grass", "tram"];
    for (let i = 6; i > 0; i--) {
      let type = types[Math.floor(Math.random() * types.length)];
      const lane = new Lane(i, type, [], []);
      const laneElement = document.querySelector(`#lane-${i}`);
      laneElement.innerHTML = lane.type;
      const texture = lane.texture();
      laneElement.style.backgroundImage = `url("./assets/PNG/${texture}")`;
      this.gameScreen.appendChild(laneElement);
    }
  }

  start() {
    this.gameContainer.style.width = this.width + "px";
    this.gameContainer.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.makeLanes();
  }

  gameLoop() {
    this.livesStat.textContent = this.lives;
    this.timeStat.textContent = Math.floor(this.timeRemaining);
    this.scoreStat.textContent = this.score;
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
  }

  victory() {
    this.playerHasWon = true;
    this.gameContainer.style.display = "none";
    this.gameVictoryScreen.style.display = "flex";
    clearInterval(this.gameIntervalId);
  }

  endGame() {
    this.gameIsOver = true;
    this.gameContainer.style.display = "none";
    this.gameOverScreen.style.display = "flex";
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
    this.lives = 5;
    this.timeRemaining = 60;
    this.score = 0;
    this.gameIsOver = false;
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
    this.makeLanes();
  }
}
