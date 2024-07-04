class Enemy extends Component {
  constructor(container, src, directionX) {
    super(container, src);
    this.width = 80;
    this.height = 80;
    this.directionX = directionX;
    this.src = src;
    this.speed = parseInt(this.src.split("/")[5].replace(".png", ""), 10);
    this.markForRemoval = false;
    this.element.src = this.src;
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.left = this.directionX === -1 ? 720 : 0;
    this.right = this.left + this.width;
  }

  move() {
    this.left += this.directionX * this.speed;
    this.updatePosition();
  }
}
