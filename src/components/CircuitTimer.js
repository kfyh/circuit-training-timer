import React from 'react'
import PropTypes from 'prop-types'
import TimeLabel from './TimeLabel'
import StartStopButton from './StartStopButton'
import ExerciseLabel from './ExerciseLabel'
import selectNextInterval from './IntervalSelector'

class CircuitTimer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
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
    if (currentInterval.type === 'set') {
      currentInterval = currentInterval.steps[this.state.currentStepIndex]
      currentRep = this.state.currentStepRep
    }
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

    let timeLeft = this.state.timeLeft
    if (timeLeft <= 0) {
      const interval = this.props.intervals[this.state.currentIntervalIndex]
      timeLeft = interval.time * 1000
    }

    this.setState({
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
      clearInterval(this.timer)
    }
  }

  update = () => {
    const endTime = this.state.endTime
    if ((endTime - Date.now()) <= -20) {
      const result = selectNextInterval(this.state, this.props.intervals)
      if (result.currentIntervalIndex < 0) {
        clearInterval(this.timer)
        this.setState({
          currentIntervalIndex: 0,
          currentIntervalRep: 1,
          currentStepIndex: 0,
          currentStepRep: 1,
          isRunning: false,
          endTime: 0,
          timeLeft: 0
        })
      } else {
        this.setState(result)
      }
    } else {
      this.setState({
        timeLeft: endTime - Date.now()
      })
    }
  }
}

CircuitTimer.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object)
}

export default CircuitTimer
