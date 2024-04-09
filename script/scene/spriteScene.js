const /** @type {HTMLButtonElement} */ tapBtn = document.getElementById("tap-btn");

export class SpriteScene {
  constructor(/** @type {import("./startScene").StartScene} */ game) {
    /* -------------------------------------------------------------------------- */
    /*                                 PROPPERTIES                                */
    /* -------------------------------------------------------------------------- */
    this.game = game;
    this.color = "#c17aff";
    this.size = game.height;
    this.speed = game.difficulty.speed;
    this.x = 1;
    this.y = game.verticalCenter(this.size);
    this.spacebarPressed = false;
    this.hittable = false;
    this.maxSpeed = this.game.difficulty.speed + 5;
    /* -------------------------------------------------------------------------- */
    /*                                 CONTROLLER                                 */
    /* -------------------------------------------------------------------------- */
    window.onkeydown = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === " " && !this.spacebarPressed) {
        this.hittable ? this.successHit() : this.failHit();
        this.spacebarPressed = true;
      }
    };
    window.onkeyup = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === " ") {
        this.spacebarPressed = false;
      }
    };
    tapBtn.onpointerdown = () => {
      if (!this.spacebarPressed) {
        this.hittable ? this.successHit() : this.failHit();
      }
    };
  }

  draw() {
    this.game.ctx.save();
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.game.ctx.restore();
  }

  update() {
    this.checkCollisionCanvasEnd();
    this.checkCollisionCanvasStart();
    this.watchHitable();
    this.move();
  }

  /**
   * Watches the hitable status of the sprite (inside target area).
   */
  watchHitable() {
    this.game.targetScene.isInsideTarget(this.x, this.size)
      ? (this.hittable = true)
      : (this.hittable = false);
  }

  /**
   * Increments the game score by 25 points, adjusts the game difficulty, and potentially increases the game difficulty.
   * Also respawn the target area.
   */
  successHit() {
    this.game.score += 25;
    this.game.difficulty.speed < this.maxSpeed && this.increaseSpeed();
    this.game.targetScene.width = this.game.targetScene.generateRandomWidth();
    this.game.difficulty.size > 30 && this.increaseDifficulty();
    this.game.targetScene.x = this.game.targetScene.generateXposition();
    this.game.popupScore("+25");
  }

  /**
   * A function that decrements the score by 5 when hit is outside of target area.
   */
  failHit() {
    this.game.score < 5 ? (this.game.score = 0) : (this.game.score -= 5);
    this.game.popupScore("-5");
  }

  /**
   * Increase the difficulty of the game by reducing the size.
   */
  increaseDifficulty() {
    this.game.difficulty.size -= 2;
  }

  /**
   * Increase the speed of the game based on the current difficulty setting.
   */
  increaseSpeed() {
    const speedAddition = Math.fround((this.game.difficulty.speed += 0.1)).toFixed(1);
    this.speed < 0
      ? (this.speed = -Math.abs(speedAddition))
      : (this.speed = Math.abs(speedAddition));
  }

  /**
   * Moves the sprite by its speed.
   */
  move() {
    this.x += this.speed;
  }

  /**
   * Calculate the score based on the current game score.
   */
  calculateScore() {
    this.game.score < 10 ? (this.game.score -= this.game.score) : (this.game.score -= 10);
  }

  /**
   * Checks if the sprite collides with the right edge of the canvas.
   * If it does, it changes the speed to the opposite direction.
   */
  checkCollisionCanvasEnd() {
    if (this.x > this.game.width - this.size) {
      this.speed = -Math.abs(this.speed);
      this.calculateScore();
    }
  }

  /**
   * Checks if the sprite collides with the left edge of the canvas.
   * If it does, it changes the speed to the opposite direction.
   */
  checkCollisionCanvasStart() {
    if (this.x <= 0) {
      this.speed = Math.abs(this.speed);
      this.calculateScore();
    }
  }
}
