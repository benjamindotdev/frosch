class Lane {
  constructor(number, type) {
    this.number = number;
    this.type = type;
    this.height = 100;
    this.width = 800;
    this.element = document.querySelector("#lane-" + number);
    this.enemies = [];
    this.obstacles = [];
  }

  texture() {
    switch (this.type) {
      case "road":
        return "Bricks/s2 Brick Small Blocks Grey 3.png";
      case "water":
        return "Water/s2 Water Blue Dark.png";
      case "bike":
        return "Bricks/s2 Brick 01 Red.png";
      case "grass":
        return "Grass/s2 Grass 01 Green.png";
      case "pavement":
        return "Concrete/s2 Concrete Lines 3 Grey Hor.png";
    }
  }

  enemy(type) {
    const random = Math.floor(Math.random() * 4);
    const enemies = {
      road: [
        "./assets/Enemies/Vehicles/PNG/Cars/van.png",
        "./assets/Enemies/Vehicles/PNG/Cars/convertible.png",
        "./assets/Enemies/Vehicles/PNG/Cars/truck.png",
      ],
      water: [
        "./assets/Enemies/Vehicles/PNG/Cars/van.png",
        "./assets/Enemies/Vehicles/PNG/Cars/convertible.png",
        "./assets/Enemies/Vehicles/PNG/Cars/truck.png",
      ],
      bike: [
        "./assets/Enemies/Vehicles/PNG/Cars/cycle.png",
        "./assets/Enemies/Vehicles/PNG/Cars/cycle_low.png",
        "./assets/Enemies/Vehicles/PNG/Cars/scooter.png",
      ],
      grass: [
        "./assets/Enemies/Vehicles/PNG/Cars/van.png",
        "./assets/Enemies/Vehicles/PNG/Cars/tractor.png",
        "./assets/Enemies/Vehicles/PNG/Cars/vintage.png",
      ],
      pavement: [
        "./assets/Homeless/Homeless_1/Walk.png",
        "./assets/Homeless/Homeless_2/Walk.png",
        "./assets/Homeless/Homeless_3/Walk.png",
      ],
    };
    switch (type) {
      case "road":
        return enemies.road[random];
      case "water":
        return enemies.water[random];
      case "bike":
        return enemies.bike[random];
      case "grass":
        return enemies.grass[random];
      case "pavement":
        return enemies.pavement[random];
    }
  }

  addEnemy() {
    const direction = this.number % 2 === 0 ? -1 : 1;
    const enemy = new Enemy(
      this.element,
      direction === 1 ? 80 : 800,
      this.element.offsetTop + 10,
      80,
      80,
      this.enemy(this.type),
      Math.random() * 2 + 1,
      direction
    );
    const enemyElement = document.createElement("img");
    direction === -1 ? enemyElement.classList.add("reverse") : "";
    this.element.appendChild(enemyElement);
    this.enemies.push(enemy);
  }

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    this.enemies.splice(index, 1);
    this.element.removeChild(enemy.element);
  }
}
