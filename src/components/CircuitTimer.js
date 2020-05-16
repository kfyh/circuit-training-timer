import React from 'react'
import PropTypes from 'prop-types'
import TimeLabel from './TimeLabel'
import StartStopButton from './StartStopButton'
import ExerciseLabel from './ExerciseLabel'
import StepIntervalController from '../controllers/StepIntervalController'

class CircuitTimer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      controller: null,
      currentIntervalIndex: 0,
      currentIntervalRep: 1,
      currentStepIndex: 0,
      currentStepRep: 1,
      isRunning: false,
      endTime: 0,
      timeLeft: 0
    }
  }

  componentDidMount () {
  }

  componentWillUnmount () {
    this.stopTimer()
  }

  render () {
    let currentInterval = this.props.intervals[this.state.currentIntervalIndex]
    let currentRep = this.state.currentIntervalRep
    // if (currentInterval.type === 'set') {
    //   currentInterval = currentInterval.steps[this.state.currentStepIndex]
    //   currentRep = this.state.currentStepRep
    // }

    return (
      <div>
        <ExerciseLabel interval={currentInterval} currentRep={currentRep} />
        <TimeLabel time={this.state.timeLeft}/>
        <StartStopButton isRunning={this.state.isRunning} onClick={this.handleClick} />
      </div>
    )
  }

  handleClick = () => {
    if (this.state.isRunning) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer = () => {
    if (this.state.isRunning) {
      return
    }
    let controller = this.state.controller
    let timeLeft = this.state.timeLeft
    if (controller === null) {
      const interval = this.props.intervals[this.state.currentIntervalIndex]
      controller = new StepIntervalController(interval)
      controller.start(Date.now())
      timeLeft = controller.timeLeft
    } else {
      controller.resume(Date.now())
      timeLeft = controller.timeLeft
    }

    this.setState({
      controller: controller,
      isRunning: true,
      endTime: Date.now() + timeLeft
    })

    this.timer = setInterval(this.update, 100)
  }

  stopTimer = () => {
    if (this.state.isRunning) {
      this.setState({
        isRunning: false
      })
      this.state.controller.pause()
      clearInterval(this.timer)
    }
  }

  update = () => {
    const values = this.state.controller.update(Date.now())
    if (values.isComplete) {
      const currentIntervalIndex = this.state.currentIntervalIndex + 1
      if (currentIntervalIndex >= this.props.intervals.length) {
        clearInterval(this.timer)
        this.setState({
          controller: null,
          currentIntervalIndex: 0,
          currentIntervalRep: 1,
          currentStepIndex: 0,
          currentStepRep: 1,
          isRunning: false,
          endTime: 0,
          timeLeft: 0
        })
        this.props.onComplete()
      } else {
        const nextInterval = this.props.intervals[currentIntervalIndex]
        const nextController = new StepIntervalController(nextInterval)
        nextController.start(Date.now())
        this.setState({
          controller: nextController,
          timeLeft: nextController.timeLeft,
          currentIntervalIndex: currentIntervalIndex,
          currentIntervalRep: nextController.reps,
          endTime: nextController.endTime
        })
      }
    } else {
      this.setState({
        timeLeft: values.timeLeft,
        currentIntervalRep: values.reps
      })
    }
  }
}

CircuitTimer.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object),
  onComplete: PropTypes.func
}

export default CircuitTimer
