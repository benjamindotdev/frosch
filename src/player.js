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

    const containerRect = this.container.getBoundingClientRect();
    const containerLeftOffset = containerRect.left;
    const containerTopOffset = containerRect.top;

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
