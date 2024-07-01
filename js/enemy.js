class Enemy extends Component {
  constructor(gameScreen, left, top, width, height, src, speed, directionX) {
    super(gameScreen, width, height, left, top, src);
    this.directionX = directionX;
    this.directionY = 0;
    this.speed = speed;
  }

  move() {
    this.left += this.directionX * speed;
    this.top += this.directionY * 0;

    const gameScreenRect = this.gameScreen.getBoundingClientRect();
    const gameScreenLeftOffset = gameScreenRect.left;
    const gameScreenTopOffset = gameScreenRect.top;

    if (this.left < gameScreenLeftOffset) {
      this.left = gameScreenLeftOffset;
      this.directionX = 1;
    }

    if (
      this.left + this.width >
      this.gameScreen.offsetWidth + gameScreenLeftOffset
    ) {
      this.left =
        this.gameScreen.offsetWidth + gameScreenLeftOffset - this.width;
      this.directionX = -1;
    }

    this.updatePosition();
  }
}
