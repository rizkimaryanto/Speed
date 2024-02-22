export class TargetScene {
  constructor(/** @type {import("./startScene").StartScene} */ game) {
    this.game = game;
    this.height = game.height;
    this.width = this.generateRandomWidth();
    this.x = this.generateXposition();
    this.y = game.verticalCenter(this.height);
    this.color = "violet";
  }
  draw() {
    this.game.ctx.save();
    this.game.ctx.strokeStyle = this.color;
    this.game.ctx.lineWidth = 2;
    this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.game.ctx.restore();
  }
  update() {}

  /**
   * Generates a random x position within the game width, ensuring that the entire object is positioned within the game bounds.
   * @return {number} The random x position generated within the game width.
   */
  generateXposition() {
    const randomX = Math.floor(Math.random() * this.game.width);
    return randomX > this.game.width - this.width ? this.game.width - this.width : randomX;
  }

  /**
   * Generates a random width based on 125% of the game's difficulty size.
   * @return {number} the random width generated
   */
  generateRandomWidth() {
    return ~~(Math.random() * this.game.difficulty.size + this.game.difficulty.size * 1.25);
  }

  /**
   * Check if a given x and its width coordinate from an object is inside the target area.
   * @param {number} x - the x coordinate to check
   * @param {number} width - the width of the target area
   * @return {boolean} true if the x and its width coordinate is inside the target area, false otherwise
   */
  isInsideTarget(x, width) {
    return x + width >= this.x && x <= this.x + this.width;
  }
}
