class Player extends Component {
  constructor(container, left, top, width, height, updatePosition, src) {
    super(container, width, height, left, top, updatePosition);
    this.directionX = 0;
    this.directionY = 0;
    this.src = src;
  }

  move() {
    this.left += this.directionX * 10;
    this.top += this.directionY * 5;

    if (this.left < 0) {
      this.left = 0;
    }

    if (this.top < 0) {
      this.top = 0;
    }

    if (this.left + this.width > this.container.offsetWidth) {
      this.left = this.container.offsetWidth - this.width;
    }

    if (this.top + this.height > this.container.offsetHeight) {
      this.top = this.container.offsetHeight - this.height;
    }

    this.updatePosition();

    this.directionX > 0
      ? (this.element.style.transform = "scaleX(-1)")
      : (this.element.style.transform = "scaleX(1)");
  }

  didCollide(enemy) {
    const playerRect = this.element.getBoundingClientRect();
    const enemyRect = enemy.element.getBoundingClientRect();

    if (
      playerRect.left < enemyRect.left + enemyRect.width &&
      playerRect.left + this.width > enemyRect.left &&
      playerRect.top < enemyRect.top + enemyRect.height &&
      playerRect.top + this.height > enemyRect.top
    ) {
      return true;
    }
    return false;
  }
}
