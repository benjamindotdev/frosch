class Van extends Enemy {
  constructor(container, left, top, width, height, directionX) {
    super(container, left, top, width, height, directionX);
    this.speed = 2;
    this.src = "./assets/Enemies/Vehicles/PNG/Cars/van.png";
  }
}
