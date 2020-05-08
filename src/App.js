import React from 'react'
import PropTypes from 'prop-types'
import './App.css'
import Timer from './components/Timer'
import StartStopButton from './components/StartStopButton'
import ExerciseLabel from './components/ExerciseLabel'
import selectNextInterval from './IntervalSelector'

class App extends React.Component {
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
    return (
      <div className="App">
        <ExerciseLabel intervals={this.props.intervals} state={this.state} />
        <Timer time={this.state.timeLeft}/>
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

App.propTypes = {
  intervals: PropTypes.arrayOf(PropTypes.object)
}

export default App
