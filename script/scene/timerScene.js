const minutesTag = document.getElementById("minute");
const secondsTag = document.getElementById("second");
const msTag = document.getElementById("millisecond");

export class TimerScene {
  constructor(/** @type {import("./startScene").StartScene} */ game) {
    this.game = game;
    this.minutes = 1;
    this.seconds = 0;
    this.milliseconds = 0;
    msTag.textContent = this.milliseconds < 10 ? `0${this.milliseconds}` : this.milliseconds;
    secondsTag.textContent = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
    minutesTag.textContent = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
  }
  watchTimerStatus() {
    if (this.milliseconds === 0 && this.seconds === 0 && this.minutes === 0) this.game.gameStop(); // Stop the game
  }
  timerStart() {
    this.timerId = setInterval(() => {
      this.watchTimerStatus();
      msTag.textContent = this.milliseconds < 10 ? `0${this.milliseconds}` : this.milliseconds;
      secondsTag.textContent = this.seconds < 10 ? `0${this.seconds}` : this.seconds;
      minutesTag.textContent = this.minutes < 10 ? `0${this.minutes}` : this.minutes;
      if (this.milliseconds > 0) {
        this.milliseconds--;
      } else {
        this.milliseconds = 99;
        if (this.seconds > 0) {
          this.seconds--;
        } else {
          this.seconds = 59;
          this.minutes--;
        }
      }
    }, 10);
  }
  timerStop() {
    clearInterval(this.timerId);
  }
}
