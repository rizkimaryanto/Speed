import { canvas, ctx } from "../main";

export class SpriteScene {
  constructor(/** @type {import("./startScene").startScene} */ game) {
    this.game = game;
    this.color = "#c17aff";
    this.size = this.game.height;
    this.speed = 5;
    this.x = 0;
    this.y = game.centerY - this.size / 2;
  }

  draw() {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.restore();
  }

  update() {
    if (this.x > canvas.width - this.size) {
      this.speed = -Math.abs(this.speed);
    }
    if (this.x <= 0) {
      this.speed = Math.abs(this.speed);
    }
    this.x += this.speed;
  }
}
