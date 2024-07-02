window.onload = function () {
  const startSong = new Audio(
    "./assets/sounds/T. Bless - Froggy Fraud Adventure.mp3"
  );
  startSong.loop = true;
  startSong.play();
  const gameSong = new Audio(
    "./assets/sounds/Ian Post - Breaking Point - No FX.mp3"
  );
  const startButton = document.querySelector("#intro__button-start");
  const restartButtons = document.querySelectorAll(".end__button-restart");
  let game = null;

  startButton.addEventListener("click", function () {
    game = new Game();
    game.start();
    startSong.pause();
    gameSong.play();
  });

  restartButtons.forEach((button) =>
    button.addEventListener("click", function () {
      game.restartGame();
    })
  );

  const handleKeyDown = (event) => {
    const key = event.key;
    const keyStrokes = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (keyStrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  };

  const handleKeyUp = (event) => {
    const key = event.key;
    const keyStrokes = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (keyStrokes.includes(key)) {
      event.preventDefault();

      switch (key) {
        case "ArrowLeft":
          game.player.directionX = 0;
          break;
        case "ArrowRight":
          game.player.directionX = 0;
          break;
        case "ArrowUp":
          game.player.directionY = 0;
          break;
        case "ArrowDown":
          game.player.directionY = 0;
          break;
      }
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
};
