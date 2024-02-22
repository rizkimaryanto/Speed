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
    this.x = 0;
    this.y = game.verticalCenter(this.size);
    this.spacebarPressed = false;
    this.hittable = false;
    /* -------------------------------------------------------------------------- */
    /*                                 CONTROLLER                                 */
    /* -------------------------------------------------------------------------- */
    window.onkeydown = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === " " && !this.spacebarPressed) {
        this.spacebarPressed = true;
        console.log("tap space");
      }
    };
    window.onkeyup = (/** @type {KeyboardEvent} */ e) => {
      if (e.key === " ") {
        this.spacebarPressed = false;
      }
    };
    tapBtn.onpointerdown = () => {
      if (!this.spacebarPressed) {
        console.log("tap");
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
   * Moves the sprite by its speed.
   */
  move() {
    this.x += this.speed;
  }

  /**
   * Checks if the sprite collides with the right edge of the canvas.
   * If it does, it changes the speed to the opposite direction.
   */
  checkCollisionCanvasEnd() {
    if (this.x > this.game.width - this.size) {
      this.speed = -Math.abs(this.speed);
    }
  }

  /**
   * Checks if the sprite collides with the left edge of the canvas.
   * If it does, it changes the speed to the opposite direction.
   */
  checkCollisionCanvasStart() {
    if (this.x <= 0) {
      this.speed = Math.abs(this.speed);
    }
  }
}
