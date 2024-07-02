class Truck extends Enemy {
  constructor(container, left, top, width, height, directionX) {
    super(container, left, top, width, height, directionX);
    this.speed = 1;
    this.src = "./assets/Enemies/Vehicles/PNG/Cars/truck.png";
  }
}
