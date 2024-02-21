export class TargetScene {
  constructor(/** @type {import("./startScene").StartScene} */ game) {
    this.game = game;
    this.size = game.height;
    this.x = 10;
    this.y = game.centerY - this.size / 2;
  }
}
