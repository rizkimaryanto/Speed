import { canvas, ctx } from "../main";
import { SpriteScene } from "./spriteScene";

class StartScene {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.centerY = canvas.height / 2; //TODO: make this a function
    this.spriteScene = new SpriteScene(this);
  }
  draw() {
    this.spriteScene.draw();
  }
  update() {
    this.spriteScene.update();
  }
}

export const startScene = new StartScene();
