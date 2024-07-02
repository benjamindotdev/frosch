class Convertible extends Enemy {
  constructor(container, left, top, width, height, directionX) {
    super(container, left, top, width, height, directionX);
    this.speed = 3;
    this.src = "./assets/Enemies/Vehicles/PNG/Cars/convertible.png";
  }
}
