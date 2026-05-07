// The final project uses many timers, so might as well have each timed effect be an instance of one object with the same methods.

class Timer {
  constructor(timeInterval) {
      // Boolean for if timer has been started
      this.started = false;
      
      // Running timer
      this.currentTime = 0;
      
      // Records how many seconds have passed when the timer has started
      this.startTime = 0;

      // Record of time in seconds
      this.timeDisplay = 0.0;
      
      // Variable for how much time has passed by deducing current time from the time the second has started
      this.timeDiff = 0;
      
      // How much time is needed to pass before adding to a value
      this.timeInterval = timeInterval;
  }

  display(x, y) {
    text(this.timeDisplay, (windowWidth / 2) - x, (windowWidth / 2) - y);
  }

  initiateTimer() {
    this.startTime = this.currentTime;
    this.started = true;
  }

  timerLoop() {
    this.currentTime = int(millis());
    // If timer hasn't started yet, start it
    if (!this.started) {
      this.initiateTimer();
    }

    // How much time has passed
    this.timeDiff = this.currentTime - this.startTime;

    // If time passed reaches a certain interval...
    if (this.timeDiff >= this.timeInterval) {
      // Add to the variable of seconds according to the interval
      this.timeDisplay += this.timeInterval / 1000;
      
      // Reset starting time to when this was recorded
      this.startTime = this.currentTime;

      // Reset time passed
      this.timeDiff = 0;
    }
  }

  // Returns true if the amount of time set as the parameter to the mehod has been passed
  // ie. if timerLimit = 3, this method will only return true when 3 seconds has passed
  timerAction(timerLimit) {
    this.timerLimit = timerLimit;
    if (this.timeDisplay == timerLimit) {
      return true;
    }
    return false;
  }

  // Simple reset method
  timerReset() {
    this.started = false;
    this.timeDisplay = 0;
    this.timeDiff = 0;
  }
}