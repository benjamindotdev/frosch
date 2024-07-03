class Lane {
  constructor(number, type) {
    this.number = number;
    this.type = type;
    this.height = 100;
    this.width = 800;
    this.element = document.querySelector("#lane-" + number);
    this.enemies = [];
    this.enemySound = new Audio("../public/assets/sounds/enemy.wav");
  }

  enemy(type) {
    const random = Math.ceil(Math.random() * 3);
    return `./assets/images/enemies/${type}/${random}.png`;
  }

  addEnemy(randomPosition) {
    this.enemySound.play();
    const direction = this.number % 2 === 0 ? -1 : 1;
    const enemy = new Enemy(
      this.element,
      randomPosition ? Math.random() * 800 : direction === -1 ? 800 : 80,
      this.element.offsetTop + 10,
      80,
      80,
      this.enemy(this.type),
      direction
    );
    const enemyElement = document.createElement("img");
    direction === -1 ? (enemyElement.style.transform = "scaleX(-1)") : null;
    this.element.appendChild(enemyElement);
    this.enemies.push(enemy);
  }

  removeEnemy(enemy) {
    const index = this.enemies.indexOf(enemy);
    this.enemies.splice(index, 1);
    this.element.removeChild(enemy.element);
  }
}
