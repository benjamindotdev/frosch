class Enemy extends Component {
  constructor(container, left, top, width, height, src, directionX) {
    super(container, width, height, left, top, src);
    this.directionX = directionX;
    this.src = src;
    this.speed = parseInt(this.src.split("/")[5].replace(".png", ""), 10);
    this.markForRemoval = false;
    this.element.classList.add("enemy");
  }

  move() {
    this.left += this.directionX * this.speed;

    const containerRect = this.container.getBoundingClientRect();
    const containerLeftOffset = containerRect.left;
    const containerRightLimit =
      this.container.offsetWidth + containerLeftOffset;

    if (this.left + this.width < containerLeftOffset) {
      this.markForRemoval = true;
    }

    if (this.left > containerRightLimit) {
      this.markForRemoval = true;
    }

    this.updatePosition();
  }
}
