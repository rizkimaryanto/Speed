import { StartScene } from "./scene/startScene";

/* -------------------------------------------------------------------------- */
/*                             GAME INITIALISATION                            */
/* -------------------------------------------------------------------------- */
const ONE_SECOND_IN_MS = 1000;
const difficulty = {
  easy: { speed: 6, size: 90 },
  medium: { speed: 10, size: 50 },
  hard: { speed: 13, size: 30 },
};

const /** @type {HTMLCanvasElement} */ canvas = document.getElementById("cvs");
const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext("2d");
const /** @type {HTMLParagraphElement} */ difficultyTag = document.getElementById("difficulty");

const difficultyQueryParam = new URLSearchParams(window.location.search).get("difficulty");
const chosenDifficulty = Object.keys(difficulty).includes(difficultyQueryParam)
  ? difficulty[difficultyQueryParam]
  : difficulty.easy;

difficultyTag.textContent = difficultyQueryParam ?? "easy";
canvas.width = 300; // 300px or 18.75rem
canvas.height = 20; // 20px or 1.25rem

let fpsInterval, initTime, now, then, elapsed; // all requirements for animation
const startScene = new StartScene(canvas, ctx, chosenDifficulty);

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
    startScene.draw();
    startScene.update();

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
  console.log(`Game started ${initTime}`);
};

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENER                               */
/* -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", startAnimate(45)); //
