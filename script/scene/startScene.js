import { SpriteScene } from "./spriteScene";
import { TargetScene } from "./targetScene";

export class StartScene {
  constructor(canvas, ctx, difficulty) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.difficulty = difficulty;
    this.spriteScene = new SpriteScene(this);
    this.targetScene = new TargetScene(this);
    console.log(difficulty);
  }
  draw() {
    this.targetScene.draw();
    this.spriteScene.draw();
  }
  update() {
    this.spriteScene.update();
    this.targetScene.update();
  }
  /**
   * To center object relative to the canvas size
   * @param {number} size object's size
   */
  verticalCenter(size) {
    return this.height / 2 - size / 2;
  }
  /* -------------------------------------------------------------------------- */
  /*                            INTELLISENSE PURPOSES                           */
  /* -------------------------------------------------------------------------- */
  /** @type {CanvasRenderingContext2D} */ ctx;
  /** @type {number} */ width;
  /** @type {number} */ height;
  /** @type {SpriteScene} */ spriteScene;
  /** @type {TargetScene} */ targetScene;
  /** @type {{speed: number, size: number}} */ difficulty;
}
