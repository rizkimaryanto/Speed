'use strict';

import { StartScene } from "./scene/startScene";

/**
 * NOTE TO READER: 
 * Please respectfully use this project only with vite.
 * Module script does not work in plain HTML with live server extension.
 */

const /** @type {HTMLCanvasElement} */ canvas = document.getElementById('cvs');
const /** @type {CanvasRenderingContext2D} */ ctx = canvas.getContext('2d');
const startScene = new StartScene();

let fpsInterval, initTime, now, then, elapsed; // all requirements for animation
const ONE_SECOND_IN_MS = 1000;

/**
 * Animate the function by requesting animation frames and updating the game scene.
 * Will loop through the function until the browser window is closed.
 * @return {void} This function does not return any value.
 */
const animate = () => {
    requestAnimationFrame(animate); //request loop animation
    now = Date.now(); //get current timestamp
    elapsed = now - then; //get elapsed time since last frame

    //check whether elapsed has passed fps interval
    if (elapsed > fpsInterval) {
        //clear the canvas every frame
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        //draw the game scene and update the game scene each frame
        // startScene.draw();
        startScene.update();

        then = now - (elapsed % fpsInterval); //set `now` to `then` (as the canvas has changed frame) and tolerate miscalculated time
    }
};

/**
 * Start the animation with the given frames per second (fps).
 * Init the animation start
 * @param {number} fps - The number of frames per second.
 * @return {void} This function does not return a value.
 */
const startAnimate = (fps = 1) => {
    fpsInterval = ONE_SECOND_IN_MS / fps; //get how much time should elapse between each frame
    initTime = then = Date.now();
    animate(); //call the animate func to start the game
    console.log(`Game has started, TIMESTAMP: ${initTime}`);
};
startAnimate(1);