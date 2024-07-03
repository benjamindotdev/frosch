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

    console.log(containerRect);

    if (
      this.left + this.width > containerRect.right ||
      this.left < containerRect.left
    ) {
      this.markForRemoval = true;
    } else {
      this.updatePosition();
    }
  }
}
