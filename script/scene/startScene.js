import { SpriteScene } from "./spriteScene";

// const /** @type {HTMLCanvasElement} */ canvas = document.getElementById("cvs");
// const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext("2d");
// // Set canvas size
// canvas.width = 300; // 300px or 18.75rem
// canvas.height = 20; // 20px or 1.25rem

export class StartScene {
  constructor(canvas,ctx) {
    this.ctx = ctx;
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

// export const startScene = new StartScene();
