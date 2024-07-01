class Player extends Component {
  constructor(gameScreen, left, top, width, height, updatePosition, src) {
    super(gameScreen, width, height, left, top, updatePosition);
    this.directionX = 0;
    this.directionY = 0;
    this.element;
    this.src = src;
  }

  move() {
    this.left += this.directionX * 10;
    this.top += this.directionY * 5;

    // Get the game screen's left and top offset
    const gameScreenRect = this.gameScreen.getBoundingClientRect();
    const gameScreenLeftOffset = gameScreenRect.left;
    const gameScreenTopOffset = gameScreenRect.top;

    // Adjust the left boundary check using the game screen's left offset
    if (this.left < gameScreenLeftOffset) {
      this.left = gameScreenLeftOffset;
    }

    // Adjust the top boundary check using the game screen's top offset
    if (this.top < gameScreenTopOffset) {
      this.top = gameScreenTopOffset;
    }

    // Adjust the right boundary check to account for game screen's left offset
    if (
      this.left + this.width >
      this.gameScreen.offsetWidth + gameScreenLeftOffset
    ) {
      this.left =
        this.gameScreen.offsetWidth + gameScreenLeftOffset - this.width;
    }

    // Adjust the bottom boundary check to account for game screen's top offset
    if (
      this.top + this.height >
      this.gameScreen.offsetHeight + gameScreenTopOffset
    ) {
      this.top =
        this.gameScreen.offsetHeight + gameScreenTopOffset - this.height;
    }

    this.updatePosition();

    this.directionX > 0
      ? (this.element.style.transform = "scaleX(-1)")
      : (this.element.style.transform = "scaleX(1)");
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.left + obstacleRect.width &&
      playerRect.left + this.width > obstacleRect.left &&
      playerRect.top < obstacleRect.top + obstacleRect.height &&
      playerRect.top + this.height > obstacleRect.top
    ) {
      return true;
    }
    return false;
  }
}
