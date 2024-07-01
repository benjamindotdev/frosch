class Lane {
  constructor(number, type, enemies, obstacles) {
    this.number = number;
    this.type = type;
    this.enemies = enemies;
    this.obstacles = obstacles;
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
}
