class Component {
  constructor(container, width, height, left, top, src) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.element = document.createElement("img");
    this.element.src = src;
    this.element.style.position = "absolute";
    this.element.style.width = this.width + "px";
    this.element.style.height = this.height + "px";
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
    this.container.appendChild(this.element);
  }

  updatePosition() {
    this.element.style.left = this.left + "px";
    this.element.style.top = this.top + "px";
  }

  remove() {
    if (this.element.parentNode === this.gameScreen) {
      this.gameScreen.removeChild(this.element);
    }
  }
}
