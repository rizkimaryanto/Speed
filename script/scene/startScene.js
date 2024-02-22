import { SpriteScene } from "./spriteScene";
import { TargetScene } from "./targetScene";

const scoreTag = document.getElementById("score");

export class StartScene {
  constructor(canvas, ctx, difficulty) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.difficulty = difficulty;
    this.spriteScene = new SpriteScene(this);
    this.targetScene = new TargetScene(this);
    this.score = 0;
  }
  draw() {
    this.targetScene.draw();
    this.spriteScene.draw();
  }
  update() {
    this.spriteScene.update();
    this.targetScene.update();
    this.updateScore();
  }

  /**
   * Updates the score tag with the current score.
   */
  updateScore() {
    scoreTag.textContent = `Score: ${this.score}`;
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
  /** @type {{speed: number, size: number}} */ difficulty;
}
