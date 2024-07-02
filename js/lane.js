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

  addEnemy() {
    const direction = this.number % 2 === 0 ? -1 : 1;
    const enemy = new Enemy(
      this.element,
      direction === 1 ? 80 : 800,
      this.element.offsetTop + 10,
      80,
      80,
      "./assets/Enemies/Vehicles/PNG/Cars/van.png",
      Math.random() * 2 + 1,
      direction
    );
    const enemyElement = document.createElement("img");
    direction === -1 ? enemyElement.classList.add("reverse") : "";
    console.log(enemyElement);
    this.element.appendChild(enemyElement);
    this.enemies.push(enemy);
  }

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    this.enemies.splice(index, 1);
    this.element.removeChild(enemy.element);
  }

  //addObstacle(obstacle) {
  //  this.obstacles.push(obstacle);
  //}

  //removeObstacle(obstacle) {
  //  const index = this.obstacles.indexOf(obstacle);
  //  this.obstacles.splice(index, 1);
  //}
}
