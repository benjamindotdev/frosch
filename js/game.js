class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameContainer = document.querySelector("#game-container");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndSCreen = document.querySelector("#game-end");
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
    this.enemies = [];
    this.items = [];
    this.obstacles = [];
    this.score = 0;
    this.timeRemaining = 60;
    this.lives = 5;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 60);
  }

  start() {
    this.gameContainer.style.width = this.width + "px";
    this.gameContainer.style.height = this.height + "px";
    this.startScreen.style.display = "none";
    this.gameContainer.style.display = "flex";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.livesStat.textContent = this.lives;
    this.timeStat.textContent = Math.floor(this.timeRemaining);
    this.scoreStat.textContent = this.score;
    this.update();
    this.timeRemaining -= this.gameLoopFrequency / 1000;
    this.gameIsOver && clearInterval(this.gameIntervalId);
  }

  update() {
    this.player.move();
    this.lives === 0 && this.endGame();
  }
}
