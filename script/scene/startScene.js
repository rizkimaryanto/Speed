import { SpriteScene } from "./spriteScene";
import { TargetScene } from "./targetScene";
import { TimerScene } from "./timerScene";

const scoreTag = document.getElementById("score");

export class StartScene {
  constructor(canvas, ctx, difficulty) {
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
    this.difficulty = difficulty;
    this.spriteScene = new SpriteScene(this);
    this.targetScene = new TargetScene(this);
    this.timerScene = new TimerScene(this);
    this.score = 0;
    this.status = "unstarted";
  }
  /**
   * Do popup for score
   * @param {string} score
   */
  popupScore(scoreInText = "0") {
    let span = document.createElement("span");
    span.className =
      "text-white text-3xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
    span.innerHTML = scoreInText;
    span.style.translate = `${~~(Math.random() * 201) - 100}px ${~~(Math.random() * 201) - 100}px`;
    document.getElementById("main").appendChild(span);
    setTimeout(() => {
      span.remove();
    }, 500);
  }
  draw() {
    this.targetScene.draw();
    this.spriteScene.draw();
  }
  update() {
    if (this.status === "finished") return;
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

  gameStart() {
    this.status = "started";
    this.timerScene.timerStart();
  }

  gameStop() {
    this.status = "finished";
    this.timerScene.timerStop();
    this.showFinalScore();
  }
  showFinalScore() {
    let finalScore = document.createElement("div");
    finalScore.className =
      "text-white text-3xl font-bold w-1/3 bg-purple-500 rounded text-center absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2";
    finalScore.innerHTML = `Score: ${this.score}`;
    document.getElementById("main").appendChild(finalScore);
  }

  /* -------------------------------------------------------------------------- */
  /*                            INTELLISENSE PURPOSES                           */
  /* -------------------------------------------------------------------------- */
  /** @type {CanvasRenderingContext2D} */ ctx;
  /** @type {number} */ width;
  /** @type {number} */ height;
  /** @type {{speed: number, size: number}} */ difficulty;
  /** @type {"unstarted" | "started" | "finished"} */ status;
}
