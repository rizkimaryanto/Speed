export class SpriteScene {
  constructor(/** @type {import("./startScene").StartScene} */ game) {
    this.game = game;
    this.color = "#c17aff";
    this.size = game.height;
    this.speed = 5;
    this.x = 0;
    this.y = game.centerY - this.size / 2;
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.game.ctx.restore();
  }

  update() {
    this.checkCollisionCanvasEnd()
    this.checkCollisionCanvasStart()
    this.move()
  }
  move(){
    this.x += this.speed;
  }
  checkCollisionCanvasEnd() {
    if (this.x > this.game.width - this.size) {
      this.speed = -Math.abs(this.speed);
    }
  }
  checkCollisionCanvasStart(){
    if (this.x <= 0) {
      this.speed = Math.abs(this.speed);
    }
  }
}
