let fpsInterval, initTime, now, then, elapsed; // all requirements for animation
const ONE_SECOND_IN_MS = 1000;
const /** @type {HTMLCanvasElement} */ canvas = document.getElementById("cvs");
const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext("2d");

class MainClass {
  constructor() {
    this.position = new PositionClass(this); // create a position class instance
    this.cube = new CubeClass(this); // create a cube class instance
  }
  draw() {
    this.cube.draw(); // draw the cube
  }
  update() {
    this.cube.update(); // update the cube
  }
}
class PositionClass {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
  }
}
class CubeClass {
  constructor(game) {
    this.game = game;
    this.color = "red";
    this.size = 10;
  }
  draw() {
    ctx.fillStyle = this.color; // change the fill style to the desired color
    ctx.fillRect(this.game.position.x, this.game.position.y, this.size, this.size); // create a 10x10 red cube at position (x, y)
  }
  update() {
    this.game.position.x += 1; // move the cube 1 pixel to the right
  }
}

const main = new MainClass(); // init the main class

/**
 * Animate the function by requesting animation frames and updating the game scene.
 * Will loop through the function until the browser window is closed.
 * @return {void} This function does not return any value.
 */
const animate = () => {
  requestAnimationFrame(animate); //request loop animation
  now = Date.now(); //get current timestamp
  elapsed = now - then; //get elapsed time since last frame

  // Check whether elapsed has passed fps interval
  if (elapsed > fpsInterval) {
    // Clear the canvas every frame
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // Draw the game scene and update the game scene each frame
    main.draw();
    main.update();

    then = now - (elapsed % fpsInterval); // Set `now` to `then` (as the canvas has changed frame) and tolerate miscalculated time
  }
};

/**
 * Start the animation with the given frames per second (fps).
 * Init the animation start
 * @param {number} fps - The number of frames per second.
 * @return {void} This function does not return a value.
 */
const startAnimate = (fps = 1) => {
  fpsInterval = ONE_SECOND_IN_MS / fps; // Get how much time should elapse between each frame
  initTime = then = Date.now();
  animate(); // Call the animate func to start the game
};

document.addEventListener("DOMContentLoaded", startAnimate(45)); //animate with 45 fps
