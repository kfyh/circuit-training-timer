class StepIntervalController {
  constructor (step) {
    this.step = step
    this.isRunning = false
  }

  start = (currentTime) => {
    this.timeLeft = this.step.time * 1000
    this.endTime = currentTime + this.timeLeft
    this.isRunning = true
    this.reps = 1
  }

  resume = (currentTime) => {
    this.isRunning = true
    this.endTime = currentTime + this.timeLeft
  }

  pause = () => {
    this.isRunning = false
  }

  update = (currentTime) => {
    const endTime = this.endTime
    let isComplete = false
    if (endTime - currentTime <= 0) {
      if (this.reps < this.step.reps) {
        this.reps++
        this.timeLeft = this.step.time * 1000
        this.endTime = currentTime + this.timeLeft
      } else {
        isComplete = true
        this.isRunning = false
      }
    } else {
      this.timeLeft = endTime - currentTime
    }

    return {
      isComplete: isComplete,
      isRunning: this.isRunning,
      reps: this.reps,
      endTime: this.endTime,
      timeLeft: this.timeLeft
    }
  }
}

export default StepIntervalController
