class Lane {
  constructor(number, type) {
    this.number = number;
    this.type = type;
    this.height = 100;
    this.width = 800;
    this.element = document.querySelector("#lane-" + number);
    this.enemies = [];
    this.enemyIdCounter = 1;
  }

  enemy(type) {
    const random = Math.ceil(Math.random() * 3);
    return `./assets/images/enemies/${type}/${random}.${
      type === "pavement" ? "gif" : "png"
    }`;
  }

  addEnemy() {
    const direction = this.number % 2 === 0 ? -1 : 1;
    const enemySrc = this.enemy(this.type);
    const enemy = new Enemy(this.element, enemySrc, direction);
    const enemyElement = document.createElement("img");
    if (direction === -1) enemyElement.style.transform = "scaleX(-1)";
    this.element.appendChild(enemyElement);
    enemyElement.id = `lane-${this.number}-enemy-${this.enemyIdCounter}`;
    enemy.element.id = enemyElement.id;
    this.enemies.push(enemy);
    this.enemyIdCounter++;
  }

  removeEnemies() {
    this.enemies.forEach((enemy) => {
      if (enemy.left < 0 || enemy.left > 720) {
        const enemyElement = document.querySelector(`#${enemy.element.id}`);
        if (enemyElement) this.element.removeChild(enemyElement);
        this.enemies = this.enemies.filter((e) => e.id !== enemy.id);
        enemy.remove();
      }
    });
  }
}
