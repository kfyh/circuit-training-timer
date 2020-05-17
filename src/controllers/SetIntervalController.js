import { StepIntervalController } from "./StepIntervalController"

export class SetIntervalController {
  constructor (interval) {
    this.interval = interval
    this.isRunning = false
    this.currentStepIndex = 0
  }

  start = (currentTime) => {
    this.step = this.interval.steps[this.currentStepIndex]
    this.stepController = new StepIntervalController(this.step)
    this.stepController.start(currentTime)
    this.timeLeft = this.stepController.timeLeft
    this.endTime = this.stepController.endTime
    this.isRunning = this.stepController.isRunning
    this.reps = 1
  }

  resume = (currentTime) => {
    this.stepController.resume(currentTime)
    this.isRunning = this.stepController.isRunning
    this.endTime = this.stepController.endTime
  }

  pause = () => {
    this.stepController.pause()
    this.isRunning = this.stepController.isRunning
  }

  update = (currentTime) => {
    let isComplete = false;
    const values = this.stepController.update(currentTime)
    if (values.isComplete) {
      this.currentStepIndex++
      if (this.currentStepIndex < this.interval.steps.length) {
        this.step = this.interval.steps[this.currentStepIndex]
        this.stepController = new StepIntervalController(this.step)
        this.stepController.start(currentTime)
        this.timeLeft = this.stepController.timeLeft
        this.endTime = this.stepController.endTime
      } else {
        this.reps++
        if (this.reps < this.interval.reps) {
          this.currentStepIndex = 0
          this.step = this.interval.steps[this.currentStepIndex]
          this.stepController = new StepIntervalController(this.step)
          this.stepController.start(currentTime)
          this.timeLeft = this.stepController.timeLeft
          this.endTime = this.stepController.endTime
        } else {
          isComplete = true
          this.isRunning = false
        }
      }
    } else {
      this.timeLeft = this.stepController.timeLeft
      this.endTime = this.stepController.endTime
    }

    return {
      isComplete: isComplete,
      isRunning: this.isRunning,
      reps: this.reps,
      endTime: this.endTime,
      timeLeft: this.timeLeft,
      currentStepIndex: this.currentStepIndex
    }
  }
}
