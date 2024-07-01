class Lane {
  constructor(number, type) {
    this.number = number;
    this.type = type;
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
      case "tram":
        return "Concrete/s2 Concrete Lines 3 Grey Hor.png";
    }
  }

  addEnemy() {
    const enemy = new Enemy(
      this.gameScreen,
      0,
      0,
      100,
      100,
      "./assets/Enemies/Vehicles/PNG/Cars/van.png",
      1,
      1
    );
    const enemyElement = document.createElement("img");
    this.appendChild(enemyElement);
    this.enemies.push(enemy);
  }

  //addObstacle(obstacle) {
  //  this.obstacles.push(obstacle);
  //}

  // removeEnemy(enemy) {
  //   const index = this.enemies.indexOf(enemy);
  //   this.enemies.splice(index, 1);
  // }

  //removeObstacle(obstacle) {
  //  const index = this.obstacles.indexOf(obstacle);
  //  this.obstacles.splice(index, 1);
  //}
}
